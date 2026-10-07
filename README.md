# Petfeb Platform

Solar commerce, financing, installation, training, CMS, CRM and internal team-management platform.
**Source of truth: the "PETFEB MASTER PRD"** (`docs/PETFEB_MASTER_PRD.docx`).
Every Antigravity prompt for this project must reference it by that exact name.


## 1. Read This First (Rules for the Implementation Agent)

These rules come straight from the Master PRD. They override any default behaviour.

1. **Do not start by writing code.** The first step is a **read-only audit** of the existing Petfeb website and this repository. Only after the audit does implementation begin.
2. **This is a product re-engineering, not a copy of the Framer site.** Preserve Petfeb's brand, content, products, projects, testimonials and SEO value, but improve UX, performance, accessibility and structure.
3. **Prototype-first.** Use demo data, Paystack **test mode**, mock KYC and test email destinations. Do not ask for or require real Petfeb credentials.
4. **Never invent business policy.** Financing, refunds, ownership, delivery, installation, KYC, discounts, alumni benefits, certification, internships, commissions, late payments, cancellation and warranties all need Petfeb's approval. Make them **configurable**, never hard-coded.
5. **Never expose secrets.** Supabase service-role key, Paystack secret key, Resend key and KYC secrets stay in server-side environment variables only.
6. **If a requirement conflicts with the Master PRD, flag it before changing code.**
7. **If a new requirement appears, add it to the Master PRD.** Do not create a competing PRD.
8. **Final product principle:** do not add a feature just because the tech allows it. Every feature must serve a clear customer or business purpose.


## 2. Product Summary

Petfeb is moving from a traditional company website into one connected ecosystem:

**Discover → Learn → Buy → Finance → Install → Work → Grow → Return**

The platform covers:

| Area | What it does |
|---|---|
| Public website | Home, About, Shop, Product pages, Buy Small, Projects, Training, Blog, Contact, FAQ, legal pages |
| Commerce | Catalogue, search, filters, cart, **guest checkout**, orders, guest order tracking |
| Payments | Paystack init, verification, webhooks, refund readiness |
| Buy Small | Deposit plus installment financing, owned by the platform |
| Installation | Installer profiles, requests, assignment, scheduling |
| Inventory | Stock, reservations, movements, low-stock alerts |
| CRM | Customer records, notes, follow-ups, timeline |
| Training | Programs, applications, internship pipeline, alumni |
| CMS | Blog, projects, testimonials, media, pages, SEO, version history |
| Team | Staff accounts, roles, permissions, tasks, goals/KPIs, audit logs |
| Email | Event-driven transactional emails |

**Key rule: customers never need an account.** Only staff have authenticated accounts.


## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth (staff only) |
| Storage | Supabase Storage (media library) |
| Payments | Paystack |
| Email | Resend |
| KYC | Provider abstraction (mock in prototype; Mono Prove, VerifyMe or other later) |
| Validation | Zod (client **and** server) |
| Hosting | Vercel |
| Security | Supabase RLS, server-side authorization, webhook signature checks, rate limiting |


## Brand Tokens

Official brand tokens. Use exactly these values. Full design system: `docs/design-system.md`.

| Token | Value |
|---|---|
| Primary | `#7BB042` |
| Secondary | `#F5B82E` |
| White | `#FFFFFF` |
| Grey | `#333333` |
| Black | `#000000` |

| Type | Choice |
|---|---|
| Heading font | Space Grotesk |
| Body font | Roboto |
| Icons | Lucide (`lucide-react`) |

Rules:
- Use only Space Grotesk and Roboto, and only Lucide icons.
- Do not use the old audit colours (`#70a03c`, `#446124`, `#f2f7ec`) as brand colours.
- White text on Primary or Secondary fails contrast. Use black or `#333333` text on them.
- For green text or links on white, use the darker derived green in `docs/design-system.md`, not `#7BB042`.


## 4. Architecture

```
Admin CMS → Supabase Database → Published Content → Next.js Frontend
```

Publishing must trigger cache revalidation so new content appears without a manual deploy.

Keep these concerns separated: **UI, business logic, database access, external integrations, auth, validation, email, payments.**

External providers are wrapped in service modules so any of them can be swapped without rewriting the app:

```
services/
  paystack/
  resend/
  kyc/
  inventory/
  buy-small/
```

### Suggested project structure

```
/
├── README.md
├── docs/
│   └── PETFEB_MASTER_PRD.docx
├── src/
│   ├── app/
│   │   ├── (public)/        # website, shop, blog, training, buy-small
│   │   ├── (admin)/         # staff dashboard
│   │   └── api/             # route handlers, Paystack webhook
│   ├── components/          # ui/ (shadcn), shared, admin, public
│   ├── services/            # paystack, resend, kyc, inventory, buy-small
│   ├── lib/                 # supabase clients, auth, rbac, utils
│   ├── schemas/             # Zod schemas
│   └── emails/              # reusable email templates
├── supabase/
│   ├── migrations/
│   └── seed.sql             # demo data
└── .env.example
```

## 5. Core Flows

### Guest checkout
1. Browse and search products, then add to cart (no login).
2. Cart calculates subtotal, delivery fee, installation fee and total.
3. Checkout collects only what is needed: name, email, phone, address, state, city, delivery notes.
4. Checkout asks **"Do you want an installer?"** (Yes/No). If yes, an installation request is created and linked to the order.
5. Server initialises Paystack payment, then verifies payment server-side.
6. Order is confirmed and a confirmation email is sent.
7. Customer tracks the order with order number plus email or phone.

### Buy Small (installment financing)
1. Customer opens a Buy Small-eligible product and selects **Buy Small**.
2. Chooses deposit: **30%, 40% or 50%**.
3. Chooses frequency: **weekly, biweekly or monthly**.
4. System calculates the initial payment, remaining balance and installment amount.
5. Customer provides details, passes mock/real KYC if required, and accepts the agreement.
6. Deposit is paid, the agreement activates and installments are scheduled.
7. Reminders go out, each payment is recorded, and the balance is recalculated until completion.

Worked example (illustration only): ₦500,000 product, 40% deposit means ₦200,000 initial payment, ₦300,000 balance, and over 10 equal periods ₦30,000 per installment.

**The platform owns the installment schedule; Paystack is only the payment rail.** All three frequencies must work even where Paystack subscriptions don't map to the interval. Support retries, grace periods, failed payments, cancellation and admin intervention.

**Rules to confirm with Petfeb (do not assume):** who qualifies, min/max purchase value, repayment duration, late-payment policy, grace period, failed-payment policy, cancellation and refund policy, product release timing, ownership transfer, fees, KYC requirements, geographic eligibility.

### Training to alumni
Apply (no account) → staff review → enrolment → optional internship pipeline (Interested, Applied, Reviewing, Interview, Accepted, Rejected, Completed) → alumni with configurable benefits.

### Blog workflow
`Draft → Review → Approved → Published → Archived`, with permission-controlled create, edit, review, approve, publish and archive.


## 6. Status Reference

**Order:** Pending, Payment Processing, Paid, Processing, Ready for Delivery, Out for Delivery, Delivered, Installation Pending, Installation Scheduled, Installation Completed, Cancelled, Refunded

**Installation:** Requested, Pending Assignment, Assigned, Scheduled, In Progress, Completed, Cancelled

**Task:** To Do, In Progress, Blocked, Completed, Cancelled

**Goal:** Not Started, On Track, At Risk, Behind, Completed, Cancelled (types: numeric, count, percentage, boolean, milestone; periods: monthly, quarterly, yearly)


## 7. Roles and Permissions (RBAC)

Roles are **configurable**. Permissions are **granular**. Navigation adapts to what each user may access.

| Role | Scope |
|---|---|
| Super Admin | Full access |
| Operations Manager | Orders, installations, operations, reports |
| Sales Manager | Customers, sales, follow-ups, orders |
| Inventory Manager | Products, stock, movements |
| Training Manager | Programs, applicants, alumni |
| Content Manager | Blog, projects, testimonials, media |
| Marketing Staff | Content, campaigns, leads, selected reports |
| Customer Support | Customers, orders, follow-ups |
| Installer | Assigned jobs and relevant customer info only |

Example permissions: view/create/edit/archive products, view/adjust inventory, view/update orders, view customers, create follow-ups, manage training, manage/publish blog, manage staff/roles, view reports, manage Buy Small, manage installations, view audit logs, manage system settings.

Staff onboarding: admin invites, staff accepts, sets secure credentials, profile activates with role and department.


## 8. Database (Supabase / PostgreSQL)

**Commerce:** `products`, `categories`, `product_categories`, `customers`, `orders`, `order_items`, `payments`
**Buy Small:** `buy_small_agreements`, `installments`
**Installation:** `installers`, `installations`
**Training:** `training_programs`, `training_applications`, `alumni`, `internship_records`
**CRM:** `followups`, `customer_notes`
**CMS:** `blog_posts`, `blog_categories`, `projects`, `testimonials`, `media_assets`, `pages`
**Team:** `profiles`, `departments`, `roles`, `permissions`, `role_permissions`, `user_roles`, `tasks`, `goals`, `goal_updates`
**Security:** `audit_logs`

More tables (inventory, stock movements, content versions, notifications) are allowed when implementation needs them.

**Key relationships:** Customer → Orders, Agreements, Installations, Follow-ups. Order → Items, Payments, Installation. Product → Inventory, Order Items, Agreements. Training Program → Applications → Alumni/Internship. Staff → Roles, Department, Tasks, Goals.

**RLS is mandatory.** Customer data, orders, payments, agreements, installments, staff info, audit logs and KYC data must never be publicly readable. Public reads expose **published** content only.


## 9. Security Requirements

- Verify every payment **server-side**.
- Validate **Paystack webhook signatures**; reject invalid requests.
- Process webhooks **idempotently**; prevent duplicate orders.
- Never store card numbers, CVV or raw card credentials.
- Zod validation on all forms, on the server too.
- Rate-limit: auth, password reset, checkout init, order tracking, Buy Small applications, KYC, contact and training forms, public APIs.
- Audit-log important admin actions; keep sensitive data out of logs; protect logs from ordinary staff edits.
- Handle errors gracefully (payment, network, out-of-stock, email, webhook, KYC, DB, unauthorized, expired session) with clear user messages and safe internal logs.


## 10. Quality Bar

- **SEO:** titles, meta, Open Graph, canonical URLs, structured data, sitemap, robots, clean URLs. CMS editors manage SEO fields.
- **Performance:** optimised and lazy-loaded images, server rendering where useful, efficient queries, caching/revalidation, minimal JS, good Core Web Vitals.
- **Responsive:** small mobile through large desktop, no horizontal overflow, no cramped cards or tiny buttons. Admin must be usable on small screens.
- **Accessibility:** keyboard navigation, contrast, visible focus, semantic HTML, labelled forms, clear errors, alt text.
- **Design:** based on Petfeb's existing identity; should feel like a credible solar-energy company, **not a generic ecommerce template**.


## 11. Environment Variables

Create `.env.local` (never commit it). Use test or demo values in the prototype.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only

# Paystack (TEST keys only in prototype)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=              # server only

# Resend
RESEND_API_KEY=                   # server only
EMAIL_FROM=

# KYC
KYC_PROVIDER=mock
KYC_API_SECRET=                   # server only

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```


## 12. Development Roadmap

Work phase by phase. Do not jump ahead.

| Phase | Focus |
|---|---|
| **0** | Discovery and audit (read-only, no implementation). Produce the information architecture. |
| **1** | UX and design system: direction, typography, colours, components, key page designs |
| **2** | Foundation: Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, env, DB, storage, auth |
| **3** | Commerce: products, categories, cart, checkout, orders, payments, Paystack, guest tracking |
| **4** | Inventory: stock, reservations, movements, low-stock alerts |
| **5** | Buy Small: eligibility, calculations, agreements, installments, reminders, failed payments |
| **6** | Installation and CRM: installers, assignment, scheduling, customers, follow-ups, timeline |
| **7** | Training: programs, applications, internship pipeline, alumni |
| **8** | CMS: blog, projects, testimonials, media, pages, SEO, workflow, version history |
| **9** | Team: staff, departments, roles, permissions, tasks, goals/KPIs, activity, audit logs |
| **10** | Production hardening: security audit, RLS review, payment/webhook/email/KYC testing, performance, accessibility, SEO, backups, monitoring, real content and credentials |


## 13. V1 Definition of Done

**Public:** responsive site, browse products, cart, checkout, Paystack test payment, order confirmation, guest tracking, Buy Small UX, training pages and application, blog, projects, testimonials, contact.

**Admin:** staff login, roles and permissions, manage products, inventory, orders, customers (view), installations, training, blog publishing, projects, testimonials, staff, tasks, goals, and audit activity recorded.

**Security:** RLS configured, secrets protected, payment and webhook verification working, input validation, authorization, sensitive data protected.


## 14. Testing Checklist

- **Public:** navigation, search, filters, product pages, cart, checkout, forms, mobile/tablet/desktop
- **Payments:** success, failure, duplicate webhook, invalid webhook, verification, order creation
- **Buy Small:** deposit and installment math, weekly/biweekly/monthly, failed payment, completion, cancellation
- **Admin:** login, role restrictions, permissions, CRUD, CMS publishing, inventory, orders, goals, tasks
- **Security:** unauthorized routes, RLS, validation, rate limiting, secrets, webhooks, sessions


## 15. Before Production

Replace all prototype systems with approved Petfeb configuration: domain, Supabase, Paystack, Resend, KYC provider, real content, pricing, policies, Buy Small rules, staff, inventory and email addresses.

Legal pages needed (wording from Petfeb's legal representative): Terms, Privacy Policy, Buy Small terms, Refund/Cancellation, Installation terms, Training terms, consent, data handling, KYC/privacy disclosures.


## 16. How to Prompt Antigravity

Start every session like this:

```
Reference: PETFEB MASTER PRD (docs/PETFEB_MASTER_PRD.docx) and README.md.
Current phase: <Phase N — name>
Task: <what to do>
Rules: no invented business policy, no secrets in code,
flag any conflict with the PRD before changing code.
```

For the very first session, use:

```
Reference: PETFEB MASTER PRD and README.md.
Run Phase 0 only: a read-only audit of the existing Petfeb website and this repo.
Do not write any application code. Report routes, content, assets, visual language,
SEO URLs, dependencies and gaps, then propose the information architecture.
```

## Design Decisions Update (October 2026)

These decisions come from the design review of the Google Stitch files generated from screen.md. They override earlier screen definitions wherever they conflict. Source for journeys: the Petfeb Solar Service Blueprint.

### 1. Homepage hero modal
- The modal shown on the hero section must include the product image.
- The image comes from the product record managed in the admin dashboard (see section 5). Do not hard-code it.

### 2. Navigation
- Main navigation contains only: Home, About Us, Contact Us, Our Projects, Shop, Training.
- Every other link (Journal, Buy Small, Installation, Track Order, support, legal and similar) moves to the footer.
- Pages not in the main nav stay reachable through page calls to action and the footer.

### 3. Testimonials
- Testimonials are added, edited, hidden and deleted by an admin from the admin dashboard.
- The public site only reads published testimonials.

### 4. Buy Small access
- Users must sign up and complete identity verification before they can use Buy Small.
- Verification states: not started, pending, verified, rejected.
- Buy Small stays locked until the state is verified.
- Outright purchase keeps guest checkout (no account needed). Only Buy Small is gated.
- Open question: which ID types are accepted and what happens after a rejection. No eligibility rules are assumed.

### 5. Products and CMS
- Products, product images, product details and accessories are managed from the admin dashboard.
- This means a CMS layer. Every public page that shows products (Shop, Product detail, Cart, hero modal) reads from the same source.

### 6. Blog
- The Journal (blog and articles) is created, edited, published and unpublished from the admin dashboard.

### 7. Admin dashboard sections
The admin role is divided into sections, each with its own access:
- CMS and site content
- Blog
- Products
- Client verifications
- Testimonials
- Other site updates (orders, Buy Small plans, installers, projects)

### Build order
1. Data model and admin roles (products, accessories, testimonials, blog posts, verifications).
2. Admin sections that write to that data.
3. Public pages reading from it, including the hero modal, the new nav and the footer.
4. Sign-up and identity verification, then Buy Small gated behind it.
5. Missing screens from the blueprint checklist, starting with order confirmation and payment failure/retry.