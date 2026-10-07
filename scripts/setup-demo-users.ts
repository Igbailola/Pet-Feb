/**
 * Creates the demo auth users on a real Supabase project via the admin API (service-role key).
 * Run once, AFTER applying the migrations and BEFORE running seed.sql:
 *   npm run setup:users
 * Reads NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and DEMO_STAFF_PASSWORD from .env.local.
 * Server-side tooling only: the service-role key is never used by the Next.js app.
 */
import { createClient } from "@supabase/supabase-js";
import { DEMO_USERS } from "./demo-users";

// ── Pre-flight checks ────────────────────────────────────────

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.DEMO_STAFF_PASSWORD;

if (!url) {
  console.error("NEXT_PUBLIC_SUPABASE_URL is missing in .env.local (line 1).");
  process.exit(1);
}

if (!serviceKey) {
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY is missing in .env.local (line 4).\n" +
    "Paste the service_role (secret) key from Supabase > Project Settings > API.",
  );
  process.exit(1);
}

if (anonKey && serviceKey === anonKey) {
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY is set to the same value as the anon key in .env.local (line 4).\n" +
    "Replace it with the service_role (secret) key from Supabase > Project Settings > API.",
  );
  process.exit(1);
}

if (!password || password.length < 8) {
  console.error(
    "DEMO_STAFF_PASSWORD must be at least 8 characters.\n" +
    "Update it in .env.local (line 6).",
  );
  process.exit(1);
}

// ── Create / update users ────────────────────────────────────

const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  for (const u of DEMO_USERS) {
    const { error } = await admin.auth.admin.createUser({
      id: u.id,
      email: u.email,
      password,
      email_confirm: true,
    });
    if (error) {
      if (/already|registered|exists/i.test(error.message)) {
        const { error: upErr } = await admin.auth.admin.updateUserById(u.id, { password });
        console.log(`${u.email}: already exists, password ${upErr ? "NOT updated: " + upErr.message : "reset"}`);
      } else {
        console.error(`${u.email}: FAILED - ${error.message}`);
        process.exitCode = 1;
      }
    } else {
      console.log(`${u.email}: created (${u.label})`);
    }
  }
}
main();
