/**
 * Verifies the migration + seed and the section rules against an in-memory Postgres (PGlite).
 * Supabase's `auth` schema is stubbed (auth.users, auth.uid()). Run: npm run db:check
 */
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DEMO_USERS } from "./demo-users";

const root = process.cwd();
const db = new PGlite();
let failures = 0;

function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  -> " + detail : ""}`);
  if (!ok) failures++;
}

const U = {
  all: "00000000-0000-0000-0000-0000000000a1",
  products: "00000000-0000-0000-0000-0000000000a2",
  content: "00000000-0000-0000-0000-0000000000a3",
  none: "00000000-0000-0000-0000-0000000000a4",
  ada: "00000000-0000-0000-0000-0000000000b1",
  tunde: "00000000-0000-0000-0000-0000000000b2",
};

/** Run SQL as a given user (null = anonymous) under RLS. */
async function as<T = Record<string, unknown>>(uid: string | null, sql: string) {
  await db.exec(`select set_config('request.jwt.claim.sub', '${uid ?? ""}', false)`);
  await db.exec(`set role ${uid ? "authenticated" : "anon"}`);
  try {
    return (await db.query<T>(sql)).rows;
  } finally {
    await db.exec("reset role");
  }
}
async function fails(uid: string | null, sql: string) {
  try {
    const rows = await as(uid, sql);
    return { failed: false, rows };
  } catch (e) {
    return { failed: true, error: (e as Error).message };
  }
}

async function main() {
  // Stub Supabase auth schema + roles
  await db.exec(`
    create schema auth;
    create table auth.users (id uuid primary key, email text);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    create role anon; create role authenticated;
    grant usage on schema auth to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
  `);

  const migration1 = readFileSync(
    join(root, "supabase/migrations/20261006000001_data_model_and_admin_sections.sql"),
    "utf8",
  );
  await db.exec(migration1);

  // Stub Supabase storage schema, then apply the media migration
  await db.exec(`
    create schema storage;
    create table storage.buckets (id text primary key, name text, public boolean,
      file_size_limit bigint, allowed_mime_types text[]);
    create table storage.objects (id uuid primary key default gen_random_uuid(),
      bucket_id text, name text, owner uuid);
    create function storage.foldername(name text) returns text[] language sql immutable as
      $$ select string_to_array(name, '/') $$;
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon, authenticated;
    grant select, insert, update, delete on storage.objects to anon, authenticated;
    grant execute on function storage.foldername(text) to anon, authenticated;
  `);
  await db.exec(
    readFileSync(join(root, "supabase/migrations/20261006000002_media_storage.sql"), "utf8"),
  );

  // Apply migration 3: Activity log and product availability
  await db.exec(
    readFileSync(join(root, "supabase/migrations/20261006000003_activity_log_and_product_availability.sql"), "utf8"),
  );

  await db.exec(`
    grant usage on schema public to anon, authenticated;
    grant select on all tables in schema public to anon, authenticated;
    grant insert, update, delete on all tables in schema public to authenticated;
    grant execute on all functions in schema public to anon, authenticated;
  `);
  console.log("Migrations applied.");

  for (const u of DEMO_USERS) {
    await db.query("insert into auth.users (id, email) values ($1, $2)", [u.id, u.email]);
  }
  await db.exec(readFileSync(join(root, "supabase/seed.sql"), "utf8"));
  console.log("Seed applied.\n");

  const count = async (t: string) =>
    (await db.query<{ n: number }>(`select count(*)::int n from public.${t}`)).rows[0].n;
  console.log("Seed row counts:");
  for (const t of [
    "profiles", "staff_sections", "products", "product_images", "accessories",
    "product_accessories", "testimonials", "blog_posts", "site_content", "verification_submissions",
  ]) console.log(`  ${t.padEnd(26)} ${await count(t)}`);
  console.log("");

  // Verification status mirrors stored decisions
  const vs = (await db.query<{ email: string; verification_status: string }>(
    `select email, verification_status from public.profiles where not is_staff order by email`)).rows;
  console.log("Customer verification statuses:", JSON.stringify(vs));
  check("verification statuses seeded (verified/pending/rejected/not_started)",
    new Set(vs.map((r) => r.verification_status)).size === 4);

  // Public (anonymous) sees published only
  check("anon sees only published products",
    (await as(null, "select * from public.products")).length === 2);
  check("anon sees only published blog posts",
    (await as(null, "select * from public.blog_posts")).length === 2);
  check("anon sees only published testimonials",
    (await as(null, "select * from public.testimonials")).length === 2);
  check("anon sees only published accessories",
    (await as(null, "select * from public.accessories")).length === 2);
  check("anon cannot see draft product images",
    (await as(null, "select * from public.product_images")).length === 3);
  check("anon cannot read profiles", (await as(null, "select * from public.profiles")).length === 0);
  check("anon cannot read verification submissions",
    (await as(null, "select * from public.verification_submissions")).length === 0);
  check("anon cannot read staff_sections",
    (await as(null, "select * from public.staff_sections")).length === 0);
  check("anon cannot insert product",
    (await fails(null, `insert into public.products(slug,name,price,category) values('x','x',1,'x')`)).failed);

  // Staff with no sections
  check("staff with no sections: my_sections() is empty",
    (await as(U.none, "select * from public.my_sections()")).length === 0);
  check("staff with no sections cannot write products",
    (await fails(U.none, `insert into public.products(slug,name,price,category) values('x','x',1,'x')`)).failed);
  check("staff with no sections cannot see draft products",
    (await as(U.none, "select * from public.products")).length === 2);
  check("staff with no sections cannot see verification submissions",
    (await as(U.none, "select * from public.verification_submissions")).length === 0);

  // Products-only staff
  check("products staff: my_sections() = [products]",
    JSON.stringify((await as<{ my_sections: string }>(U.products, "select * from public.my_sections()")).map((r) => r.my_sections)) === '["products"]');
  check("products staff sees drafts",
    (await as(U.products, "select * from public.products")).length === 3);
  check("products staff can create product",
    !(await fails(U.products, `insert into public.products(slug,name,price,category) values('new-p','New',10,'Kits')`)).failed);
  check("products staff cannot create blog post",
    (await fails(U.products, `insert into public.blog_posts(title,slug) values('t','t')`)).failed);
  check("products staff cannot create testimonial",
    (await fails(U.products, `insert into public.testimonials(author_name,message) values('a','b')`)).failed);
  check("products staff cannot edit site content",
    (await as(U.products, `update public.site_content set value='"x"' where key='home.hero.headline' returning key`)).length === 0);
  check("products staff cannot read verification submissions",
    (await as(U.products, "select * from public.verification_submissions")).length === 0);
  check("products staff cannot grant themselves a section",
    (await fails(U.products, `insert into public.staff_sections(user_id, section) values('${U.products}','blog')`)).failed);

  // Content staff: cms + blog + testimonials, multiple sections
  check("content staff holds 3 sections",
    (await as(U.content, "select * from public.my_sections()")).length === 3);
  check("content staff can create blog post",
    !(await fails(U.content, `insert into public.blog_posts(title,slug) values('t','t-new')`)).failed);
  check("content staff can create testimonial",
    !(await fails(U.content, `insert into public.testimonials(author_name,message) values('a','b')`)).failed);
  check("content staff can edit site content",
    (await as(U.content, `update public.site_content set value='"x"' where key='home.hero.headline' returning key`)).length === 1);
  check("content staff cannot create product",
    (await fails(U.content, `insert into public.products(slug,name,price,category) values('y','y',1,'y')`)).failed);

  // All-sections staff
  check("all-sections staff holds 6 sections",
    (await as(U.all, "select * from public.my_sections()")).length === 6);
  check("all-sections staff sees all submissions",
    (await as(U.all, "select * from public.verification_submissions")).length === 3);

  // Customers
  check("customer sees only own profile",
    (await as(U.ada, "select * from public.profiles")).length === 1);
  check("customer sees only own submissions",
    (await as(U.ada, "select * from public.verification_submissions")).length === 1);
  check("customer cannot write products",
    (await fails(U.ada, `insert into public.products(slug,name,price,category) values('z','z',1,'z')`)).failed);
  check("customer cannot self-verify via profile update",
    (await fails(U.ada, `update public.profiles set verification_status='verified' where id='${U.ada}'`)).failed);
  check("customer cannot become staff",
    (await fails(U.ada, `update public.profiles set is_staff=true where id='${U.ada}'`)).failed);
  check("customer cannot approve own submission",
    (await as(U.ada, `update public.verification_submissions set decision='approved' where user_id='${U.ada}' returning id`)).length === 0);
  check("customer can edit own phone",
    (await as(U.ada, `update public.profiles set phone='+2348000009999' where id='${U.ada}' returning id`)).length === 1);

  // Verification review by verifications section
  check("rejection requires a reason",
    (await fails(U.all, `update public.verification_submissions set decision='rejected' where user_id='${U.ada}'`)).failed);
  await as(U.all, `update public.verification_submissions
    set decision='rejected', rejection_reason='Blurry', reviewer_id='${U.all}', decided_at=now()
    where user_id='${U.ada}'`);
  check("decision syncs profile status to rejected",
    (await db.query<{ s: string }>(`select verification_status s from public.profiles where id='${U.ada}'`)).rows[0].s === "rejected");
  // Resubmission goes back to pending
  await as(U.ada, `insert into public.verification_submissions(user_id,id_document_path) values('${U.ada}','verification/b1/id-2.jpg')`);
  check("new submission sets profile status to pending",
    (await db.query<{ s: string }>(`select verification_status s from public.profiles where id='${U.ada}'`)).rows[0].s === "pending");
  check("customer cannot insert submission for someone else",
    (await fails(U.ada, `insert into public.verification_submissions(user_id,id_document_path) values('${U.tunde}','x')`)).failed);

  // Constraints
  check("only one main image per product",
    (await fails(U.all, `insert into public.product_images(product_id,url,is_main) values('10000000-0000-0000-0000-000000000001','/x.jpg',true)`)).failed);
  check("a product can have many accessories",
    (await db.query<{ n: number }>(`select count(*)::int n from public.product_accessories where product_id='10000000-0000-0000-0000-000000000002'`)).rows[0].n === 3);

  // Media bucket rules (folder -> section)
  const put = (uid: string, path: string) =>
    fails(uid, `insert into storage.objects(bucket_id,name) values('media','${path}')`);
  check("products staff can upload to products/ folder", !(await put(U.products, "products/a.jpg")).failed);
  check("products staff can upload to accessories/ folder", !(await put(U.products, "accessories/a.jpg")).failed);
  check("products staff cannot upload to blog/ folder", (await put(U.products, "blog/a.jpg")).failed);
  check("products staff cannot upload to cms/ folder", (await put(U.products, "cms/a.jpg")).failed);
  check("content staff can upload to blog/, testimonials/ and cms/",
    !(await put(U.content, "blog/a.jpg")).failed && !(await put(U.content, "testimonials/a.jpg")).failed && !(await put(U.content, "cms/a.jpg")).failed);
  check("content staff cannot upload to products/ folder", (await put(U.content, "products/b.jpg")).failed);
  check("staff with no sections cannot upload anywhere", (await put(U.none, "blog/z.jpg")).failed);
  check("customer cannot upload", (await put(U.ada, "products/z.jpg")).failed);
  check("anon cannot upload", (await put(null as unknown as string, "products/z.jpg")).failed);
  check("upload to an unknown folder is refused even for all-sections staff", (await put(U.all, "other/z.jpg")).failed);
  check("content staff cannot delete a products/ file",
    (await as(U.content, `delete from storage.objects where name='products/a.jpg' returning id`)).length === 0);
  check("products staff can delete a products/ file",
    (await as(U.products, `delete from storage.objects where name='products/a.jpg' returning id`)).length === 1);
  check("media bucket restricts to images and 5 MB",
    (await db.query<{ ok: boolean }>(`select (file_size_limit = 5242880 and allowed_mime_types @> array['image/png'] and not allowed_mime_types @> array['application/pdf']) ok from storage.buckets where id='media'`)).rows[0].ok);

  // ── Product availability (in_stock) ─────────────────────────
  check("product in_stock defaults to true",
    (await db.query<{ in_stock: boolean }>(`select in_stock from public.products limit 1`)).rows[0].in_stock === true);
  await as(U.products, `update public.products set in_stock=false where slug='petfeb-1kva-starter-kit'`);
  check("products staff can set in_stock to false",
    (await db.query<{ in_stock: boolean }>(`select in_stock from public.products where slug='petfeb-1kva-starter-kit'`)).rows[0].in_stock === false);
  check("out of stock product remains readable to anon if published",
    (await as(null, `select * from public.products where slug='petfeb-1kva-starter-kit'`)).length === 1);

  // ── Activity log ─────────────────────────────────────────────
  // Insert entries as products staff, content staff, and all-sections staff
  await as(U.products, `insert into public.activity_logs(user_id, section, action, entity_type, entity_name)
    values('${U.products}', 'products', 'created', 'product', '1kVA Starter Solar Kit')`);
  await as(U.content, `insert into public.activity_logs(user_id, section, action, entity_type, entity_name)
    values('${U.content}', 'blog', 'published', 'blog_post', 'Getting Started with Solar')`);
  await as(U.all, `insert into public.activity_logs(user_id, section, action, entity_type, entity_name)
    values('${U.all}', 'verifications', 'reviewed', 'verification', 'Client Ada Verification')`);

  // Staff with no sections sees nothing
  check("staff with no sections sees 0 activity log entries",
    (await as(U.none, `select * from public.activity_logs`)).length === 0);

  // Anon sees nothing
  check("anon sees 0 activity log entries",
    (await as(null, `select * from public.activity_logs`)).length === 0);

  // Customer sees nothing
  check("customer sees 0 activity log entries",
    (await as(U.ada, `select * from public.activity_logs`)).length === 0);

  // Products-only staff member sees only their own entries
  const pLogs = await as<{ user_id: string }>(U.products, `select * from public.activity_logs`);
  check("products-only staff sees only their own entries",
    pLogs.length === 1 && pLogs[0].user_id === U.products);

  // Content staff sees only their own entries
  const cLogs = await as<{ user_id: string }>(U.content, `select * from public.activity_logs`);
  check("content staff sees only their own entries",
    cLogs.length === 1 && cLogs[0].user_id === U.content);

  // All-sections staff member sees all entries
  const allLogs = await as(U.all, `select * from public.activity_logs`);
  check("all-sections staff member sees all entries",
    allLogs.length === 3);

  // Nobody can edit entries
  check("products staff cannot edit activity log",
    (await as(U.products, `update public.activity_logs set action='tampered' returning id`)).length === 0);
  check("all-sections staff cannot edit activity log",
    (await as(U.all, `update public.activity_logs set action='tampered' returning id`)).length === 0);

  // Nobody can delete entries
  check("products staff cannot delete activity log",
    (await as(U.products, `delete from public.activity_logs returning id`)).length === 0);
  check("all-sections staff cannot delete activity log",
    (await as(U.all, `delete from public.activity_logs returning id`)).length === 0);

  console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
