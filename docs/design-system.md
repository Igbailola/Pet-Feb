# Petfeb Design System (Phase 1)

Reference: PETFEB MASTER PRD, README.md, Phase 0 audit.
Status: design specification only. No application code. Prototype uses demo data for prices, stock, customers, orders and training.

---

## 1. Design direction and tone

**Concept: "Power you can trust."** Petfeb is a Nigerian solar company that sells, finances, installs and teaches. The interface should feel like a credible energy utility that is also friendly and affordable, not a generic ecommerce template.

**Tone of voice:** plain, confident, practical. Talk in kilowatts, hours of backup and naira per month, not in marketing adjectives. Use Nigerian context (generators, NEPA/grid outages, fuel cost, estates, shops, schools).

**Signature visual language (what makes it solar, not generic)**

| Device | Description | Where used |
|---|---|---|
| **Sun-arc motif** | A quarter or half circle in Secondary amber with thin concentric rays in Primary green, used as a cropped background shape at section corners. | Hero, section headers, empty states |
| **Energy spec strip** | A monospace-free, tabular row of key numbers (kW, kWh, warranty, backup hours) using Space Grotesk tabular figures, separated by hairlines. | Product cards, product page, hero stats |
| **Power meter bar** | A segmented horizontal bar (10 segments) that fills in green. Shows deposit vs balance in Buy Small, stock level, training seats, goal progress. | Buy Small, stock, goals |
| **Cell-grid texture** | A very faint 24px grid (solar panel cell pattern) at 4 percent opacity on deep green or grey bands. | Footer, trust bands, CTA bands |
| **Real-world proof first** | Photography of installations, installers at work, trainees. Rounded 16px corners, a small "Location, year" caption chip. | Home, Projects, Training |
| **Trust rail** | Persistent small row: Warranty, Installation by certified team, Paystack secure payment, Support line. Warranty, installer certification and support claims are **demo placeholders, pending Petfeb approval**. | Header strip, product page, checkout |
| **Amber used sparingly** | Amber (Secondary) is the "energy spark": one highlight per view (primary action in a promo band, a key badge, an active step). Green is the main brand surface. | Everywhere |

**Layout feel:** generous whitespace on white, with alternating bands: white, soft green tint, deep green (dark band) for emphasis. Large rounded image panels (24px), crisp 1px borders, soft shadows. Avoid centered-everything; use left-aligned editorial headings with an eyebrow label.

**Trust and policy claims rule:** every trust or policy claim (free site assessment, certified installers, warranty length, installment amounts, delivery, installation terms) is a **demo placeholder, pending Petfeb approval**. Claims are stored as editable content or settings (CMS content or configurable settings), never hard-coded in components. Any example text in this document (trust strip, trust rail, product card examples, Buy Small line) is a demo placeholder, pending Petfeb approval.

**Amber rule:** only one amber element per viewport region. The default amber element on public pages is the header "Request installation" button. Buy Small uses amber only where no other amber element is visible in the same region; otherwise it uses Primary green (black text) or black. The cart count badge is black fill with white text.

**Photography and illustration:** real project photos preferred. Where none exist, use line illustrations built from Lucide-style geometry (no other icon or illustration library). Never use stock imagery of unrelated landscapes.

**Do not:** use gradients of purple/blue, glassmorphism on forms, drop shadows heavier than the scale below, more than one amber element per viewport region, or white text on Primary or Secondary.

---

## 2. Colour tokens

### 2.1 Official brand tokens (use exactly)

| Token | Hex | Role |
|---|---|---|
| `brand-primary` | `#7BB042` | Primary brand green: buttons, fills, active indicators, chart primary |
| `brand-secondary` | `#F5B82E` | Solar amber: highlight buttons, badges, spark accents |
| `brand-white` | `#FFFFFF` | Page and card background, text on dark surfaces |
| `brand-grey` | `#333333` | Body text, dark surfaces, secondary borders on dark |
| `brand-black` | `#000000` | Text on Primary and Secondary, maximum emphasis |

The old audit colours (`#70a03c`, `#446124`, `#f2f7ec`) are **not used** anywhere.

### 2.2 Derived colours (every one listed, with reason)

| Token | Hex | Derived from | Why it exists |
|---|---|---|---|
| `green-900` | `#1F3A0B` | Primary, darkened | Deep trust band background and footer; white text passes at 12.59:1 |
| `green-800` | `#2F5212` | Primary, darkened | Dark text on green tint chips (7.82:1 on green-100); hover on dark bands |
| `green-700` | `#3F6B1A` | Primary, darkened | **Text-on-white green**: links, eyebrow labels, icons on white (6.31:1). Also focus-safe accent |
| `green-600` | `#4F8221` | Primary, darkened | Pressed state for primary buttons (black text still 4.55:1) |
| `green-500` | `#6A9E36` | Primary, slightly darkened | Hover state for primary buttons (black text 6.56:1) |
| `green-300` | `#B4D88A` | Primary, lightened | Decorative rays, progress track on dark bands, chart secondary series |
| `green-200` | `#D2E8B5` | Primary, lightened | Borders around tinted green panels, selected-card border |
| `green-100` | `#E8F3DA` | Primary, lightened | Success chip background, selected states, tinted section band |
| `green-50` | `#F4F9EC` | Primary, lightened | Soft section background, table row hover (replaces old `#f2f7ec`) |
| `amber-700` | `#8A5A00` | Secondary, darkened | **Text-on-white amber**: warning text and icons (5.93:1) |
| `amber-600` | `#B27800` | Secondary, darkened | Non-text amber graphics on white (3.76:1, usable for icons/large UI only) |
| `amber-hover` | `#E6A71A` | Secondary, darkened | Hover for secondary buttons (black text 9.91:1) |
| `amber-pressed` | `#C98F0E` | Secondary, darkened | Pressed for secondary buttons (black text 7.42:1) |
| `amber-200` | `#FBE29A` | Secondary, lightened | Highlight underline marker behind key words |
| `amber-100` | `#FDF0CC` | Secondary, lightened | Warning chip background |
| `amber-50` | `#FEF8E7` | Secondary, lightened | Promo band and notice background |
| `grey-600` | `#5C5C5C` | Grey, lightened | Secondary body text and captions on white (6.69:1) |
| `grey-500` | `#767676` | Grey, lightened | Placeholder text and tertiary text on white only (4.54:1) |
| `grey-400` | `#8A8A8A` | Grey, lightened | **Input and control borders** (3.45:1 on white, meets 3:1 non-text rule) |
| `grey-200` | `#D9D9D9` | Grey, lightened | Decorative dividers and card borders (not for essential control edges) |
| `grey-100` | `#F2F2F2` | Grey, lightened | Disabled backgrounds, neutral chips, skeleton base |
| `grey-50` | `#F8F8F8` | Grey, lightened | Admin page background, zebra rows |
| `error-600` | `#B3261E` | Functional (not brand) | Errors and destructive actions. Brand set has no red; needed for form errors |
| `error-100` | `#FCE8E6` | Functional | Error chip and alert background |
| `info-600` | `#1F5FA8` | Functional (not brand) | Informational chips ("Scheduled", "Processing") so status is not only green and amber |
| `info-100` | `#E6F0FA` | Functional | Info chip and alert background |

Functional colours (error, info) are the only non-brand hues. They are restricted to status, validation and alerts; never used for decoration or buttons other than destructive.

### 2.3 Semantic roles

| Role | Light surface | Dark surface |
|---|---|---|
| Page background | `#FFFFFF`; alt band `green-50`; admin `grey-50` | `green-900` or `#333333` |
| Heading text | `#000000` | `#FFFFFF` |
| Body text | `#333333` | `#FFFFFF` |
| Secondary text | `grey-600` | `#FFFFFF` at full strength (do not dim below AA) |
| Link / eyebrow | `green-700` | `brand-secondary` (7.06:1 on green-900) |
| Primary button | bg `#7BB042`, text `#000000` | same |
| Secondary button | bg `#F5B82E`, text `#000000` | same |
| Focus ring | 2px `#000000` with 2px white offset | 2px `#F5B82E` with 2px offset |
| Border (control) | `grey-400` | `#FFFFFF` at 60 percent is not allowed; use `green-300` |
| Border (decorative) | `grey-200` | `rgba(255,255,255,0.2)` |

### 2.4 Contrast checks (WCAG 2.1, computed)

AA needs 4.5:1 for normal text, 3:1 for large text (18pt or 14pt bold) and non-text UI.

**Brand pairings**

| Foreground | Background | Ratio | Result | Rule |
|---|---|---|---|---|
| `#000000` | `#7BB042` | **8.13** | AA, AAA | Use for text on Primary |
| `#333333` | `#7BB042` | **4.89** | AA | Allowed, black preferred |
| `#FFFFFF` | `#7BB042` | **2.58** | FAIL | Never |
| `#000000` | `#F5B82E` | **11.78** | AA, AAA | Use for text on Secondary |
| `#333333` | `#F5B82E` | **7.09** | AA, AAA | Allowed |
| `#FFFFFF` | `#F5B82E` | **1.78** | FAIL | Never |
| `#7BB042` | `#FFFFFF` | **2.58** | FAIL as text | Decoration and fills only, never green text on white |
| `#F5B82E` | `#FFFFFF` | **1.78** | FAIL as text | Never as text or icon on white |
| `#333333` | `#FFFFFF` | **12.63** | AA, AAA | Body text |
| `#000000` | `#FFFFFF` | **21.00** | AA, AAA | Headings |
| `#FFFFFF` | `#333333` | **12.63** | AA, AAA | Text on dark grey |
| `#7BB042` | `#333333` | **4.89** | AA | Green accents on dark grey |
| `#F5B82E` | `#333333` | **7.09** | AA, AAA | Amber accents on dark grey |
| `#7BB042` | `#000000` | **8.13** | AA, AAA | Green on black |
| `#F5B82E` | `#000000` | **11.78** | AA, AAA | Amber on black |

**Derived pairings**

| Foreground | Background | Ratio | Result | Use |
|---|---|---|---|---|
| `green-700 #3F6B1A` | `#FFFFFF` | **6.31** | AA | Green text and links on white |
| `green-700` | `green-50` | **5.89** | AA | Links on tinted band |
| `green-700` | `green-100` | **5.49** | AA | Text in selected state |
| `green-800 #2F5212` | `green-100` | **7.82** | AA, AAA | Success chip |
| `green-900 #1F3A0B` | `green-100` | **10.95** | AA, AAA | Strong text on tint |
| `green-800` | `#FFFFFF` | **8.99** | AA, AAA | Headings in green |
| `#FFFFFF` | `green-900` | **12.59** | AA, AAA | Footer, dark band |
| `#FFFFFF` | `green-800` | **8.99** | AA, AAA | Dark band alt |
| `#FFFFFF` | `green-700` | **6.31** | AA | Allowed for dark-green buttons (tertiary "dark" button) |
| `#7BB042` | `green-900` | **4.87** | AA | Accent text on deep band |
| `#F5B82E` | `green-900` | **7.06** | AA, AAA | Amber text and links on deep band |
| `#000000` | `green-500 #6A9E36` | **6.56** | AA | Primary hover |
| `#000000` | `green-600 #4F8221` | **4.55** | AA | Primary pressed |
| `#000000` | `amber-hover #E6A71A` | **9.91** | AA, AAA | Secondary hover |
| `#000000` | `amber-pressed #C98F0E` | **7.42** | AA, AAA | Secondary pressed |
| `amber-700 #8A5A00` | `#FFFFFF` | **5.93** | AA | Warning text on white |
| `amber-700` | `amber-100` | **5.22** | AA | Warning chip |
| `amber-700` | `amber-50` | **5.59** | AA | Promo band text |
| `#333333` | `amber-100` | **11.14** | AA, AAA | Notice text |
| `grey-600 #5C5C5C` | `#FFFFFF` | **6.69** | AA | Secondary text |
| `grey-600` | `grey-100` | **5.97** | AA | Secondary text on chips |
| `grey-600` | `grey-50` | **6.30** | AA | Secondary text on admin bg |
| `grey-500 #767676` | `#FFFFFF` | **4.54** | AA (just) | Placeholder and tertiary only |
| `grey-500` | `grey-100` | **4.06** | FAIL for text | Do not put grey-500 text on grey-100 |
| `grey-400 #8A8A8A` | `#FFFFFF` | **3.45** | AA non-text | Input borders |
| `grey-200 #D9D9D9` | `#FFFFFF` | **1.41** | n/a | Decorative dividers only |
| `#333333` | `grey-100` | **11.29** | AA, AAA | Neutral chip |
| `#333333` | `green-50` | **11.80** | AA, AAA | Body on tinted band |
| `error-600 #B3261E` | `#FFFFFF` | **6.54** | AA | Error text |
| `error-600` | `error-100` | **5.55** | AA | Error chip |
| `#FFFFFF` | `error-600` | **6.54** | AA | Destructive button |
| `info-600 #1F5FA8` | `info-100` | **5.58** | AA | Info chip |
| `#FFFFFF` | `info-600` | **6.44** | AA | Info alert filled |
| `green-700` | `#333333` | **2.00** | FAIL | Never put green-700 on dark grey |
| Focus ring `#000000` | `#7BB042` | **8.13** | AA non-text | Ring on primary buttons |
| Focus ring `green-700` | `#7BB042` | **2.44** | FAIL | So the ring is black, not green |

**Rules that follow from the numbers**
1. Text or icon on Primary or Secondary fill: black (or `#333333` at 14px bold and larger). Never white.
2. Green text or link on white: `green-700` or darker, never `#7BB042`.
3. Amber text on white: `amber-700` only. Amber icons on white are decorative at most; pair with a label.
4. On `green-900` or `#333333` dark bands, accents may be `#7BB042` or `#F5B82E`; body text is white.
5. Status is never conveyed by colour alone: every chip has an icon and a text label.


## 3. Typography

Only two families: **Space Grotesk** (headings, numbers, buttons, nav) and **Roboto** (body, forms, tables, captions). No other fonts, including no monospace; use Space Grotesk tabular figures for numeric alignment.

### 3.1 Weights
- Space Grotesk: 500 (labels, nav), 600 (subheads, buttons), 700 (headings, big numbers).
- Roboto: 400 (body), 500 (emphasis, table headers), 700 (strong, rare).

### 3.2 Scale (mobile / desktop)

| Style | Family | Weight | Size mobile | Size desktop | Line height | Letter spacing | Use |
|---|---|---|---|---|---|---|---|
| Display | Space Grotesk | 700 | 40px | 72px | 1.05 | -0.02em | Home hero only |
| H1 | Space Grotesk | 700 | 32px | 48px | 1.1 | -0.015em | Page title (one per page) |
| H2 | Space Grotesk | 700 | 26px | 36px | 1.15 | -0.01em | Section title |
| H3 | Space Grotesk | 600 | 21px | 26px | 1.25 | -0.005em | Card group, subsection |
| H4 | Space Grotesk | 600 | 18px | 20px | 1.3 | 0 | Card title, product name |
| Eyebrow | Space Grotesk | 600 | 13px | 14px | 1.2 | 0.08em, uppercase | Label above headings, in `green-700` |
| Body L | Roboto | 400 | 17px | 19px | 1.6 | 0 | Hero and lead paragraphs |
| Body | Roboto | 400 | 16px | 16px | 1.6 | 0 | Default text |
| Body S | Roboto | 400 | 14px | 14px | 1.5 | 0 | Captions, meta, table cells |
| Label | Roboto | 500 | 14px | 14px | 1.3 | 0 | Form labels, table headers |
| Caption | Roboto | 400 | 12px | 12px | 1.4 | 0.01em | Legal, image captions (minimum size) |
| Button | Space Grotesk | 600 | 16px | 16px | 1 | 0.005em | Buttons |
| Number XL | Space Grotesk | 700 | 36px | 56px | 1 | -0.02em | Stats, price on product page |
| Price | Space Grotesk | 700 | 20px | 24px | 1 | 0 | Product card price (tabular) |

Rules:
- Body text never below 16px on mobile except Body S and Caption (non-essential).
- Max line length 68 characters for articles (`max-width: 68ch`), 56ch for lead text.
- Prices always `₦` with thousands separators (`₦500,000`), Space Grotesk, tabular figures.
- Headings use sentence case. Eyebrows are the only uppercase text.
- Loading: both fonts self-hosted or via the framework font loader with `display: swap`, only weights listed above, Latin subset.


## 4. Spacing, radius and shadow

### 4.1 Spacing (4px base)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

| Context | Mobile | Desktop |
|---|---|---|
| Page gutter | 16px | 32px (max content width 1200px; wide 1360px for shop grid and admin) |
| Section vertical padding | 48px | 96px |
| Card padding | 16px | 24px |
| Stack gap (related items) | 8 to 12px | 12 to 16px |
| Grid gap | 16px | 24px |
| Form field gap | 16px | 20px |

### 4.2 Radius
| Token | Value | Use |
|---|---|---|
| `r-sm` | 6px | Chips, small badges, table inner controls |
| `r-md` | 10px | Inputs, buttons |
| `r-lg` | 16px | Cards, product cards, alerts |
| `r-xl` | 24px | Hero image panels, feature bands |
| `r-full` | 999px | Pill filters, status chips, avatars |

### 4.3 Shadow
Soft, low-opacity, green-grey tinted (rgba of `green-900`), never black-heavy.

| Token | Value | Use |
|---|---|---|
| `shadow-0` | none | Flat cards with 1px border |
| `shadow-1` | `0 1px 2px rgba(31,58,11,0.08)` | Cards at rest |
| `shadow-2` | `0 6px 16px rgba(31,58,11,0.10)` | Card hover, dropdowns, sticky header on scroll |
| `shadow-3` | `0 16px 40px rgba(31,58,11,0.16)` | Modals, drawers, mini-cart |

Borders: 1px `grey-200` for decorative card edges; `grey-400` for form controls.

### 4.4 Motion
150 to 200ms ease-out for hover and focus; 250ms for drawers and accordions. Subtle only: card lift of 2px, sun-arc slow drift (20s) in hero. Respect `prefers-reduced-motion`: disable drift and lift.

---

## 5. Core components

Minimum touch target 44x44px. Every interactive element has hover, focus-visible, active, disabled states. Focus-visible ring: 2px black with 2px white offset (amber on dark surfaces).

### 5.1 Buttons
| Variant | Fill | Text | Border | Hover | Pressed | Use |
|---|---|---|---|---|---|---|
| Primary | `#7BB042` | `#000000` | none | `green-500` | `green-600` | Main action: Add to cart, Pay, Continue |
| Secondary (amber) | `#F5B82E` | `#000000` | none | `amber-hover` | `amber-pressed` | Highlight action: Request installation (public header); Buy Small only where no other amber element is visible in the same region (one per viewport region) |
| Outline | transparent | `#000000` | 1.5px `#333333` | bg `green-50` | bg `green-100` | Tertiary: View details, Back |
| Dark | `green-900` | `#FFFFFF` | none | `green-800` | `#000000` | On light bands for strong contrast CTAs |
| Ghost / link | transparent | `green-700` underlined | none | `green-800` | n/a | Inline actions |
| Destructive | `error-600` | `#FFFFFF` | none | darker 8 percent | darker 14 percent | Cancel order, archive |

Sizes: `sm` 36px high (admin tables), `md` 44px, `lg` 52px. Padding 20/28px horizontal. Radius `r-md`. Icon 20px with 8px gap, leading or trailing (trailing arrow for navigation CTAs). Loading state: spinner (Lucide `loader-circle`, rotating) replaces the icon, label stays, button disabled. Disabled: `grey-100` fill, `grey-600` text, no shadow.

### 5.2 Inputs
- Height 48px (admin dense 40px). Radius `r-md`. 1px `grey-400` border, white fill, text `#333333`, placeholder `grey-500`.
- Label above (Label style), required marked with text "(required)" not just an asterisk. Helper text below in `grey-600` Body S.
- Focus: border 2px `#000000`. Error: border 2px `error-600`, icon `circle-alert`, message in `error-600` below, linked by `aria-describedby`. Success is silent except where reassurance is needed.
- Disabled: `grey-100` fill. Select uses native-style chevron (`chevron-down`). Phone input prefixed with `+234` selector. Quantity stepper: `minus` and `plus` buttons 44px wide.
- Checkbox, radio: 24px box, `grey-400` border; checked fill `#7BB042` with black check (`check` icon, 3:1 against fill is satisfied at 8.13:1).
- Toggle: on-state track `#7BB042` with a black knob; off-state track `grey-400` with a white knob (with 1px black-opacity outline).

### 5.3 Cards
- Base: white, 1px `grey-200`, `r-lg`, `shadow-1`, hover `shadow-2` and 2px lift when the whole card is a link.
- Variants: **Content card** (image 16:10, eyebrow, H4, body S, link), **Stat card** (Number XL, label, sun-arc corner), **Feature card** (icon in a 48px `green-100` circle with `green-800` icon, H4, text), **Dark band card** (on `green-900`, border `rgba(255,255,255,0.2)`, white text).
- Selected card (e.g. deposit option): 2px `#000000` border plus `green-100` fill and a `circle-check` badge.

### 5.4 Product card
Layout (vertical):
1. Image 1:1, `green-50` background, product centered, `r-lg` top. Top-left badge stack; top-right wishlist is **not** used (no accounts).
2. Category eyebrow (`green-700`, 13px).
3. Name, H4, max 2 lines.
4. **Energy spec strip**: 2 to 3 key specs as icon plus value (for example `zap` 5 kVA, `battery-charging` 200Ah, `shield-check` 5-year warranty, demo placeholder, pending Petfeb approval), Body S, `grey-600`. Spec and warranty values come from editable product data.
5. Price (Price style) plus optional strikethrough in `grey-600`.
6. Buy Small line when eligible: `calendar-clock` icon plus "From ₦X/week with Buy Small" in `green-700` Body S 500 weight. The amount and terms are a demo placeholder, pending Petfeb approval, and are calculated from editable Buy Small settings, never hard-coded.
7. Actions: full-width Primary "Add to cart"; if out of stock, Outline "Notify me" is **not** offered (no accounts); show disabled button "Out of stock".

Badges allowed: "Buy Small" (amber fill, black text, only when no other amber element is in the card; otherwise Primary green with black text), "Low stock" (amber-100/amber-700), "New" (green-100/green-800), "Installation available" (info). Max 2 visible.

States: loading (skeleton image, three skeleton lines), out of stock (image 60 percent opacity is **not** used because it harms contrast; instead a grey-100 "Out of stock" chip on the image), hover lift.

### 5.5 Badges
Pill, `r-full`, 24px high, 12px horizontal padding, Roboto 500 12px uppercase-free, icon 14px optional.

| Badge | Fill | Text |
|---|---|---|
| Buy Small | `#F5B82E` (amber rule applies; else `#7BB042`) | `#000000` |
| Featured | `#7BB042` | `#000000` |
| New | `green-100` | `green-800` |
| Low stock | `amber-100` | `amber-700` |
| Installation | `info-100` | `info-600` |
| Neutral | `grey-100` | `#333333` |

### 5.6 Tables (admin and order tables)
- Container white, 1px `grey-200`, `r-lg`, header row `grey-50`, header text Label style in `#333333`, sticky header on scroll.
- Row height 56px comfortable, 44px dense. Zebra off by default; hover `green-50`. Selected row `green-100` with a 3px `#7BB042` left border (decorative; selection is also shown by the checked checkbox).
- Toolbar above: search input, filter pills, bulk actions, density toggle, export (`download`).
- Numeric columns right-aligned, tabular figures. Status column uses status chips (5.9). Row actions in a kebab menu (`ellipsis`).
- Pagination: rows per page, `chevron-left`, `chevron-right`, current page range.
- States: loading skeleton rows (5), empty (illustration plus message plus primary action), error (alert with "Try again").
- **Mobile:** tables become stacked cards: first column as title, up to 3 key fields, status chip top-right, tap opens detail. Horizontal scrolling tables are not allowed for primary lists.

### 5.7 Navigation components
**Public header (desktop)**: sticky, white, 72px, `shadow-2` after scroll. Left: logo. Centre: nav (Shop, Buy Small, Projects, Training, Blog, About, Contact), active item has a 3px `#7BB042` underline and `#000000` text. Right: search icon button, cart icon with count badge (black fill, white text), amber "Request installation" button `sm`.
Above it, a **trust strip** (36px, `green-900`, white 13px text, dismissible on mobile): "Free site assessment · Certified installers · Pay in installments with Buy Small". These claims are demo placeholders, pending Petfeb approval, and are editable site content, never hard-coded.
**Mobile header**: 64px: hamburger (`menu`), logo centred, cart icon. Menu is a full-height drawer from the left with large 56px rows, search field at top, a pinned Buy Small row (amber only if no other amber element is visible in the drawer, otherwise green) and a footer with phone and WhatsApp (`phone`, `message-circle`).
**Breadcrumbs** on shop, product, blog posts, projects: Body S, `green-700` links, `chevron-right` separators.
**Tabs / segmented control**: pill track `grey-100`, active `#FFFFFF` with `shadow-1` and black text.
**Pagination**: numbered on desktop, "Load more" on mobile shop and blog.

### 5.8 Footer
`green-900` background with cell-grid texture at 4 percent, white text, `#F5B82E` link hover underline. Columns: Brand blurb plus socials (official brand logos for LinkedIn, Facebook, Instagram and X; see the icon exception in section 6), Shop (categories), Company (About, Projects, Blog, Contact), Support (FAQ, Track order, Installation, Buy Small), Legal (Terms, Privacy, Buy Small terms, Refunds, Installation terms, Training terms). Top of footer: newsletter-free CTA band (amber background, black text) "Not sure what size system you need?" with a Dark button (Primary green on amber is avoided for poor separation). Bottom bar: copyright, Paystack secure payment note (`lock`), address and phone from demo data.
Mobile: columns collapse into accordions, contact block and socials stay visible.

### 5.9 Forms
- Single column on mobile, two columns on desktop only for short pairs (first/last name, state/city).
- Group with H4 fieldset legends. Progress indicator for multi-step: "Step 2 of 4" plus a power meter bar.
- Validation: on blur and on submit; summary alert at top on submit listing errors with anchor links (`circle-alert`). Never clear user input on error.
- Submit button full width on mobile. Show server error (rate limit, network) in an alert above the button with a retry.
- Success: confirmation panel with `circle-check`, reference number and next steps.
- Required consents (Buy Small agreement, KYC disclosure, training terms): checkbox with link text; the button stays disabled until ticked, with the reason stated in helper text.
- No CAPTCHA UI defined here; use honeypot plus rate limiting server-side.

### 5.10 Status chips
Pill, 28px high, icon 14px plus label, Roboto 500 13px. Always icon plus text.

| Group | Status | Fill | Text | Icon (Lucide) |
|---|---|---|---|---|
| Order | Pending | `grey-100` | `#333333` | `clock` |
| Order | Payment Processing | `info-100` | `info-600` | `loader` |
| Order | Paid | `green-100` | `green-800` | `circle-check` |
| Order | Processing | `info-100` | `info-600` | `package` |
| Order | Ready for Delivery | `info-100` | `info-600` | `package-check` |
| Order | Out for Delivery | `info-100` | `info-600` | `truck` |
| Order | Delivered | `green-100` | `green-800` | `circle-check-big` |
| Order | Installation Pending | `amber-100` | `amber-700` | `wrench` |
| Order | Installation Scheduled | `info-100` | `info-600` | `calendar-check` |
| Order | Installation Completed | `green-100` | `green-800` | `badge-check` |
| Order | Cancelled | `grey-100` | `#333333` | `circle-x` |
| Order | Refunded | `grey-100` | `#333333` | `undo-2` |
| Installation | Requested | `amber-100` | `amber-700` | `inbox` |
| Installation | Pending Assignment | `amber-100` | `amber-700` | `user-search` |
| Installation | Assigned | `info-100` | `info-600` | `user-check` |
| Installation | Scheduled | `info-100` | `info-600` | `calendar-check` |
| Installation | In Progress | `info-100` | `info-600` | `hammer` |
| Installation | Completed | `green-100` | `green-800` | `badge-check` |
| Installation | Cancelled | `grey-100` | `#333333` | `circle-x` |
| Task | To Do | `grey-100` | `#333333` | `circle` |
| Task | In Progress | `info-100` | `info-600` | `loader` |
| Task | Blocked | `error-100` | `error-600` | `octagon-alert` |
| Task | Completed | `green-100` | `green-800` | `circle-check` |
| Task | Cancelled | `grey-100` | `#333333` | `circle-x` |
| Goal | Not Started | `grey-100` | `#333333` | `circle-dashed` |
| Goal | On Track | `green-100` | `green-800` | `trending-up` |
| Goal | At Risk | `amber-100` | `amber-700` | `triangle-alert` |
| Goal | Behind | `error-100` | `error-600` | `trending-down` |
| Goal | Completed | `green-100` | `green-800` | `target` |
| Goal | Cancelled | `grey-100` | `#333333` | `circle-x` |
| Buy Small agreement | Pending KYC | `amber-100` | `amber-700` | `shield-question-mark` |
| Buy Small agreement | Active | `green-100` | `green-800` | `circle-play` |
| Buy Small agreement | Grace period | `amber-100` | `amber-700` | `hourglass` |
| Buy Small agreement | Failed payment | `error-100` | `error-600` | `circle-alert` |
| Buy Small agreement | Completed | `green-100` | `green-800` | `badge-check` |
| Buy Small agreement | Cancelled | `grey-100` | `#333333` | `circle-x` |
| Installment | Upcoming | `grey-100` | `#333333` | `calendar` |
| Installment | Due | `amber-100` | `amber-700` | `calendar-clock` |
| Installment | Paid | `green-100` | `green-800` | `circle-check` |
| Installment | Overdue | `error-100` | `error-600` | `circle-alert` |
| Blog | Draft | `grey-100` | `#333333` | `file-pen` |
| Blog | Review | `info-100` | `info-600` | `eye` |
| Blog | Approved | `green-100` | `green-800` | `thumbs-up` |
| Blog | Published | `green-100` | `green-800` | `globe` |
| Blog | Archived | `grey-100` | `#333333` | `archive` |
| Training application | Interested / Applied / Reviewing / Interview | grey / info / info / amber | per chip table | `user-plus`, `send`, `search`, `message-square` |
| Training application | Accepted / Rejected / Completed | green / error / green | per chip table | `user-check`, `user-x`, `graduation-cap` |

Buy Small statuses and installment statuses are suggestions to be confirmed with Petfeb (the PRD says status names and policies need approval); they are configurable labels, not fixed policy.

### 5.11 Other shared components
- **Alerts**: left 4px bar plus icon plus text. Success (`green-100`, `green-800`, `circle-check`), Warning (`amber-100`, `amber-700`, `triangle-alert`), Error (`error-100`, `error-600`, `circle-alert`), Info (`info-100`, `info-600`, `info`).
- **Toasts**: bottom-centre mobile, top-right desktop, `#333333` fill, white text, 5s, with `x` close, announced via `aria-live="polite"`.
- **Modal / drawer**: `shadow-3`, `r-xl` on desktop, full-screen sheet on mobile, focus trapped, `x` close, Esc closes.
- **Stepper** (checkout, Buy Small apply): numbered circles 32px, current filled `#7BB042` with black number, complete uses `check`, upcoming outlined `grey-400`. Labels visible at 600px and above; on mobile show "Step X of Y: Name" with a power meter bar.
- **Power meter bar**: 10 segments, filled `#7BB042`, empty `grey-100`, segment gap 4px, height 10px, with numeric label next to it.
- **Skeletons**: `grey-100` blocks with a 1.4s shimmer to `grey-50`; reduced motion shows static.
- **Empty states**: sun-arc line illustration (Lucide-style geometry), H3, one-line help, primary action.

---

## 6. Icon usage rules (Lucide, `lucide-react`)

- Only Lucide. No emoji as icons, no other icon sets, no custom SVG icons that mimic Lucide.
- **Single exception:** official brand logos for LinkedIn, Facebook, Instagram and X, used in the footer and the contact page only. Use the official logo artwork, monochrome (white on dark footer, `#333333` on white), 24px, with an `aria-label` naming the network. No other brand logos anywhere.
- **Verify every icon name** against the installed `lucide-react` version before use. Names below were checked against `lucide-react` 1.51.0; re-check when the version changes.
- Stroke width: **1.75** default (2 for 16px and below, 1.5 for 32px and above). Round caps and joins (Lucide default).
- Sizes: 16px inline in Body S and chips, 20px in buttons and inputs, 24px nav and card icons, 32px feature icons in tinted circles, 48px empty states.
- Colour: inherit text colour. On white use `#333333` or `green-700`; never `#7BB042` or `#F5B82E` alone on white. On Primary or Secondary fill use black. Icon-only buttons need `aria-label` and a 44px target.
- Decorative icons `aria-hidden="true"`; meaningful icons carry text.
- Do not mix filled and outline; Lucide is outline only.

**Concept to icon map**

| Concept | Icon |
|---|---|
| Solar panel / generation | `sun`, `sun-medium` |
| Power / inverter | `zap`, `plug-zap` |
| Battery | `battery-charging`, `battery-full`, `battery-low` |
| Solar system / home | `house`, `building-complex`, `factory` |
| Street light | `lightbulb` (`lamp-street` does not exist in lucide-react 1.51.0) |
| Warranty | `shield-check` |
| Installation / installer | `wrench`, `hard-hat`, `hammer` |
| Delivery | `truck`, `package`, `map-pin` |
| Cart | `shopping-cart`, `plus`, `minus`, `trash` |
| Payment | `credit-card`, `lock`, `landmark`, `receipt` |
| Buy Small / installments | `calendar-clock`, `wallet`, `percent`, `hand-coins` |
| KYC / verification | `scan-face`, `id-card`, `shield-check` |
| Training / alumni | `graduation-cap`, `book-open`, `users`, `award` |
| Blog / projects | `newspaper`, `images`, `quote` (testimonials), `star` |
| Contact | `phone`, `mail`, `message-circle`, `map-pin` |
| Search / filter / sort | `search`, `sliders-horizontal`, `arrow-up-down` |
| Navigation | `menu`, `x`, `chevron-down`, `chevron-right`, `arrow-right`, `arrow-left` |
| Feedback | `circle-check`, `circle-alert`, `triangle-alert`, `info`, `loader-circle` |
| Admin | `layout-dashboard`, `shopping-bag`, `users`, `boxes`, `warehouse`, `clipboard-list`, `file-chart-column-increasing`, `bell`, `settings`, `scroll-text` (audit), `key-round`, `log-out`, `user-cog`, `target` (goals), `list-checks` (tasks) |
| Download / export | `download`, `file-down` |

If an icon name above is missing in the installed Lucide version, pick the nearest Lucide equivalent and note it in the component file.

**Icon names renamed or missing (checked against `lucide-react` 1.51.0)**

| Name used earlier | Status | Use instead |
|---|---|---|
| `loader-2` | Renamed (alias) | `loader-circle` |
| `check-circle-2` | Renamed (alias) | `circle-check` |
| `building-2` | Renamed (alias) | `building-complex` |
| `trash-2` | Renamed (alias) | `trash` |
| `file-bar-chart` | Renamed (alias) | `file-chart-column-increasing` |
| `shield-question` | Renamed (alias) | `shield-question-mark` |
| `lamp-street` | Missing | `lightbulb` |
| `linkedin`, `facebook`, `instagram`, `twitter` | Missing (brand icons are not in Lucide) | Official brand logos, footer and contact page only |

All other icon names in this document exist in 1.51.0.

---

## 7. Navigation

### 7.1 Public (desktop and mobile share the same list)
Primary: **Shop**, **Buy Small**, **Projects**, **Training**, **Blog**, **About**, **Contact**.
Utility: search, cart (count badge), **Request installation** (amber button), Track order (in footer and in the mobile drawer).
Shop mega-menu (desktop hover and click): categories (Panels, Inverters, Batteries, Systems, Accessories) plus a featured Buy Small product and a "Help me choose" link.

Public route groups:
- Commerce: `/shop`, `/shop/[category]`, `/shop/[category]/[slug]`, `/cart`, `/checkout`, `/order/confirmation/[no]`, `/track-order`
- Financing: `/buy-small`, `/buy-small/apply`
- Services: `/installation`
- Content: `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/testimonials`
- Training: `/training`, `/training/[slug]`, `/training/apply`
- Company: `/about`, `/contact`, `/faq`
- Legal: `/legal/terms`, `/legal/privacy`, `/legal/buy-small-terms`, `/legal/refunds`, `/legal/installation-terms`, `/legal/training-terms`
- Redirects from legacy URLs: `/project` to `/projects`, `/blog-post/[slug]` to `/blog/[slug]`, `/marketplace` to `/shop`.

### 7.2 Admin (staff only)
Auth routes (no sidebar, centred card on `green-50`, logo above): `/admin/login`, `/admin/accept-invite`, `/admin/reset-password`.

Sidebar groups (items hidden if the user lacks permission):

| Group | Items |
|---|---|
| Overview | Dashboard, Reports, Notifications |
| Sales | Orders, Customers (with follow-ups), Buy Small |
| Operations | Installations, Installers, Inventory |
| Catalogue | Products, Categories |
| Training | Programs, Applications, Internships, Alumni |
| Content | Blog, Projects, Testimonials, Pages, Media |
| Team | Staff, Departments, Roles and permissions, Tasks, Goals |
| System | Audit logs, Settings |

**Desktop:** fixed left sidebar 264px, `#333333` background with white text, active item `#7BB042` fill with black text, group labels in `green-300` 12px uppercase; collapsible to a 72px icon rail. Top bar 64px: breadcrumb, global search, **Notifications bell** (count badge amber), user menu (`user-cog`, role label, log out).
**Tablet:** sidebar collapsed to icon rail by default, expands as an overlay.
**Mobile:** sidebar becomes a drawer opened from the top bar; bottom tab bar (5 items by role: Dashboard, Orders, Installations or Tasks, Notifications, More) for daily mobile use, especially for Installers whose navigation shows only Assigned jobs, Schedule, Notifications.
Notifications panel: popover on desktop, full page on mobile; items have icon, text, time, read state; link to the entity.

---

## 8. Responsive rules

### 8.1 Breakpoints
| Name | Range | Columns | Gutter | Notes |
|---|---|---|---|---|
| Mobile S | 320 to 479px | 4 | 16px | Smallest supported, no horizontal scroll |
| Mobile | 480 to 767px | 4 | 16px | |
| Tablet | 768 to 1023px | 8 | 24px | |
| Desktop | 1024 to 1439px | 12 | 24px | Content max 1200px |
| Wide | 1440px and up | 12 | 32px | Content max 1360px for shop and admin, text stays 1200px |

### 8.2 Rules by device

**Mobile**
- One column. Images full-bleed inside 16px gutters, `r-lg`.
- Sticky bottom action bar on product page ("Add to cart" plus price), cart (total plus "Checkout") and checkout (total plus "Pay"); height 72px, `shadow-3` upward, safe-area padding.
- Filters live in a bottom sheet opened by a "Filters (n)" button; sort in a second sheet. Active filters show as removable pills.
- Shop grid 2 columns at 360px and above with compact product cards (specs reduced to 1, Buy Small line kept), 1 column below 360px.
- Tap targets 44px minimum, 8px minimum spacing. Inputs 16px font to prevent iOS zoom.
- Carousels use native horizontal scroll-snap with visible next-card peek; no autoplay.
- Tables become cards; admin forms become full-screen sheets; destructive actions confirm in a bottom sheet.
- Hero stats become a 2x2 grid; footer columns collapse to accordions.

**Tablet**
- 2 to 3 column grids. Filters as a left drawer. Product page: two columns (gallery left, purchase panel right, sticky). Checkout: two columns with order summary at the right at 900px and above, otherwise collapsed summary at top.
- Admin sidebar as icon rail; tables show up to 6 columns, others hidden in a "Columns" menu.

**Desktop**
- Shop: persistent left filter column 280px, 3 or 4 product columns. Product page: gallery 7 columns, purchase panel 5 columns sticky. Checkout: form 7 columns, summary 5 columns sticky.
- Admin: full sidebar, dashboard grid 12 columns, tables full width with all columns and density toggle.

**All sizes**
- No horizontal overflow at 320px width. Text can scale to 200 percent without loss.
- Images use responsive sizes, lazy-load below the fold, explicit aspect ratios to avoid layout shift; hero image is the only eager image.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` is **not** themed in V1 (light only; admin dark mode is out of scope for V1).
- Print styles for order confirmation, Buy Small agreement and invoices: black on white, no shadows.
- Keyboard: skip-to-content link, logical tab order, visible focus, `Esc` closes overlays, all carousels operable by keyboard.
