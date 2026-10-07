-- Demo data (prototype only). Fixed UUIDs so tests and later steps can reference them.
-- Image paths are placeholders for assets to be uploaded via the admin Products section.

-- ---------- Auth users ----------
-- NOT created here. On real Supabase, run `npm run setup:users` BEFORE this seed: it creates the
-- demo auth users (same fixed UUIDs below) through the admin API. See scripts/demo-users.ts.

insert into public.profiles (id, email, full_name, phone, is_staff) values
  ('00000000-0000-0000-0000-0000000000a1', 'superstaff@demo.petfeb.test', 'Demo All-Sections Staff', null, true),
  ('00000000-0000-0000-0000-0000000000a2', 'products@demo.petfeb.test',   'Demo Products Staff',     null, true),
  ('00000000-0000-0000-0000-0000000000a3', 'content@demo.petfeb.test',    'Demo Content Staff',      null, true),
  ('00000000-0000-0000-0000-0000000000a4', 'nosections@demo.petfeb.test', 'Demo Staff No Sections',  null, true),
  ('00000000-0000-0000-0000-0000000000b1', 'ada@demo.petfeb.test',   'Ada Obi',     '+2348000000001', false),
  ('00000000-0000-0000-0000-0000000000b2', 'tunde@demo.petfeb.test', 'Tunde Bello', '+2348000000002', false),
  ('00000000-0000-0000-0000-0000000000b3', 'ngozi@demo.petfeb.test', 'Ngozi Eze',   '+2348000000003', false),
  ('00000000-0000-0000-0000-0000000000b4', 'sam@demo.petfeb.test',   'Sam Okafor',  '+2348000000004', false);

-- ---------- Admin sections ----------
insert into public.staff_sections (user_id, section) values
  ('00000000-0000-0000-0000-0000000000a1', 'cms'),
  ('00000000-0000-0000-0000-0000000000a1', 'blog'),
  ('00000000-0000-0000-0000-0000000000a1', 'products'),
  ('00000000-0000-0000-0000-0000000000a1', 'verifications'),
  ('00000000-0000-0000-0000-0000000000a1', 'testimonials'),
  ('00000000-0000-0000-0000-0000000000a1', 'other_updates'),
  ('00000000-0000-0000-0000-0000000000a2', 'products'),
  ('00000000-0000-0000-0000-0000000000a3', 'cms'),
  ('00000000-0000-0000-0000-0000000000a3', 'blog'),
  ('00000000-0000-0000-0000-0000000000a3', 'testimonials');
-- a4 intentionally has none.

-- ---------- Products ----------
insert into public.products (id, slug, name, description, price, category, status, specs) values
  ('10000000-0000-0000-0000-000000000001', 'petfeb-1kva-starter-kit', '1kVA Starter Solar Kit',
   'Compact solar kit for lights, fans, TV and phone charging.', 450000, 'Solar kits', 'published',
   '{"inverter":"1kVA","battery":"1 x 100Ah","panels":"2 x 200W"}'),
  ('10000000-0000-0000-0000-000000000002', 'petfeb-3kva-home-kit', '3kVA Home Solar Kit',
   'Whole-home backup for appliances including fridge and freezer.', 1850000, 'Solar kits', 'published',
   '{"inverter":"3kVA","battery":"2 x 200Ah","panels":"6 x 400W"}'),
  ('10000000-0000-0000-0000-000000000003', 'petfeb-5kva-business-kit', '5kVA Business Solar Kit',
   'Higher-capacity system (not yet published).', 3200000, 'Solar kits', 'draft',
   '{"inverter":"5kVA","battery":"4 x 200Ah","panels":"10 x 400W"}');

insert into public.product_images (product_id, url, alt_text, sort_order, is_main) values
  ('10000000-0000-0000-0000-000000000001', '/seed/products/1kva-main.jpg', '1kVA starter kit', 0, true),
  ('10000000-0000-0000-0000-000000000001', '/seed/products/1kva-side.jpg', '1kVA starter kit side view', 1, false),
  ('10000000-0000-0000-0000-000000000002', '/seed/products/3kva-main.jpg', '3kVA home kit', 0, true),
  ('10000000-0000-0000-0000-000000000003', '/seed/products/5kva-main.jpg', '5kVA business kit', 0, true);

insert into public.accessories (id, name, description, price, image_url, status) values
  ('20000000-0000-0000-0000-000000000001', 'Mounting rail set', 'Aluminium rails for roof mounting.', 45000, '/seed/accessories/rails.jpg', 'published'),
  ('20000000-0000-0000-0000-000000000002', 'Panel cleaning kit', 'Soft brush and extension pole.', 15000, '/seed/accessories/cleaning.jpg', 'published'),
  ('20000000-0000-0000-0000-000000000003', 'Wi-Fi monitoring dongle', 'Remote system monitoring.', 30000, null, 'draft');

insert into public.product_accessories (product_id, accessory_id, sort_order) values
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 0),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 1),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 0),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002', 1),
  ('10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 2);

-- ---------- Testimonials ----------
insert into public.testimonials (author_name, author_role, message, photo_url, status) values
  ('Chioma A.', 'Homeowner, Lagos', 'Our power cuts are a thing of the past. Installation was neat and quick.', null, 'published'),
  ('Mr. Danladi', 'Shop owner, Abuja', 'The system has run my shop reliably for months.', '/seed/testimonials/danladi.jpg', 'published'),
  ('Funmi T.', 'Clinic manager, Ibadan', 'Draft quote awaiting approval to display.', null, 'hidden');

-- ---------- Blog ----------
insert into public.blog_posts (title, slug, cover_image, body, category, status, published_at) values
  ('How to size a solar system for your home', 'size-a-solar-system-for-your-home', '/seed/blog/sizing.jpg',
   'Start by listing your appliances and their wattage...', 'Guides', 'published', '2026-09-15T09:00:00Z'),
  ('Solar maintenance basics', 'solar-maintenance-basics', '/seed/blog/maintenance.jpg',
   'Keep panels clean and check connections regularly...', 'Guides', 'published', '2026-09-28T09:00:00Z'),
  ('Upcoming: what to ask your installer', 'what-to-ask-your-installer', null,
   'Work in progress...', 'Guides', 'draft', null);

-- ---------- Site content (CMS section) ----------
insert into public.site_content (key, value) values
  ('home.hero.headline', '"Power your world with solar"'),
  ('footer.contact_email', '"hello@petfeb.example"');

-- ---------- Verification submissions ----------
-- b1: pending, b2: verified, b3: rejected (with reason), b4: not started (no submission).
insert into public.verification_submissions (user_id, id_document_path, decision, reviewer_id, decided_at, rejection_reason) values
  ('00000000-0000-0000-0000-0000000000b1', 'verification/b1/id-front.jpg', 'pending',  null, null, null),
  ('00000000-0000-0000-0000-0000000000b2', 'verification/b2/id-front.jpg', 'approved', '00000000-0000-0000-0000-0000000000a1', now(), null),
  ('00000000-0000-0000-0000-0000000000b3', 'verification/b3/id-front.jpg', 'rejected', '00000000-0000-0000-0000-0000000000a1', now(), 'Image was unreadable. Please resubmit a clear photo.');
