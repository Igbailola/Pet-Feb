# Petfeb Screen Briefs (Phase 1)

Reference: PETFEB MASTER PRD, README.md, Phase 0 audit, `docs/design-system.md`.
Each brief below is self-contained so it can be pasted into Google Stitch. **Paste the Global Prefix first, then one screen brief.** Generate desktop (1440px) and mobile (390px) versions of each screen.

All prices, stock levels, customers, orders, installers, training data, stats, and policy terms are **demo data / demo placeholders, pending Petfeb approval**. Real public content that may be reused: nav labels, product types (solar panels, inverters, batteries, lithium batteries, micro inverter), project titles ("How Pet-Feb Is Transforming Communities Through Solar Street Lighting", "Pet-Feb's Journey Across Nigeria's Clean Energy Landscape", "Building Global Capacity: Pet-Feb's China Partnership & Staff Training Program"), blog titles ("Empowering Tomorrow's Engineers: Inside Pet-Feb's Solar Training Programs", "Lighting Up Communities", "Feb Expands to Port Harcourt"), and social handles.

---

## Global Prefix (paste before every screen)

```
Design a screen for Petfeb, a Nigerian solar energy company that sells solar products, finances them (Buy Small), installs them, and trains installers. Tone: plain, confident, practical, "power you can trust". It must look like a credible energy company, not a generic ecommerce template.

BRAND (use exactly):
- Primary green #7BB042, secondary amber #F5B82E, white #FFFFFF, grey #333333, black #000000.
- Derived: text-on-white green #3F6B1A; deep green band #1F3A0B; green tints #E8F3DA and #F4F9EC; amber tint #FDF0CC; secondary text #5C5C5C; control border #8A8A8A; decorative border #D9D9D9; admin background #F8F8F8; error #B3261E on #FCE8E6; info #1F5FA8 on #E6F0FA.
- Do NOT use old greens #70a03c, #446124, #f2f7ec.
- Buttons and badges in green or amber ALWAYS have black text. Never white text on #7BB042 or #F5B82E. Green text or links on white use #3F6B1A, never #7BB042. Amber text on white uses #8A5A00.
- Fonts: Space Grotesk for headings, numbers, buttons, nav. Roboto for body, forms, tables. No other fonts.
- Icons: Lucide only (lucide-react), 1.75 stroke, 20px in buttons, 24px in nav and cards. Exception: official monochrome brand logos for LinkedIn, Facebook, Instagram and X in footer and contact page.
- Radius: 10px inputs and buttons, 16px cards, 24px large image panels, full pills for chips.
- Shadows very soft and green-tinted. 1px borders #D9D9D9 on cards.

SOLAR / TRUST LANGUAGE:
- A cropped sun-arc motif (amber quarter circle with thin green rays) in section corners.
- An "energy spec strip": row of key numbers (kVA, Ah, warranty years, backup hours) in Space Grotesk, separated by hairlines. All spec claims (warranty, backup hours) are demo placeholders, pending Petfeb approval.
- A segmented "power meter" progress bar (10 segments, green) for deposits, stock, seats and goals.
- A faint solar-cell grid texture (4% opacity) on deep green bands.
- Trust rail: certified installers, warranty, secure Paystack payment, support line. All claims are demo placeholders, pending Petfeb approval.
- Real installation photography with a small "Location, Year" caption chip.
- Amber rule: only ONE amber element per viewport region. On public pages, the header "Request installation" button is amber (#F5B82E, black text). When that header button or another amber element is in view, other elements (such as hero eyebrows, badges, or Buy Small panels) MUST use Primary green (#7BB042 with black text) or black/white. Never multiple competing amber elements in one view.

SHARED CHROME:
- Public header: white, sticky, 72px. Logo left. Nav: Shop, Buy Small, Projects, Training, Blog, About, Contact. Right: search icon, cart icon with black count badge (white text), amber "Request installation" button with black text. Above it a thin deep-green trust strip with white text: "Free site assessment · Certified installers · Pay in installments with Buy Small (demo placeholders, pending Petfeb approval)".
- Footer: deep green #1F3A0B with solar-cell texture, white text, columns: brand and socials (official monochrome icons for LinkedIn, Facebook, Instagram, X), Shop, Company, Support (FAQ, Track order / Agreement lookup, Installation, Buy Small), Legal. Bottom bar with a lock icon and "Secure payments by Paystack".
- Status is never shown by colour alone: every status chip has a Lucide icon and a label.
- Minimum tap target 44px. Visible focus ring: 2px black with white offset.
```

---

## 1. Home

**Purpose:** Explain what Petfeb does in five seconds, build trust, route visitors to Shop, Buy Small, Installation, Training or Contact.

**Layout sections (top to bottom)**
1. **Hero** (24px-radius image panel, real rooftop installation photo with a left-to-right dark overlay so text stays AA): eyebrow "Solar energy company, Nigeria" in white with green-300 accent (not amber, adhering to the amber rule since header button is amber); Display headline "Reliable solar power for homes, businesses and communities." Lead text (Body L, white). CTAs: Primary "Explore products" (#7BB042, black text, arrow), Outline-on-dark "View projects". Right-bottom floating **spec card** (white): "5 kVA system, about 8 hours backup, from ₦X/week with Buy Small (demo placeholder, pending Petfeb approval)" with a small power meter. Sun-arc motif cropped at the top-right.
2. **Trust stat strip** (white, 4 stat cards in a row): demo stats "10+ years of service", "6,000+ people trained", "Homes and businesses powered", "Panels installed nationwide" (Number XL, label, `shield-check`/`graduation-cap` icons). Footnote: "All statistics are demo placeholders, pending Petfeb approval."
3. **Partner logos** ("Our current solar partners"): greyscale logo row, scrolling on mobile.
4. **How Petfeb works** (green-50 band): 5 steps with Lucide icons connected by a dotted line: Discover (`search`), Choose (`sun`), Pay or Buy Small (`wallet`), Install (`wrench`), Support (`phone`). H2 "From first question to first light".
5. **Featured products** (white): H2 "Solar products built for Nigerian conditions", 4 product cards (Micro Inverter, Lithium Battery, G12V 200AH Battery, Hybrid Inverter [demo placeholder]) with spec strip and price (demo prices, pending Petfeb approval), link "Shop all products".
6. **Buy Small promo band** (green-50 band with sun-arc; or amber-50 only if no other amber is in view): H2 "Start with 30 percent. Pay the rest weekly, biweekly or monthly." mini-calculator preview (slider-less, three deposit chips 30%, 40%, 50%) and a Dark button "See how Buy Small works" plus link "Apply now". Note: "All deposit percentages, fees, and installment amounts are demo placeholders, pending Petfeb approval."
7. **Installation CTA** (two-column: photo left, text right): H2 "Installed by certified teams", 3 bullets (`hard-hat` site assessment, `wrench` professional installation, `shield-check` warranty and support; all demo placeholders, pending Petfeb approval), Primary "Request installation" (#7BB042, black text).
8. **Projects** (white): H2 "Projects across Nigeria and beyond", 3 project cards with location chip: Solar street lighting (Nigeria), Clean Energy Landscape (Nigeria), China Partnership & Staff Training (China). Link "See all projects".
9. **Training band** (deep green with cell texture, white text): eyebrow "Petfeb Solar Training", H2 "Learn solar installation, maintenance and system design", Primary green button "Join training" (#7BB042, black text; green to comply with amber rule), small row of next intake dates (demo).
10. **Testimonials** (green-50): carousel of 3 quote cards with `quote` icon, name, location, product bought. Note: "Testimonials are demo placeholders, pending Petfeb approval."
11. **Blog** (white): 3 latest posts cards.
12. **Final CTA band** (amber with sun-arc, isolated viewport region): "Not sure what size system you need?" Dark button "Talk to Petfeb", and phone/WhatsApp.

**Key components:** hero panel, stat card, product card, step list, promo band, project card, testimonial card, blog card, CTA bands.

**States**
- Loading: hero image skeleton with solid green-50 and text visible; product cards skeleton; no layout shift.
- Empty: if no testimonials or posts published, hide the section (not an empty box).
- Error: if products fail to load, show an inline alert "Products could not load" with "Try again" inside the featured products section; rest of the page remains.

**Mobile (390px):** hero image shortened to 560px height, headline 40px, CTAs stacked full width, spec card moves below the CTAs. Stats 2x2. Partner logos horizontal scroll. Steps become a vertical timeline. Product and project cards horizontal scroll-snap with peeking next card. Trust strip collapsible. Sticky bottom bar is not used on Home.

---

## 2. Shop

**Purpose:** Browse, search, filter and sort products; spot Buy Small eligible items quickly.

**Layout sections**
1. **Page header** (green-50 band): breadcrumb, H1 "Shop solar products", one-line help, search input (large, with `search` icon), quick category pills: All, Panels, Inverters, Batteries, Solar systems, Accessories.
2. **Toolbar:** result count "24 products", sort select (Featured, Price low to high, Price high to low, Newest).
3. **Filter column (desktop, 280px):** Category, Price range (dual slider plus min and max inputs), Capacity (kVA or Ah), Brand, Availability (In stock), "Buy Small eligible" checkbox, "Installation available" checkbox, Clear all link. Active filters as removable pills above the grid.
4. **Product grid:** 3 columns at 1200px content width (4 at wide), product cards per the design system with badges (Buy Small [green-100 or amber depending on amber rule], Low stock, New), spec strip, price (demo placeholders), "From ₦X/week" line (demo placeholder), Add to cart.
5. **Pagination:** numbered on desktop, "Load more" on mobile.
6. **Help band** below the grid: "Not sure which system fits? Tell us your appliances" with Dark button "Get advice".

**Key components:** search, filter groups, pills, sort select, product card, pagination, skeleton card.

**States**
- Loading: 8 skeleton product cards, filters disabled with skeleton.
- Empty (no results): large `search-x` illustration, "No products match your filters", buttons "Clear filters" (Primary) and "Contact us".
- Empty catalogue: "Products coming soon" with Contact CTA.
- Error: alert "We couldn't load products" with "Try again".
- Out of stock cards: grey-100 "Out of stock" chip, disabled button.

**Mobile:** 2-column compact cards. "Filters (2)" and "Sort" buttons in a sticky bar under the header; filters in a bottom sheet with "Show 18 results" Primary button at the bottom. Category pills scroll horizontally. Search collapses into the header search icon with an expanded full-width field.

---

## 3. Product page

**Purpose:** Convince and convert: clarity on specs, price, stock, Buy Small and installation.

**Layout sections**
1. **Breadcrumb:** Shop / Inverters / Product name.
2. **Two-column top (desktop 7/5):**
   - Left: gallery with large image (1:1, green-50 backdrop), 4 to 6 thumbnails, zoom on click, keyboard-accessible.
   - Right (sticky purchase panel in a white card): category eyebrow, H1 product name, short description, **energy spec strip** (capacity, voltage, warranty, backup hours; all demo placeholders, pending Petfeb approval), price (Number XL, demo placeholder) with strikethrough if discounted, stock chip ("In stock, 12 left" with `circle-check`, or "Low stock" amber, or "Out of stock"), quantity stepper, Primary "Add to cart" (#7BB042, black text).
   - **Buy Small panel:** "Pay from ₦X/week (demo placeholder)" with a mini selector (deposit 30%, 40%, 50% chips and frequency pills) and button "Buy with Buy Small" (Primary green #7BB042 with black text to adhere to the amber rule, as the header already has an amber CTA).
   - **Installation row (informational, not a checkbox):** `wrench` icon plus informational text: "Installation available, choose at checkout. Certified Petfeb installers (demo placeholder, pending Petfeb approval)."
   - Delivery estimate line with `truck` (demo placeholder).
   - Trust rail below: Warranty, Certified installers, Secure Paystack payment (all claims are demo placeholders, pending Petfeb approval).
3. **Tabs:** Overview, Specifications (two-column spec table), Warranty and delivery (demo text), FAQs (accordion).
4. **"What can it power?"** (green-50): icon list of appliances with demo backup hours (`tv`, `refrigerator`, `fan`, `lightbulb`; demo placeholders, pending Petfeb approval).
5. **Related products:** 4 product cards.
6. **Final CTA:** "Need help choosing? Talk to our team".

**Key components:** gallery, purchase card, spec strip, stock chip, quantity stepper, Buy Small mini-selector, tabs, accordion, product card.

**States**
- Loading: gallery skeleton, text skeleton lines, price skeleton.
- Out of stock: Add to cart disabled with chip; Buy Small hidden; show "Contact us for availability" button and related alternatives.
- Not Buy Small eligible: Buy Small panel is replaced by a small neutral note "Not available for Buy Small".
- Error (product not found): 404 style with search box and link to Shop.
- Added to cart: toast and mini-cart drawer slide-in with "View cart" and "Checkout".

**Mobile:** gallery becomes a swipeable carousel with dots; purchase panel is stacked below the gallery; **sticky bottom bar** with price and "Add to cart" (Buy Small link as text button above). Tabs become accordions. Related products horizontal scroll.

---

## 4. Cart

**Purpose:** Review items, adjust quantities, see totals, reach checkout. No account needed.

**Layout sections**
1. H1 "Your cart (3 items)", with a link "Continue shopping".
2. **Line items list (left, 7 columns):** each row: thumbnail, name, key spec, unit price (demo placeholder), quantity stepper (`minus`, `plus`), line total, remove (`trash` icon button with label "Remove"). Stock warning chip if quantity exceeds stock ("Only 2 left").
3. **Summary card (right, 5 columns, sticky):** subtotal, delivery fee (shown after state selection or "Calculated at checkout", demo placeholder), installation fee (shown if requested, demo placeholder), total (Number XL). Promo or discount field is **not** included (policy not approved). Primary "Checkout" button full width, secondary link "Pay with Buy Small" appears if every item is eligible. Trust rail underneath (demo placeholders).
4. **Buy Small suggestion strip:** "This cart qualifies for Buy Small: from ₦X/week (demo placeholder)".
5. **Recommended add-ons:** accessories cards (cables, mounts).

**Key components:** cart row, quantity stepper, summary card, alert, product card (compact).

**States**
- Empty: sun-arc illustration, "Your cart is empty", Primary "Shop products" and links to categories.
- Loading: skeleton rows and skeleton summary.
- Error: stock changed alert at top "One item is no longer available" with item highlighted and a "Remove" or "Update" action.
- Price changed: info alert "Price updated since you added this item".

**Mobile:** items become stacked cards (thumbnail left, details right); summary moves below items; **sticky bottom bar** showing total and "Checkout" Primary button.

---

## 5. Checkout (with "Do you want an installer?")

**Purpose:** Fast guest checkout collecting only necessary data, and capturing an installation request.

**Layout:** 3-step stepper at the top: 1 Details, 2 Delivery and installation, 3 Review and pay. Two columns on desktop: form (7), sticky order summary (5). Minimal header (logo, secure lock, "Back to cart") with no main nav to reduce distraction.

**Step 1: Your details:** full name, email, phone (with +234 prefix), "We'll send your order number and updates to this email". A line: "No account needed."

**Step 2: Delivery and installation:**
- Delivery address, state (select), city, delivery notes (optional textarea).
- Delivery method summary and fee (demo placeholder, pending Petfeb approval).
- **Question card: "Do you want an installer?"** Two large selectable cards, radio group:
  - **Yes, I want an installer** (`hard-hat` icon, "A Petfeb installer will contact you to schedule. Installation fee shown below. Demo terms, pending Petfeb approval.")
  - **No, I'll arrange my own** (`package` icon).
  Default unselected so the choice is deliberate; selecting Yes reveals: preferred date window (select), site type (home, shop, office, estate), notes, and updated fee in the summary with a short "Fee to be confirmed" note (pricing is pending Petfeb approval). Selected card has 2px black border and green-100 fill with a `circle-check` badge.

**Step 3: Review and pay:** read-only summary of details, delivery, installation answer, items; consent checkbox "I agree to the Terms and Refund policy" (links); Primary "Pay ₦X with Paystack" (`lock` icon); small note "Test mode: no real charges" in the prototype with an info chip. Payment opens Paystack's hosted popup; show "Redirecting to secure payment" state.

**Order summary card:** items (collapsed list with thumbnails), subtotal, delivery, installation, total, trust rail.

**Confirmation screen (`/order/confirmation/[no]`):** big `circle-check` in a green-100 circle, "Order confirmed", order number (copy button), email sent notice, next steps timeline (Processing, Delivery, Installation if selected), buttons "Track order" (Primary) and "Continue shopping" (Outline), and an installation panel if requested.

**States**
- Loading: button spinner, form disabled, "Confirming your payment" full-section state with power meter animation; never double-submit.
- Validation error: inline errors plus top summary alert listing fields; focus moves to the first error.
- Payment failed or cancelled: error alert "Payment was not completed. You have not been charged." with "Try again" Primary and "Change details" link; the cart is preserved.
- Out-of-stock at pay time: alert naming the item and a link back to the cart.
- Network or server error: alert with retry and a safe reference code.
- Empty cart: redirect to cart empty state.

**Mobile:** single column, stepper becomes "Step 2 of 3: Delivery and installation" with a power meter bar; order summary collapses into an accordion at the top ("Order summary ₦X, show details"); **sticky bottom bar** with total and the step's Primary button; installer cards stack full width.

---

## 6. Buy Small: calculator and apply flow

**Purpose:** Let anyone understand and apply for installment financing without an account. Platform owns the schedule; Paystack is only the payment rail. All policy values (eligibility, min and max, duration, fees, grace periods, ownership) are **placeholders marked "to be confirmed by Petfeb"**, shown as configurable settings.

### 6a. `/buy-small` explainer and calculator
**Layout sections**
1. **Hero** (deep green with cell texture): eyebrow "Buy Small", H1 "Power your home now. Pay in small amounts.", lead text, Primary green CTA "Calculate my plan" (#7BB042, black text; green to adhere to amber rule if header button is visible) and Outline-on-dark "How it works". Sun-arc motif.
2. **How it works:** 4 steps with icons (`search` choose product, `percent` choose deposit, `calendar-clock` choose schedule, `circle-check` pay and install).
3. **Calculator card (large, white, shadow-2):**
   - Product selector (searchable select showing eligible products only, with thumbnail) or "Enter a price".
   - Deposit selector: three big cards **30%, 40%, 50%** (selected: black border plus green-100 fill). All percentages demo placeholders, pending Petfeb approval.
   - Frequency selector: segmented control **Weekly, Biweekly, Monthly**.
   - Duration selector: select of periods (demo values, configurable).
   - **Result panel (right on desktop):** "Initial payment ₦200,000", "Remaining balance ₦300,000", "Installment ₦30,000 per month for 10 months", and a **power meter** split into deposit (amber) and balance (green) segments, plus a repayment schedule preview table (installment number, due date, amount) and total. Footnote: "Illustration only. All calculations and terms are demo placeholders, pending Petfeb approval."
   - Primary "Continue to apply" (`arrow-right`).
4. **Worked example strip:** "₦500,000 product, 40% deposit, 10 monthly payments (demo placeholder)".
5. **Eligibility and requirements:** checklist with `id-card` ("Valid ID", "Phone and email", "BVN or NIN if required, to be confirmed"), a KYC privacy note with `shield-check`.
6. **FAQ accordion:** What if I miss a payment? Can I pay early? Who owns the product? (all marked "Demo placeholder, pending Petfeb approval").
7. **CTA:** "Ready to start?" with Primary "Apply for Buy Small".

### 6b. `/buy-small/apply` (multi-step application, no account)
Stepper: 1 Plan, 2 Your details, 3 Installation preference, 4 Verification (KYC), 5 Agreement, 6 Pay deposit.
- **Plan:** shows the chosen product, deposit, frequency, schedule (editable via "Change plan"), summary card on the right.
- **Details:** only essential checkout fields: full name, email, phone (+234), delivery address, state, city. (Occupation/income band and next-of-kin are removed per streamlined requirements).
- **Installation preference ("Do you want an installer?"):** same selectable card pair as checkout:
  - **Yes, I want an installer** (`hard-hat`, installation fee added to plan, scheduling details).
  - **No, I'll arrange my own** (`package`).
- **Verification:** mock KYC in the prototype: ID type select, ID number, optional selfie upload zone (`scan-face`), explicit consent checkbox for KYC data use with link to privacy disclosure; progress states "Checking", "Verified", "Needs review". Show a "Prototype: mock verification" info chip.
- **Agreement:** scrollable agreement summary (key terms in plain language: amounts, dates, late payment rules marked "Demo placeholders, pending Petfeb approval"), checkbox "I have read and accept the Buy Small agreement", name typed as signature, download copy button.
- **Pay deposit:** Paystack test payment for the deposit; confirmation screen with agreement number, schedule table, reminders note, status chip "Active", and **"Track my plan" button pointing directly to `/track-order`** (which supports looking up both orders and Buy Small agreements by agreement number plus email or phone).

**States**
- Loading: calculator results skeleton while recalculating (debounced, never flashing zero); KYC "Checking" state with spinner.
- Empty: no eligible product chosen: result panel shows prompt "Choose a product to see your plan".
- Error: validation inline; KYC failed: "We couldn't verify your details" with "Try again" and "Contact support"; payment failed: same pattern as checkout; not eligible: calm message with alternatives (pay in full, contact us).
- Ineligible amount (below minimum or above maximum): inline warning with the allowed range (demo values).

**Mobile:** calculator inputs stack, the result panel becomes a sticky bottom summary ("₦30,000 per month, details") expanding into a bottom sheet with the schedule; stepper is "Step 2 of 6" with a power meter; schedule table becomes a vertical list; large tap targets for deposit cards; agreement scroll area has a clear "Scroll to read" indicator and sticky Accept button.

---

## 7. Training

**Purpose:** Present Petfeb Solar Training, convert visitors to applicants, and show outcomes (interns, alumni).

### 7a. `/training`
1. **Hero** (photo of trainees on a roof, deep green overlay): eyebrow "Petfeb Solar Training", H1 "Learn solar. Build a career.", lead "Hands-on training in solar installation, maintenance and system design.", Primary "Apply for training" (#7BB042, black text), Outline-on-dark "Browse programs". Stat chips: "6,000+ people trained (demo placeholder, pending Petfeb approval)", "Hands-on workshops", "International exchange".
2. **Program cards (3 to 4):** Solar Installation Fundamentals, System Design, Maintenance and Troubleshooting, Advanced (demo placeholders). Each: icon, duration, mode (in person), level chip, next intake date, seats left with a power meter, price (demo placeholder), "View program".
3. **What you'll learn:** icon grid.
4. **Training path (timeline):** Apply, Review, Enrol, Train, Optional internship, Alumni (`graduation-cap`, `award`), with a note "Certification and internship benefits are demo placeholders, pending Petfeb approval."
5. **Alumni and outcomes:** stat cards, 3 alumni quote cards, demo placeholders.
6. **Training photos gallery** with location chips.
7. **FAQ accordion** (who can apply, cost, schedule, certificate status; all demo placeholders, pending Petfeb approval).
8. **CTA band** (isolated amber band with sun-arc): "Next intake starts soon" with Dark button "Apply now".

### 7b. `/training/[slug]` program detail
Header with program name, quick facts bar (duration, schedule, location, seats, price; demo placeholders), curriculum accordion, instructor card, intake dates table, sticky **apply card** on the right with price and "Apply for this program".

### 7c. `/training/apply`
Single-page form (no account): full name, email, phone, state, program select, intake date select, experience level, education (optional), motivation textarea, "Interested in internship" checkbox, consent and training terms checkbox. Primary "Submit application". Success panel: reference number, "We'll review and contact you", email sent notice.

**States**
- Loading: skeleton program cards.
- Empty: no open intakes: "No open intakes right now. Leave your details and we'll tell you first" (collect email and phone only).
- Full program: chip "Full" and a "Join waitlist" button.
- Error: inline validation, submission failure alert with retry, rate-limit message "Too many attempts, try again in a few minutes".

**Mobile:** program cards stacked, timeline vertical, quick facts bar as 2x2 grid, gallery horizontal scroll, sticky bottom bar "Apply" with next intake date on program detail; application form one column with sticky Submit.

---

## 8. Blog

**Purpose:** Share solar knowledge, project stories and Petfeb news; support SEO.

### 8a. `/blog` listing
1. **Header** (green-50): H1 "Blog", lead "Solar tips, project highlights and stories from across Nigeria."
2. **Featured post** (large card, image left, text right): category chip, title, excerpt, author avatar and name, date, read time (`clock`), link "Read article".
3. **Category filter pills:** All, Training, Projects, Company news, Solar guides.
4. **Post grid:** 3 columns of content cards: image 16:10, category chip, H4 title, excerpt (2 lines), date and read time. Titles: "Empowering Tomorrow's Engineers: Inside Pet-Feb's Solar Training Programs", "Lighting Up Communities", "Feb Expands to Port Harcourt".
5. **Pagination** (numbered desktop, "Load more" mobile).
6. **CTA band:** "Considering solar?" with links to Shop and Buy Small.

### 8b. `/blog/[slug]` article
Breadcrumb, category chip, H1, meta row (author, date, read time, share icons: copy link `link`, WhatsApp `message-circle`), hero image (24px radius, caption), article body (max 68ch, Body L, H2 and H3 styles, pull quote with green-700 left rule, inline images with captions, lists), key takeaways box (green-50), related products strip (2 product cards), author card, **related posts** (3 cards), CTA band. Table of contents sticky on the right on desktop.

**States**
- Loading: skeleton hero and text lines.
- Empty (no posts): "No articles yet. Check back soon." with link to Projects.
- Category empty: "No posts in this category" with "View all posts".
- Error: alert with retry; 404 for unknown slug with suggested posts.
- Only **published** posts appear publicly; drafts never appear.

**Mobile:** featured post stacked image-first; grid single column; category pills horizontal scroll; article text 17px, full-bleed images within gutters, table of contents collapsed into an accordion at the top; share bar as a sticky bottom row of icon buttons.

---

## 9. Admin dashboard

**Purpose:** Daily operations overview for staff, adapted to role permissions. Light interface on `#F8F8F8`; sidebar in `#333333` with white text, active item `#7BB042` fill with black text. Demo data only.

**Chrome:** left sidebar (264px, collapsible to 72px) with groups Overview (Dashboard, Reports, Notifications), Sales (Orders, Customers, Buy Small), Operations (Installations, Installers, Inventory), Catalogue (Products, Categories), Training, Content, Team, System. Top bar: breadcrumb, search, **Notifications bell** (amber count badge if no other amber is in header, or black badge with white text), user menu (name, role chip, log out). Items hidden when the role lacks permission.

**Layout sections**
1. **Greeting row:** H1 "Good morning, Amaka" (demo name), role chip, date, quick actions: "New product", "Create task", "Add follow-up" (Primary, Outline, Outline).
2. **KPI cards (4 to 6, in a row):** Orders today, Revenue this month (₦), Active Buy Small agreements, Pending installations, Low-stock items, Training applications. Each: icon in a green-100 circle, Number XL, delta chip (trending up green or down red with icon and text), sparkline.
3. **Sales chart card (left, 8 columns):** orders and revenue over time, period toggle (7d, 30d, 12m), bars in #7BB042 with a #F5B82E line, accessible data table toggle and legend.
4. **Needs attention card (right, 4 columns):** prioritised list: "3 orders ready for dispatch" (`package-check`), "2 installments overdue" (`circle-alert`, red chip), "5 products low on stock" (`triangle-alert`), "4 installations unassigned" (`user-search`). Each links to the filtered list.
5. **Recent orders table (full width, 8 columns):** columns: Order no., Customer, Items, Amount, Payment, Status chip, Date, actions kebab. Row click opens the order.
6. **Buy Small collections card (4 columns):** due today, overdue, paid this week with a power meter and a mini-list of overdue customers.
7. **Installations schedule (6 columns):** next 7 days list with date, customer area, installer avatar, status chip.
8. **Inventory alerts (6 columns):** low-stock list with product thumb, stock level power meter (amber under threshold), "Adjust stock" button.
9. **My tasks and goals (full width, 2 columns):** tasks due with status chips; goal cards with progress meters and status chips (On Track, At Risk, Behind).
10. **Recent activity feed:** audit-style list (who did what, time) for roles with permission.

**Role variants:** Installer sees only Assigned jobs, Schedule, Notifications; Content Manager sees Content stats and draft/review queue; Inventory Manager sees stock first. The layout reflows to the permitted cards only.

**States**
- Loading: skeleton KPI cards, skeleton chart, skeleton table rows (5).
- Empty: per card friendly empty state ("No orders yet today", "No overdue installments") with `circle-check` and no action noise.
- Error: per card inline error with "Retry"; a failed card never breaks the others.
- No permission: card hidden, not shown as locked.
- Session expired: modal "Session expired, sign in again" redirecting to `/admin/login`.

**Mobile (390px):** sidebar becomes a drawer from the top bar; bottom tab bar (Dashboard, Orders, Tasks, Notifications, More) role-aware; KPI cards as a horizontally scrolling row (2 visible); chart full width with simplified legend; tables become stacked cards with status chip top right; "Needs attention" appears right after the KPIs; quick actions in a floating action button opening a bottom sheet.

---

## 10. Track Order & Buy Small Plan (`/track-order`)

**Purpose:** Unified guest lookup screen allowing customers to track either an ecommerce order or a Buy Small installment agreement without requiring an account.

**Layout sections**
1. **Header** (green-50 band): breadcrumb, H1 "Track your order or financing plan", lead "Check real-time delivery status, installation progress, or your Buy Small payment schedule. No login needed."
2. **Lookup card (white, shadow-2, max-width 640px, centered):**
   - Toggle tabs: **"Order tracking"** (default) vs **"Buy Small plan"**.
   - Input 1: Reference number (label: "Order number e.g. ORD-2026-1042" OR "Agreement number e.g. AGR-2026-8091").
   - Input 2: Email address or Phone number ("Used during checkout or application").
   - Primary action: "Track status" (#7BB042, black text, `search` icon).
   - Helper text: "Lost your reference number? Check the confirmation email or SMS sent at purchase."
3. **Result View: Order Tracking (displays below card upon successful lookup):**
   - Summary bar: Order Number, Date Placed, Total Amount (₦), Status chip (e.g. `truck` "Out for Delivery").
   - **Visual progress timeline (stepper):** Order Placed (`circle-check`), Payment Confirmed (`circle-check`), Processing (`circle-check`), Delivery (`truck`, in progress), Installation (`hard-hat`, scheduled or not requested).
   - Items list: product thumbnail, name, specs, quantity, unit price.
   - Delivery details card: recipient name, masked phone, delivery address, estimated delivery date (demo placeholder, pending Petfeb approval).
   - **Installation card (if requested):** installer status chip (e.g. `calendar-check` "Installation Scheduled"), assigned installer name/contact (or "Assigning installer"), scheduled window, site address.
   - Action: "Need help with this order? Contact support" link.
4. **Result View: Buy Small Plan (displays below card upon agreement lookup):**
   - Summary bar: Agreement Number, Product Name, Agreement Status chip (e.g. `circle-play` "Active"), Next Payment Due Date.
   - **Power meter balance bar:** Deposit paid (amber segment) vs Installments paid (green segments) vs Remaining balance (grey segments).
   - Key stats: Total Financed, Deposit Paid, Remaining Balance, Installment Amount per period.
   - **Repayment schedule table:** Installment #, Due Date, Amount, Status chip (`circle-check` "Paid", `calendar-clock` "Due", `calendar` "Upcoming"), Action button ("Pay now" for due installment via Paystack).
   - Installation details (if installation was chosen during application).
5. **Help strip:** "Questions about your order or plan? Call +234 (demo) or chat on WhatsApp".

**Key components:** lookup card, tabs, status stepper, item summary, power meter bar, repayment table, installation card.

**States**
- Initial: clean lookup form with placeholder examples.
- Loading: button spinner, skeleton result cards below form.
- Empty / Not found: alert "We couldn't find an order or agreement matching those details. Please double-check your reference number and contact info."
- Rate-limited: "Too many lookup attempts. Please wait 5 minutes before trying again."

**Mobile (390px):** lookup card full width, stepper becomes vertical timeline, repayment schedule table becomes card stack with individual "Pay now" buttons.

---

## 11. Contact Us (`/contact`)

**Purpose:** Connect prospective buyers, commercial clients, training candidates, and partners with the right Petfeb team.

**Layout sections**
1. **Header** (green-50 band): breadcrumb, H1 "Contact Petfeb", lead "Have questions about solar installation, Buy Small financing, or training? Our team is here to help."
2. **Two-column body (desktop 7/5):**
   - **Left column (Contact Form card, white, shadow-1):**
     - Form title H3 "Send us a message".
     - Name, Email, Phone (+234), State/City.
     - Subject / Inquiry type (select): "Buy solar products", "Buy Small financing inquiry", "Request site inspection / installation", "Training programs inquiry", "Corporate / Commercial solar project", "Other".
     - Message textarea.
     - Hidden honeypot field (anti-spam protection).
     - Privacy consent checkbox.
     - Primary button "Send message" (#7BB042, black text, `send` icon).
   - **Right column (Direct channels & Offices card, white, shadow-1):**
     - H3 "Get in touch directly".
     - Quick channels: Phone number (`phone`), WhatsApp chat link (`message-circle`), Email (`mail`). (Demo contact placeholders, pending Petfeb approval).
     - Operating hours: "Monday – Friday: 8:00 AM – 5:00 PM; Saturday: 9:00 AM – 2:00 PM (demo placeholder)".
     - Office location: Petfeb head office address, Port Harcourt branch, Lagos service hub (demo placeholders).
     - **Interactive map placeholder:** clean stylized map container with marker (`map-pin`), "Interactive map integration ready".
     - **Official social links:** official monochrome brand logos for LinkedIn, Facebook, Instagram and X with follower/contact links.
3. **Trust strip at bottom:** "Response time: within 24 business hours (demo placeholder, pending Petfeb approval)".

**Key components:** contact form, honeypot field, channel cards, map placeholder, social icons row.

**States**
- Submitting: button spinner, inputs disabled.
- Success: form replaced by confirmation panel with `circle-check`: "Message received! We will reply within 24 hours to [email]."
- Error (validation): inline field errors, summary alert at top.
- Error (rate-limit / server): "Too many submissions from this connection. Please reach out directly via WhatsApp or try again later."

**Mobile (390px):** single column, contact form first, direct channels & office card below, phone & WhatsApp action buttons sticky or tap-to-call.

---

## 12. Projects & Project Detail (`/projects` & `/projects/[slug]`)

**Purpose:** Proof of execution across residential, commercial, industrial, and community solar installations across Nigeria.

### 12a. `/projects` Archive
1. **Header** (green-50): breadcrumb, H1 "Our Solar Projects", lead "Explore how Petfeb is delivering clean, reliable energy across homes, businesses, and communities in Nigeria."
2. **Filter & category tabs:** All Projects, Solar Street Lighting, Commercial & Industrial, Residential Systems, Community Mini-Grids, International Partnerships.
3. **Featured Case Study (large card, image 16:9 left, specs right):**
   - Location chip: "Nigeria (demo location)".
   - Title: "How Pet-Feb Is Transforming Communities Through Solar Street Lighting".
   - Key stats row: "500+ Poles Installed", "24/7 Illumination", "Zero Carbon Emissions" (all demo placeholders, pending Petfeb approval).
   - Primary "Read case study" button.
4. **Project Grid (3 columns):**
   - Project cards: high-res photo, location chip (e.g. "Rivers State", "China"), project category, title (e.g. "Pet-Feb's Journey Across Nigeria's Clean Energy Landscape", "Building Global Capacity: Pet-Feb's China Partnership & Staff Training Program"), system capacity spec chip (e.g. `zap` "50 kWp Solar Mini-Grid [demo placeholder]"), completion year chip.
5. **Pagination:** numbered desktop, "Load more" mobile.
6. **CTA band (deep green with cell texture):** "Want to power your community or facility?" with Primary green button "Request consultation".

### 12b. `/projects/[slug]` Case Study Detail
1. **Breadcrumb:** Projects / Community Solar / Project title.
2. **Header:** category chip, H1 project title, location & completion date row, share buttons.
3. **Hero gallery:** full-width 24px-radius image with photo gallery thumbnails below.
4. **Quick Project Factsheet card (grid):** System Capacity (kWp), Battery Storage (kWh), Location, Inverters used, Beneficiaries / Homes powered (all demo placeholders, pending Petfeb approval).
5. **Content narrative (max 68ch):**
   - The Challenge (energy access problem).
   - The Solution (Petfeb engineering and system design).
   - The Impact (fuel savings, uninterrupted light, community feedback).
6. **Project gallery grid:** real installation photos with captions.
7. **Client / Community testimonial quote card (if available):** quote, name, title (demo placeholder, pending Petfeb approval).
8. **Related projects:** 3 project cards.
9. **Bottom CTA:** "Ready for a similar solar solution?" Dark button "Contact our engineers".

**States**
- Loading: skeleton grid / hero skeleton.
- Empty: "No projects found under this category."
- Error: 404 for missing project slug.

**Mobile (390px):** featured project stacked, fact grid becomes 2x2, gallery horizontal scroll, related projects carousel.

---

## 13. Installation Services (`/installation`)

**Purpose:** Explain the professional installation process, establish credibility, and provide a standalone site inspection / installation booking flow.

**Layout sections**
1. **Hero** (photo of certified installer working on roof with safety harness, deep green overlay): eyebrow "Petfeb Installation Services", H1 "Installed right. Built to last.", lead "Certified solar engineers ensuring optimal performance, warranty protection, and complete safety for your home or business (all claims demo placeholders, pending Petfeb approval).", Primary button "Book site inspection" (#7BB042, black text).
2. **Why choose certified installation:** 4 feature cards in a row (`shield-check` Full warranty validation, `hard-hat` Trained & certified technicians, `plug-zap` Safe grid & generator integration, `wrench` Lifetime maintenance support; demo placeholders, pending Petfeb approval).
3. **Step-by-step process (green-50 band):**
   - Step 1: Energy audit & site survey (`search`).
   - Step 2: Custom engineering & proposal (`sun`).
   - Step 3: Equipment delivery & staging (`truck`).
   - Step 4: Professional mounting & wiring (`hammer`).
   - Step 5: Commissioning, testing & customer handover (`badge-check`).
4. **"What's included in an installation package":** two-column comparison card: Included (mounting rails, surge protection, DC cabling, circuit breakers, earthing rod, handover training) vs Not Included (structural roof repairs, civil building works). Note: "All package inclusions are demo placeholders, pending Petfeb approval."
5. **Request Installation Form Card (white, shadow-2, max-width 800px):**
   - Form title: "Request an installation or site survey".
   - Contact: full name, phone (+234), email.
   - Location: property address, state, city, property type (residential, commercial, industrial).
   - Existing setup: "Do you already have solar equipment?" (Yes, I need installation only / No, I need equipment + installation).
   - Preferred inspection date (date picker).
   - Upload roof / site photos (optional).
   - Notes / special instructions.
   - Primary submit button "Submit installation request" (#7BB042, black text).
6. **Safety & Warranty guarantee strip:** "All installations comply with Nigerian electrical safety standards and include guaranteed workmanship (demo placeholder, pending Petfeb approval)."
7. **FAQ Accordion:** How much does installation cost? How long does it take? Do you install in my state? (all marked "Demo placeholder, pending Petfeb approval").

**Key components:** process stepper, inclusion comparison card, inspection request form, safety guarantee strip.

**States**
- Submitting: button spinner, inputs locked.
- Success: "Inspection request submitted! An installation coordinator will contact you within 24 hours to confirm your schedule."
- Error: form validation alerts.

**Mobile (390px):** process steps vertical timeline, inclusion cards stacked, request form single-column with sticky submit button.

---

## 14. About Us (`/about`)

**Purpose:** Tell the Petfeb story, highlight its mission in the Nigerian renewable transition, introduce team leadership, and reinforce credibility.

**Layout sections**
1. **Hero** (24px-radius panel, green-50 with sun-arc in corner): eyebrow "About Petfeb", H1 "Empowering Nigeria with sustainable, accessible solar energy.", lead text "Petfeb is dedicated to solving power challenges for homes, businesses, and communities through quality products, innovative financing, and hands-on technical training."
2. **Core Mission & Vision (2-column card split):**
   - Vision card (deep green #1F3A0B, white text): "A Nigeria where clean, reliable power is accessible to every home and enterprise."
   - Mission card (white, 1px border): "To deliver robust solar hardware, flexible financing through Buy Small, and workforce development to power our nation sustainably."
3. **Our Journey (Interactive Timeline):**
   - Milestones: Foundation & first installations, Expansion of product distribution, Launch of Petfeb Solar Training Institute, International partnerships & China technical exchange, Launch of Buy Small financing platform. (Dates and milestones are demo placeholders, pending Petfeb approval).
4. **Our Pillars (3 cards):**
   - **Quality Hardware:** Direct partnerships with tier-1 manufacturers.
   - **Buy Small Financing:** Making solar ownership attainable without crushing upfront cost.
   - **Human Capacity:** Training the next generation of renewable energy engineers across Nigeria.
5. **Leadership & Technical Team (placeholder grid):**
   - 4 leadership profile cards: photo, name, title (e.g. Managing Director, Chief Technical Officer, Lead Solar Engineer, Head of Training), bio summary, LinkedIn link. (Note: "Team profiles are demo placeholders, pending Petfeb approval").
6. **Partners & Collaborators:** logo carousel of solar hardware manufacturers, training partners, and commercial clients.
7. **Our Impact in Numbers (white band):** 4 stat cards with Number XL (Homes Powered, Megawatts Installed, Trainees Graduated, States Covered; all demo placeholders, pending Petfeb approval).
8. **Final CTA band (amber-50 or isolated amber band with sun-arc):** "Join our clean energy mission" with Dark button "Explore solar products" and Outline button "Partner with us".

**Key components:** mission/vision cards, milestone timeline, pillar cards, team cards (placeholders), stats row.

**States**
- Loading: skeleton image panels and timeline.
- Mobile (390px): timeline vertical with connected dots, pillar cards stacked, team cards horizontal scroll.

---

## 15. Auth screens (staff only; same chrome rules)

`/admin/login`, `/admin/accept-invite`, `/admin/reset-password`: centred 440px white card on `#F4F9EC` with the sun-arc in a corner, logo, H2, email/password inputs (password with show/hide `eye`), Primary full-width button (#7BB042, black text), link "Forgot password?". Accept-invite: shows invited name and role chip, set password with a strength meter (power meter bar) and rules list. States: invalid or expired link (alert with "Request a new invite"), rate limited, wrong credentials (generic message, no account enumeration), success then redirect.
