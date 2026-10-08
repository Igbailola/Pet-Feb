# Petfeb Design Reconciliation Document

This document records the systematic reconciliation of the two design sources for the Petfeb public client-side implementation:
- **Set A**: `designinspiration/` — 36 design frames from the legacy/original Petfeb Figma export (establishing layout, structural order, simplicity, and density).
- **Set B**: `stitchdesignframe/` — 16 modern design frames generated in Google Stitch (establishing visual tokens, color hierarchy, typography, card shapes, badges, and button styling).

---

## 1. Complete Inventory of Design Assets Read

### Set A: `designinspiration/` (36 files)
Every image and file in `designinspiration/` has been fully catalogued and inspected:
1. `404 Page.jpg` (Desktop 404 error page layout with return home navigation)
2. `About Mobile.jpg` (Mobile viewport layout for About Us with stacked narrative blocks)
3. `About us.jpg` (Desktop About Us page layout: mission, vision, values, leadership narrative)
4. `Blog page-1.jpg` (Desktop Blog list alternate state)
5. `Blog page-2.jpg` (Desktop Blog list alternate state)
6. `Blog page.jpg` (Primary desktop Blog / Journal catalogue with category filters and article cards)
7. `Coming soon.jpg` (Clean "Coming Soon" page with return home link)
8. `Frame 1984079528.jpg` (Desktop Blog Post Detail: "Pet-Feb Opens a New Office in Port Harcourt")
9. `Frame 1984079529.jpg` (Desktop Blog Post Detail: "Pet-Feb at the Solar Marketplace Event")
10. `Frame 1984079540.jpg` (Mobile Blog Post Detail: Port Harcourt office announcement)
11. `Frame 1984079541.jpg` (Mobile Blog Post Detail: Solar Marketplace Event)
12. `Home.jpg` (Comprehensive desktop Home page layout with hero, products, stats, values, testimonials, blog feed, and footer)
13. `Logo.jpg` (Petfeb brand mark and logo typography asset)
14. `Pet-Feb Product - Shop-1.jpg` (Shop catalog variation 1)
15. `Pet-Feb Product - Shop-2.jpg` (Shop catalog variation 2)
16. `Pet-Feb Product - Shop-3.jpg` (Shop catalog variation 3)
17. `Pet-Feb Product - Shop-4.jpg` (Shop catalog variation 4)
18. `Pet-Feb Product - Shop-5.jpg` (Shop catalog variation 5)
19. `Pet-Feb Product - Shop-6.jpg` (Shop catalog variation 6)
20. `Pet-Feb Product - Shop.jpg` (Primary desktop Shop catalogue with category filters and product cards)
21. `Pet-Feb Project-1.jpg` (Projects archive variation 1)
22. `Pet-Feb Project-2.jpg` (Projects archive variation 2)
23. `Pet-Feb Project.jpg` (Primary desktop Our Projects archive page: residential, commercial, industrial installations)
24. `Project mobile-1.jpg` (Mobile Projects archive variation 1)
25. `Project mobile-2.jpg` (Mobile Projects archive variation 2)
26. `Project mobile.jpg` (Mobile Projects archive primary layout)
27. `blog mobile-1.jpg` (Mobile Blog feed variation 1)
28. `blog mobile-2.jpg` (Mobile Blog feed variation 2)
29. `blog mobile.jpg` (Mobile Blog feed primary layout)
30. `product page-1.jpg` (Product detail page variation 1)
31. `product page-2.jpg` (Product detail page variation 2)
32. `product page-3.jpg` (Product detail page variation 3)
33. `product page-4.jpg` (Product detail page variation 4)
34. `product page-5.jpg` (Product detail page variation 5)
35. `product page-6.jpg` (Product detail page variation 6)
36. `product page.jpg` (Primary desktop Product Detail page: image gallery, price, specs table, accessories)

### Set B: `stitchdesignframe/` (16 files)
Every image and file in `stitchdesignframe/` has been fully catalogued and inspected:
1. `Petfeb Solar - About Us.jpg` (Modernized About Us page with brand tokens, leadership, and stats)
2. `Petfeb Solar - Installation Services.jpg` (Dedicated Installation workflow and booking interface)
3. `Petfeb Solar - Projects Archive.jpg` (Modernized Projects showcase with metadata tags and filtering)
4. `Petfeb Solar - Staff Auth Portal.jpg` (Staff internal login screen)
5. `Petfeb Solar - Training & Academy.jpg` (Solar technical academy and vocational training page)
6. `Section - 5. TECHNICAL TOPIC SPOTLIGHT & KNOWLEDGE PILL MATRIX.jpg` (Knowledge pill matrix component)
7. `blog post detail.jpg` (Modern blog article detail layout with typography styling and tag badges)
8. `blog.jpg` (Modern blog grid layout with category pills)
9. `buy small home.jpg` (Buy Small financing overview and loan calculator interface)
10. `cart.jpg` (Shopping cart item list, subtotal, and checkout preview)
11. `contact.jpg` (Contact Us interface with styled form fields and office metadata)
12. `delivery and checkout.jpg` (Checkout and delivery address submission screen)
13. `home.jpg` (Modern Home page with Hero product quick-view modal, trust badges, product showcases)
14. `order tracking.jpg` (Order tracker screen with tracking ID lookup input and stage timeline)
15. `priduct detail.jpg` (Modern Product Detail screen with gallery, specifications card, accessories)
16. `shop.jpg` (Modern Shop catalogue layout with price tags, stock badges, and filters)

---

## 2. Core Reconciliation Principles

1. **Hierarchy & Precedence**:
   - **Structure & Layout (Set A)**: Layout density, section sequence, and simplicity follow Set A. We reject bloated multi-step wizards or over-complex comparison matrices.
   - **Visual Language & Styling (Set B)**: Colors, typography, rounded corners, pills, borders, cards, and input styling follow Set B.
2. **Simplicity Wins**: Where Set B introduces heavy dashboards, auto-playing animations, or complex wizards with no Set A equivalent, the simpler pattern from Set A is adopted.
3. **Strict Content Integrity**: Demo numbers (e.g. "99.9% uptime", "₦4.2B saved"), fabricated partner logos, invented awards/certifications (e.g. NEMSA/SON), and fake customer testimonials in Set B are strictly rejected. Only real data from Supabase (`products`, `blog_posts`, `testimonials`, `site_content`) is displayed. Missing entries use neutral fallback text with code comments.
4. **Color & Amber Rule**:
   - Primary Green: `#7BB042`
   - Dark Green: `#1F3A0B` (footer, strong contrast headers)
   - Deep Accent Green: `#3F6B1A`
   - Amber Accent: `#F5B82E` (strictly maximum ONE amber accent per viewport region — e.g. "Request Installation" CTA in the header).
   - Neutral Gray: `#333333` body text, `#F8F9FA` background, `#E5E7EB` borders.
5. **Typography**: Space Grotesk for headings and numeric callouts; Roboto for running body text, labels, and forms.

---

## 3. Page-by-Page Reconciliation Breakdown

### 1. Home (`/`)
- **Frames Used**:
  - Set A: `Home.jpg`
  - Set B: `home.jpg`
- **Taken from Set A**:
  - Clean section flow: Hero with value proposition -> Featured Solar Kits -> Why Choose Petfeb -> Real Customer Testimonials -> Latest News / Journal Articles -> Footer.
  - Straightforward 3-column / 4-column responsive grid without overlapping parallax layers.
- **Taken from Set B**:
  - Hero layout with visual balance and featured product showcase.
  - Hero quick-view modal overlay showing featured product photo, specs, and clean dismiss controls.
  - Visual cards with subtle rounded corners (`rounded-xl`), delicate borders (`border-[#E5E7EB]`), and clean category badges.
  - Amber button styling for key action.
- **Left Out / Omitted**:
  - Demo stats (e.g., "15,000+ homes powered") unless dynamically supported or neutral.
  - Interactive multi-step loan calculators or carousel auto-scrolls.
  - Fabricated partner and regulatory accreditation logos.

### 2. About Us (`/about`)
- **Frames Used**:
  - Set A: `About us.jpg`, `About Mobile.jpg`
  - Set B: `Petfeb Solar - About Us.jpg`
- **Taken from Set A**:
  - Narrative structure: Petfeb's journey in the Nigerian energy sector, our mission to deliver uninterrupted solar power, core operational values (Integrity, Quality, Local Expertise), and vision.
  - Mobile layout flow from `About Mobile.jpg`.
- **Taken from Set B**:
  - Stat card visual presentation (framed in neat border boxes with green accent headers).
  - Highlighting values in structured cards with iconography.
- **Left Out / Omitted**:
  - Unverified executive profiles or team members not confirmed in the database/spec.
  - Complex interactive timeline widgets.

### 3. Contact Us (`/contact`)
- **Frames Used**:
  - Set A: Contact section from `Home.jpg` and legacy contact links
  - Set B: `contact.jpg`
- **Taken from Set A**:
  - Simple, direct contact structure: Physical office address (Lagos, Nigeria), official phone numbers, direct support email, business hours.
- **Taken from Set B**:
  - Input styling (crisp borders, clean label typography in Roboto, emerald focus rings).
  - Dual-column desktop layout (Contact Information & Map Card on the left, Inquiry Form Card on the right).
- **Special Implementation Rule**:
  - Per PRD and prompt instructions: public contact submission is disabled for this phase. The form inputs are rendered with clear visual styling and a friendly disabled status notice informing visitors that inquiries can be sent directly via email or WhatsApp.

### 4. Our Projects (`/projects`)
- **Frames Used**:
  - Set A: `Pet-Feb Project.jpg`, `Pet-Feb Project-1.jpg`, `Pet-Feb Project-2.jpg`, `Project mobile.jpg`
  - Set B: `Petfeb Solar - Projects Archive.jpg`
- **Taken from Set A**:
  - List-only grid format (residential systems, commercial setups, community installations).
  - Direct metadata display: Capacity (kVA/kWp), location/state, installation scope.
- **Taken from Set B**:
  - Clean filter pills (All, Residential, Commercial, Industrial).
  - Modern card treatment with tag badges and capacity chips.
- **Left Out / Omitted**:
  - Individual project detail subpages (scope explicitly specifies list page only).
  - Interactive map plotting.

### 5. Shop (`/shop`) & Product Detail (`/shop/[slug]`)
- **Frames Used**:
  - Set A: `Pet-Feb Product - Shop.jpg` (and 1–6), `product page.jpg` (and 1–6)
  - Set B: `shop.jpg`, `priduct detail.jpg`
- **Taken from Set A**:
  - Shop list: Category filtering, straightforward responsive grid showing real published products.
  - Product detail: Breadcrumb hierarchy, main product photography with thumbnail list, technical specifications table (inverter capacity, battery bank, solar array), and attached compatible accessories.
- **Taken from Set B**:
  - Badge styles (`In Stock` in green, `Out of Stock` in gray/amber), Naira currency formatting (`₦`), and modern spec list cards.
- **Data & Action Rules**:
  - Reads published products, product images, and accessories from Supabase.
  - Out-of-stock items display clear "Out of Stock" badges and disabled actions.
  - Add to Cart and Buy Small actions are visually styled but disabled or routed to placeholder routes via `COMMERCE_ACTIONS_ENABLED = false`.

### 6. Training & Academy (`/training`)
- **Frames Used**:
  - Set A: Training and capacity development references in legacy press/event frames (`Frame 1984079529.jpg`, `Frame 1984079541.jpg`)
  - Set B: `Petfeb Solar - Training & Academy.jpg`, `Section - 5. TECHNICAL TOPIC SPOTLIGHT & KNOWLEDGE PILL MATRIX.jpg`
- **Taken from Set A**:
  - Pragmatic overview of Petfeb's installer vocational training and solar technical capacity building in Nigeria.
- **Taken from Set B**:
  - Course tracks cards (Solar PV Design, Installation & Safety, Inverter Maintenance).
  - Topic spotlight cards and key learning outcomes.
- **Left Out / Omitted**:
  - Multi-step student LMS, portal logins, and live tuition payment checkout.

### 7. Journal (`/blog` and `/blog/[slug]`)
- **Frames Used**:
  - Set A: `Blog page.jpg` (and 1–2), `Frame 1984079528.jpg`, `Frame 1984079529.jpg`
  - Set B: `blog.jpg`, `blog post detail.jpg`
- **Taken from Set A**:
  - Clean article list sorted newest first with category, publication date, and cover photo.
  - Detail page structure: Headline, date, category tag, cover image, clean readable article body.
- **Taken from Set B**:
  - Polished editorial typography, card hover state, subtle back button with arrow icon, and related reading grid.
- **Data Rules**:
  - Queries published blog posts from Supabase (`status = 'published'`). Draft articles are strictly hidden.

### 8. Placeholder Pages
- **Frames Used**:
  - Set A: `Coming soon.jpg`
  - Set B: `buy small home.jpg`, `Petfeb Solar - Installation Services.jpg`, `order tracking.jpg`, `cart.jpg`
- **Pages**:
  - `/buy-small` (Buy Small Solar Financing)
  - `/installation` (Installation Services & Assessment)
  - `/track-order` (Order Tracking)
  - `/cart` (Cart)
  - `/privacy` & `/terms` (Legal & Policies)
- **Reconciled Approach**:
  - Maintain the shared public navigation and footer.
  - Display a clean status card with "Coming Soon" badge, concise explanation of the upcoming feature, and a primary green button navigating back to the homepage.

---

## 4. Navigation and Footer Architecture

### Navigation (Header)
- Header contains **exactly 6 links**:
  1. `Home` (`/`)
  2. `About Us` (`/about`)
  3. `Contact Us` (`/contact`)
  4. `Our Projects` (`/projects`)
  5. `Shop` (`/shop`)
  6. `Training` (`/training`)
- Actions:
  - Cart indicator linking to `/cart`.
  - Primary amber CTA: "Request Installation" linking to `/installation`.
- Fully responsive mobile drawer menu toggled by hamburger button.

### Footer
- Background: Deep Dark Green `#1F3A0B`, white text with soft opacity.
- Secondary Navigation links:
  - `Journal` (`/blog`)
  - `Buy Small` (`/buy-small`)
  - `Installation` (`/installation`)
  - `Track Order` (`/track-order`)
  - `Privacy Policy` (`/privacy`)
  - `Terms of Service` (`/terms`)
- Contact & Office details: pulled from `site_content` or neutral defaults.

---

## 5. Authentic Brand Assets & Verified Details from Set A

Following direct user direction to incorporate `designinspiration/Logo.jpg` and deepen factual content across pages from the design inspiration frames:
1. **Logo Integration (`Logo.jpg`)**:
   - The original asset `designinspiration/Logo.jpg` is served directly via the Next.js API route handler `/api/logo` (`src/app/api/logo/route.ts`).
   - The file was **not moved, renamed, edited, deleted, or copied**, satisfying all repository integrity rules.
   - Displayed in the public `Header`, `Footer`, and `About Us` hero badge.
2. **Corporate Motto**:
   - `"BUILDING YOUR VISIONS, CREATING REALITY"` (featured in `Footer`, `Header`, and `Home` hero).
3. **Official Corporate Headquarters & Tri-City Hubs**:
   - Head Office: `Plot 23 Birabi Street, GRA 1, Port Harcourt, Rivers State, 840100, NG`
   - Regional Branches: Lagos Hub & Abuja Regional Branch (supervised by Regional Manager Mr. Jude Egbri).
   - Phone: `+234 813-585-4054`
   - Email: `info@petfeb.com`
4. **Historical Milestones (2015–2025)**:
   - 2015: Founded with the mission to make renewable energy accessible in Nigeria.
   - 2017: First large-scale installation project completed.
   - 2020: Expanded regional presence across Lagos, Abuja, and Port Harcourt.
   - 2025: International trade partnerships and advanced inverter & lithium capacity training.
5. **Verified Vision & Mission Pillars**:
   - 4-point Vision (trusted provider, Africa-wide adoption, sustainable communities, innovation).
   - 4-point Mission (world-class installations, skills empowerment, eco-friendly standards, customer integrity).
6. **Featured Real Projects**:
   - `"Light Up Umueri"` — Community solar electrification initiative.
   - `"Building Global Capacity"` — International manufacturing transfer and staff training program.
   - 10kVA Commercial Hybrid Solar in Victoria Island, Lagos.
   - 15kVA Agro-Processing Solar in Port Harcourt, Rivers State.
   - 5kVA Whole-Home Solar Backup in Abuja, FCT.
