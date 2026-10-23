# Petfeb Design System

Reference: preferred desktop homepage design, PETFEB MASTER PRD, README.md.
Status: design specification. This file replaces the earlier `docs/design-system.md`.
Scope: public website and admin dashboard. Build in Next.js, Tailwind CSS, shadcn/ui, Lucide icons.

How to use this file: every colour, size, radius, shadow and spacing value in the build must come from a token below. If a value is missing, add a token here first, then use it.

---

## 0. What the reference design shows and what this system changes

The reference design sets the layout and mood. It has a few contrast failures, so these are corrected here.

| In the reference design | Problem | This system |
|---|---|---|
| White text on green buttons (Explore Products, Buy For ₦…, Join Training, Market Place) | White on #7BB042 is 2.58:1 (needs 4.5:1) | Buttons on #7BB042 use black text (8.13:1) |
| White "View Projects" button with green text | #7BB042 text on white is 2.58:1 | "Light" button uses `primary-800` text (6.31:1) |
| Training band: white text on solid green | Same 2.58:1 failure | Keep the green band, set text to black (8.13:1). Alternative: `primary-950` band with white text |
| Hero headline in white over a photo | Depends on the photo | Mandatory dark overlay under text (section 13.1) |
| Stat icons in light green on green-tint band | Low contrast | Icons use `primary-800` |
| Inactive filter pills in pale grey | Low contrast | Inactive pill text uses `neutral-600` (6.69:1) |
| Footer watermark text | Decorative only | Keep, mark `aria-hidden`, never carries information |

---

## 1. Principles

1. **Credible first.** It should look like a real energy company, not a template: real photography, real numbers (once approved), calm spacing.
2. **Green is the brand, amber is the spark.** Green carries surfaces and main actions. Amber is a highlight, one amber element per viewport region.
3. **Accessible by default.** Every colour pair in this file has a checked contrast ratio. Status is never colour alone.
4. **One scale for everything.** Type uses major third. Spacing uses a 4px grid. Radius, shadow and motion have fixed sets.
5. **Content is editable.** Anything a business owner may change (stats, testimonials, prices, trust claims) comes from the CMS or settings, never hard-coded.

---

## 2. Colour

### 2.1 Brand colours (official)

| Token | Hex | Use |
|---|---|---|
| `primary-500` | `#7BB042` | Brand green: buttons, fills, active indicators |
| `secondary-500` | `#F5B82E` | Solar amber: highlight buttons, badges, key accents |
| `white` | `#FFFFFF` | Page and card background, text on dark |
| `neutral-800` | `#333333` | Body text, dark surfaces (footer, admin sidebar) |
| `black` / `neutral-900` | `#000000` | Headings, text on green and amber |

### 2.2 Primary ramp (green)

| Token | Hex | Use |
|---|---|---|
| `primary-50` | `#F4F9EC` | Tinted section band (facts strip, Our Mission), table row hover |
| `primary-100` | `#E8F3DA` | Selected states, success chip background, avatar background |
| `primary-200` | `#D2E8B5` | Borders on tinted panels, selected-card border |
| `primary-300` | `#B4D88A` | Decorative accents, progress track on dark, chart secondary series |
| `primary-400` | `#9CC471` | Decorative only |
| **`primary-500`** | **`#7BB042`** | **Brand green** |
| `primary-600` | `#6A9E36` | Button hover |
| `primary-700` | `#4F8221` | Button pressed, white-on-green dark buttons (4.62:1) |
| `primary-800` | `#3F6B1A` | **Green text and links on white** (6.31:1), icons on white |
| `primary-900` | `#2F5212` | Strong green text on tints (7.82:1 on primary-100) |
| `primary-950` | `#1F3A0B` | Deep green band, shadow tint base |

### 2.3 Secondary ramp (amber)

| Token | Hex | Use |
|---|---|---|
| `secondary-50` | `#FEF8E7` | Promo band and notice background |
| `secondary-100` | `#FDF0CC` | Warning chip background |
| `secondary-200` | `#FBE29A` | Highlight marker behind key words |
| `secondary-300` | `#F9D56B` | Decorative only |
| `secondary-400` | `#F7C74A` | Decorative only |
| **`secondary-500`** | **`#F5B82E`** | **Brand amber** |
| `secondary-600` | `#E6A71A` | Amber button hover |
| `secondary-700` | `#C98F0E` | Amber button pressed |
| `secondary-800` | `#B27800` | Amber graphics on white (3.76:1, icons and large UI only) |
| `secondary-900` | `#8A5A00` | **Amber text on white** (5.93:1) |
| `secondary-950` | `#5C3C00` | Rarely used, deepest amber |

### 2.4 Neutral ramp (grey)

| Token | Hex | Use |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Surfaces |
| `neutral-50` | `#F8F8F8` | Admin page background, zebra rows |
| `neutral-100` | `#F2F2F2` | Muted section band (blog, testimonials), disabled fill, skeleton |
| `neutral-200` | `#D9D9D9` | Decorative borders and dividers |
| `neutral-300` | `#BDBDBD` | Muted text on dark surfaces (6.73:1 on #333333), decorative only on white |
| `neutral-400` | `#8A8A8A` | Form control borders (3.45:1, meets 3:1 for UI) |
| `neutral-500` | `#767676` | Placeholder and tertiary text on white only (4.54:1) |
| `neutral-600` | `#5C5C5C` | Secondary text on light surfaces (6.69:1) |
| `neutral-700` | `#4A4A4A` | Strong secondary text |
| `neutral-800` | `#333333` | Body text, dark surfaces |
| `neutral-850` | `#1A1A1A` | Dark button hover only (white text on it is about 17:1) |
| `neutral-900` | `#000000` | Headings |

### 2.5 Functional colours (status and validation only)

| Token | Hex | Use |
|---|---|---|
| `error-100` | `#FCE8E6` | Error chip and alert background |
| `error-600` | `#B3261E` | Error text, destructive button fill |
| `error-700` | `#9A1F18` | Destructive hover |
| `error-800` | `#7A1812` | Destructive pressed |
| `info-100` | `#E6F0FA` | Info chip and alert background |
| `info-600` | `#1F5FA8` | Info text and icons |

Success uses `primary-100` with `primary-900`. Warning uses `secondary-100` with `secondary-900`. Error and info colours are never used for decoration.

### 2.6 Semantic tokens (what components use)

| Token | Value | Use |
|---|---|---|
| `bg-page` | `white` | Default page |
| `bg-tint` | `primary-50` | Alternating section band |
| `bg-muted` | `neutral-100` | Blog and testimonial bands |
| `bg-brand` | `primary-500` | Green band (training banner) |
| `bg-brand-deep` | `primary-950` | Deep green band |
| `bg-inverse` | `neutral-800` | Footer, admin sidebar |
| `text-strong` | `black` | Headings |
| `text-default` | `neutral-800` | Body |
| `text-muted` | `neutral-600` | Secondary text, captions |
| `text-placeholder` | `neutral-500` | Placeholders (white backgrounds only) |
| `text-brand` | `primary-800` | Links, eyebrows, green icons |
| `text-on-brand` | `black` | Text on `primary-500` and `secondary-500` |
| `text-inverse` | `white` | Text on dark surfaces |
| `text-warning` | `secondary-900` | Amber text on white |
| `text-danger` | `error-600` | Errors |
| `border-subtle` | `neutral-200` | Cards, dividers |
| `border-control` | `neutral-400` | Inputs, checkboxes, selects |
| `border-strong` | `neutral-800` | Outline buttons |
| `border-focus` | `black` (`secondary-500` on dark) | Focus ring |

### 2.7 Section band rhythm

Alternate bands down a page, as in the reference: white, `bg-tint`, white, `bg-tint`, `bg-muted` for blog and testimonials, then `bg-inverse` footer. The training banner is the one `bg-brand` band. Use at most one deep or green band per screen height.

### 2.8 Contrast matrix (WCAG 2.1, computed)

AA needs 4.5:1 for normal text and 3:1 for large text and UI shapes.

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| black | `primary-500` | 8.13 | Pass, use for text on green |
| `neutral-800` | `primary-500` | 4.89 | Pass |
| **white** | **`primary-500`** | **2.58** | **Fail, never** |
| black | `secondary-500` | 11.78 | Pass, use for text on amber |
| **white** | **`secondary-500`** | **1.78** | **Fail, never** |
| `primary-500` | white | 2.58 | Fail as text, fills only |
| `primary-800` | white | 6.31 | Pass |
| `primary-700` | white | 4.62 | Pass, minimum |
| `primary-800` | `primary-50` | 5.89 | Pass |
| `primary-800` | `primary-100` | 5.49 | Pass |
| `primary-900` | `primary-100` | 7.82 | Pass |
| white | `primary-800` | 6.31 | Pass |
| white | `primary-700` | 4.62 | Pass |
| white | `primary-950` | 12.59 | Pass |
| `primary-500` | `primary-950` | 4.87 | Pass |
| `secondary-500` | `primary-950` | 7.06 | Pass |
| black | `primary-600` | 6.56 | Pass, hover |
| black | `primary-700` | 4.55 | Pass, pressed |
| black | `secondary-600` | 9.91 | Pass, hover |
| black | `secondary-700` | 7.42 | Pass, pressed |
| `secondary-900` | white | 5.93 | Pass |
| `secondary-900` | `secondary-100` | 5.22 | Pass |
| `secondary-900` | `secondary-50` | 5.59 | Pass |
| `neutral-800` | white | 12.63 | Pass |
| white | `neutral-800` | 12.63 | Pass |
| `primary-500` | `neutral-800` | 4.89 | Pass |
| `secondary-500` | `neutral-800` | 7.09 | Pass |
| `neutral-200` | `neutral-800` | 8.95 | Pass |
| `neutral-300` | `neutral-800` | 6.73 | Pass |
| `neutral-600` | white | 6.69 | Pass |
| `neutral-600` | `neutral-100` | 5.97 | Pass |
| `neutral-500` | white | 4.54 | Pass, just |
| **`neutral-500`** | **`primary-50`** | **4.24** | **Fail, no placeholder or tertiary text on tints** |
| `neutral-400` | white | 3.45 | Pass for UI borders only |
| `error-600` | white | 6.54 | Pass |
| `error-600` | `error-100` | 5.55 | Pass |
| white | `error-600` | 6.54 | Pass |
| `info-600` | white | 6.44 | Pass |
| `info-600` | `info-100` | 5.58 | Pass |
| `primary-800` | `primary-500` | 2.44 | Fail, so the focus ring is black, not green |

Rules that follow:
1. Text or icon on `primary-500` or `secondary-500`: black, or `neutral-800` at 15px bold and larger. Never white.
2. Green text on white: `primary-800` or darker.
3. Amber text on white: `secondary-900` only. Amber icons on white need a text label next to them.
4. White text is allowed on `primary-700` and darker, on `neutral-800`, and on error and info fills.
5. Status is never conveyed by colour alone: icon plus label.

---

## 3. Typography

Families: **Space Grotesk** (headings, numbers, buttons, nav) and **Roboto** (body, forms, tables). No other fonts, including no monospace.

Weights loaded: Space Grotesk 500, 600, 700. Roboto 400, 500, 700. Latin subset, `display: swap`.

### 3.1 Scale: major third (ratio 1.25), base 12px

Each step is the previous step times 1.25. Values are rounded to the nearest pixel for use, and `rem` assumes a 16px root.

| Step | Calculation | Exact | Use (px) | rem |
|---|---|---|---|---|
| `text-0` (base) | 12 | 12.00 | **12** | 0.75 |
| `text-1` | 12 × 1.25 | 15.00 | **15** | 0.9375 |
| `text-2` | 12 × 1.25² | 18.75 | **19** | 1.1875 |
| `text-3` | 12 × 1.25³ | 23.44 | **23** | 1.4375 |
| `text-4` | 12 × 1.25⁴ | 29.30 | **29** | 1.8125 |
| `text-5` | 12 × 1.25⁵ | 36.62 | **37** | 2.3125 |
| `text-6` | 12 × 1.25⁶ | 45.78 | **46** | 2.875 |
| `text-7` | 12 × 1.25⁷ | 57.22 | **57** | 3.5625 |
| `text-8` | 12 × 1.25⁸ | 71.53 | **72** | 4.5 |
| `text-9` | 12 × 1.25⁹ | 89.41 | **89** | 5.5625 |

Where 12px and 15px are used: 12px (`text-0`) is for captions, helper text, overline labels, badges, table meta and legal text only. It is never used for paragraphs or for instructions the user must read to finish a task. Body paragraphs use 15px (`text-1`). `text-9` is reserved for the footer watermark.

One exception to the scale: form control text is 16px on touch devices so iOS Safari does not zoom on focus. This is the only off-scale size.

### 3.2 Text styles

| Style | Font | Weight | Desktop | Mobile | Line height | Tracking | Use |
|---|---|---|---|---|---|---|---|
| Display | Space Grotesk | 700 | `text-8` 72 | `text-6` 46 | 1.05 | -0.02em | Hero headline, once per page. May be uppercase, as in the reference |
| H1 | Space Grotesk | 700 | `text-7` 57 | `text-5` 37 | 1.1 | -0.015em | Page title, one per page |
| H2 | Space Grotesk | 700 | `text-6` 46 | `text-4` 29 | 1.15 | -0.01em | Section titles (Our Vision, Product, Project) |
| H3 | Space Grotesk | 600 | `text-5` 37 | `text-3` 23 | 1.2 | -0.005em | Sub-sections, band titles |
| H4 | Space Grotesk | 600 | `text-4` 29 | `text-2` 19 | 1.25 | 0 | Card group titles |
| H5 | Space Grotesk | 600 | `text-3` 23 | `text-2` 19 | 1.3 | 0 | Card titles (product, blog, project row) |
| H6 | Space Grotesk | 600 | `text-2` 19 | `text-1` 15 | 1.3 | 0 | Small headings, footer column titles |
| Body L (lead) | Roboto | 400 | `text-2` 19 | `text-2` 19 | 1.6 | 0 | Section intro paragraphs |
| Body | Roboto | 400 | `text-1` 15 | `text-1` 15 | 1.6 | 0 | Default text |
| Body strong | Roboto | 500 | `text-1` 15 | `text-1` 15 | 1.6 | 0 | Emphasis |
| Label | Roboto | 500 | `text-1` 15 | `text-1` 15 | 1.3 | 0 | Form labels, table headers |
| Caption | Roboto | 400 | `text-0` 12 | `text-0` 12 | 1.4 | 0.01em | Helper text, dates, legal, "Min. Order" |
| Overline | Space Grotesk | 600 | `text-0` 12 | `text-0` 12 | 1.2 | 0.08em, uppercase | Eyebrow above headings, `text-brand` |
| Nav link | Space Grotesk | 500 | `text-1` 15 | `text-2` 19 | 1.2 | 0 | Header and footer links |
| Button | Space Grotesk | 600 | `text-1` 15 (`text-2` 19 for large, `text-0` 12 for extra small) | same | 1 | 0.005em | Buttons |
| Price | Space Grotesk | 700 | `text-3` 23 | `text-2` 19 | 1 | 0 | Product price, tabular figures |
| Stat number | Space Grotesk | 700 | `text-5` 37 | `text-4` 29 | 1 | -0.01em | Facts strip, dashboard KPIs |

### 3.3 Rules
- Headings use Space Grotesk. Everything else uses Roboto, except buttons, nav, prices and stat numbers.
- Maximum line length: 68ch for articles, 56ch for lead paragraphs.
- Prices use `₦` with thousands separators (`₦567,900`), tabular figures.
- Headings use sentence case. Uppercase is limited to Overline and the hero Display.
- Do not skip heading levels. One H1 per page.
- Clamp long text: product descriptions 3 lines, blog excerpts 3 lines, card titles 2 lines.

---

## 4. Spacing and layout

### 4.1 Spacing scale (4px base)

| Token | px | Token | px |
|---|---|---|---|
| `space-0` | 0 | `space-8` | 32 |
| `space-1` | 4 | `space-10` | 40 |
| `space-2` | 8 | `space-12` | 48 |
| `space-3` | 12 | `space-16` | 64 |
| `space-4` | 16 | `space-20` | 80 |
| `space-5` | 20 | `space-24` | 96 |
| `space-6` | 24 | `space-32` | 128 |

### 4.2 Layout

| Item | Mobile (under 768) | Tablet (768 to 1023) | Desktop (1024 and up) |
|---|---|---|---|
| Columns | 4 | 8 | 12 |
| Gutter | 16 | 24 | 24 |
| Page margin | 16 | 24 | 32 |
| Content max width | fluid | fluid | 1200 |
| Section vertical padding | 48 | 64 | 96 |
| Card padding | 16 | 20 | 24 |
| Gap between related items | 8 to 12 | 12 to 16 | 12 to 16 |
| Gap between cards | 16 | 24 | 24 |
| Form field gap | 16 | 20 | 24 |

### 4.3 Breakpoints

`sm` 480, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440. Design at 390 (mobile), 768 (tablet), 1440 (desktop). No horizontal scroll at 320.

---

## 5. Border radius

| Token | px | Use |
|---|---|---|
| `radius-none` | 0 | Full-bleed bands |
| `radius-xs` | 4 | Checkbox, tags in tables |
| `radius-sm` | 6 | Small controls, tooltips, extra-small buttons |
| `radius-md` | 8 | **Buttons, inputs, selects, textareas** |
| `radius-lg` | 12 | **Cards, dropdown menus, product images** |
| `radius-xl` | 16 | Large cards, accordion container, modals |
| `radius-2xl` | 24 | Hero media panel, image blocks in split sections, mobile bottom sheets (top corners) |
| `radius-full` | 999 | Chips, pills, avatars, toggles |

---

## 6. Elevation (drop shadows)

Shadows are soft and tinted with `primary-950` (`rgb(31 58 11)`), never pure black.

| Token | Value | Use |
|---|---|---|
| `shadow-none` | none | Flat, bordered elements |
| `shadow-xs` | `0 1px 2px rgb(31 58 11 / 0.06)` | Buttons on hover, inputs on focus-within |
| `shadow-sm` | `0 1px 3px rgb(31 58 11 / 0.10), 0 1px 2px rgb(31 58 11 / 0.06)` | Cards at rest |
| `shadow-md` | `0 4px 8px -2px rgb(31 58 11 / 0.10), 0 2px 4px -2px rgb(31 58 11 / 0.06)` | Card hover, sticky header after scroll |
| `shadow-lg` | `0 12px 24px -6px rgb(31 58 11 / 0.14), 0 4px 8px -4px rgb(31 58 11 / 0.08)` | **Dropdown menus, popovers, date pickers** |
| `shadow-xl` | `0 24px 48px -12px rgb(31 58 11 / 0.22)` | Modals, drawers, mini-cart |
| `shadow-inset` | `inset 0 1px 2px rgb(0 0 0 / 0.12)` | Pressed button |
| `ring-focus` | `0 0 0 2px #FFFFFF, 0 0 0 4px #000000` | Focus-visible ring on light surfaces |
| `ring-focus-inverse` | `0 0 0 2px #333333, 0 0 0 4px #F5B82E` | Focus-visible ring on dark surfaces |

Z-index scale: `base` 0, `sticky` 100, `dropdown` 1000, `overlay` 1100, `modal` 1200, `toast` 1300, `tooltip` 1400.

Overlay (behind modals and drawers): `rgb(0 0 0 / 0.5)`.

---

## 7. Icons

- Lucide only (`lucide-react`). Outline only, round caps and joins.
- Stroke: 1.75 default, 2 at 16px and below, 1.5 at 32px and above.
- Sizes: 16 inline and chips, 20 buttons and inputs, 24 nav and cards, 32 feature icons, 48 empty states.
- Colour: inherits text colour. On white use `neutral-800` or `primary-800`. On green or amber fills use black. Never `primary-500` or `secondary-500` icons alone on white.
- Decorative icons `aria-hidden="true"`. Icon-only buttons have an `aria-label` and a 44px target.
- Exception: official LinkedIn, Facebook, Instagram and X logos for social links, in the footer and contact page only.
- Check every icon name against the installed `lucide-react` version before use. Some names have been renamed (for example `loader-2` to `loader-circle`).

| Concept | Icon |
|---|---|
| Solar, power | `sun`, `zap`, `plug-zap` |
| Battery | `battery-charging`, `battery-full` |
| Installation | `wrench`, `hard-hat`, `hammer` |
| Delivery | `truck`, `package`, `map-pin` |
| Cart, payment | `shopping-cart`, `credit-card`, `lock` |
| Training | `graduation-cap`, `book-open`, `award` |
| Checklist bullets | `check`, `circle-check` |
| Contact | `phone`, `mail`, `message-circle`, `globe` |
| Controls | `search`, `menu`, `x`, `chevron-down`, `chevron-right`, `arrow-right`, `arrow-up-right` |
| Feedback | `circle-check`, `circle-alert`, `triangle-alert`, `info`, `loader-circle` |

---

## 8. Buttons

### 8.1 Types

| Type | Fill | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `primary-500` | black | none | Main action: Buy, Pay, Submit, Explore Products |
| **Secondary (amber)** | `secondary-500` | black | none | One highlight action per region |
| **Outline** | transparent | black | 1.5px `neutral-800` | Secondary actions: View details, Back |
| **Outline on dark** | transparent | white | 1.5px white | On photos, deep green and footer |
| **Light** | white | `primary-800` | none | On photos, green bands (for example "View Projects", "Join Training") |
| **Dark** | `neutral-800` | white | none | Strong CTA on light bands, on amber bands |
| **Deep green** | `primary-700` | white | none | Optional dark-green action on white (4.62:1) |
| **Ghost / link** | transparent | `primary-800`, underlined | none | Inline and "Go to Shop" style links, with trailing `arrow-right` |
| **Destructive** | `error-600` | white | none | Cancel order, delete, archive |
| **Icon button** | any type above | same as type | same | 44px square, needs `aria-label` |

### 8.2 States (every type has all of these)

| State | Primary | Secondary (amber) | Outline | Light | Dark | Ghost | Destructive |
|---|---|---|---|---|---|---|---|
| Default | `primary-500` / black | `secondary-500` / black | transparent, `neutral-800` border | white / `primary-800` | `neutral-800` / white | `primary-800` text | `error-600` / white |
| Hover | `primary-600` + `shadow-xs` | `secondary-600` + `shadow-xs` | `primary-50` fill | `primary-50` fill | `neutral-850` | `primary-900` text, thicker underline | `error-700` |
| Focus-visible | `ring-focus` | `ring-focus` | `ring-focus` | `ring-focus-inverse` on dark surfaces | `ring-focus` | `ring-focus` | `ring-focus` |
| Active (pressed) | `primary-700` + `shadow-inset` | `secondary-700` + `shadow-inset` | `primary-100` fill | `primary-100` fill | black | `primary-950` text | `error-800` |
| Disabled | `neutral-100` fill, `neutral-600` text, no shadow, `cursor: not-allowed` | same | `neutral-200` border, `neutral-600` text | same | same | `neutral-600` text, no underline | same |
| Loading | spinner replaces icon, label stays, `aria-busy`, clicks blocked | same | same | same | same | same | same |

Focus ring on dark surfaces (`bg-inverse`, deep green, photos with overlay) uses `ring-focus-inverse`. Disabled buttons keep their label so users know what is unavailable, and explain why in helper text where possible.

### 8.3 Sizes

| Size | Height | Horizontal padding | Text | Icon | Use |
|---|---|---|---|---|---|
| `xs` | 28 | 12 | 12 | 16 | Dense admin tables (pointer devices only) |
| `sm` | 36 | 16 | 15 | 16 | Header button, card actions |
| **`md`** | **44** | **20** | **15** | **20** | **Default** |
| `lg` | 52 | 28 | 19 | 20 | Hero and band CTAs |

- Radius `radius-md` (8). Icon gap 8px. Trailing arrow icons for navigation actions.
- Touch targets are at least 44px. `xs` is allowed only where the pointer is a mouse. On touch devices its hit area is padded to 44.
- On mobile, primary actions in forms and cards are full width.
- Button groups: 12px gap, wrap on small screens. Never more than one Primary and one Secondary together.

---

## 9. Form controls

### 9.1 Field anatomy
Label above (Label style, 8px gap), control, helper text below in Caption `text-muted`. Mark required fields with the words "(required)", not only an asterisk.

### 9.2 Text input, textarea
| Property | Value |
|---|---|
| Height | 48 (admin dense 40). Textarea min height 120, vertical resize only |
| Fill, text | white, `neutral-800`, Roboto `text-1` (16px on touch devices) |
| Border | 1px `neutral-400`, radius `radius-md` |
| Placeholder | `neutral-500`, white backgrounds only |
| Padding | 12px horizontal, with 16px if an icon is present |

| State | Treatment |
|---|---|
| Default | 1px `neutral-400` |
| Hover | border `neutral-700` |
| Focus | 2px black border plus `shadow-xs`, no layout shift (reduce padding by 1px) |
| Filled | same as default, text `neutral-800` |
| Error | 2px `error-600` border, `circle-alert` icon, message in `error-600` Caption, linked with `aria-describedby` |
| Success | 1px `primary-700` border and `circle-check`, only where reassurance is needed |
| Disabled | `neutral-100` fill, `neutral-600` text, no hover |
| Read-only | `neutral-50` fill, text selectable |

Variants: with leading icon, with trailing button (the footer subscribe field uses a square Primary icon button joined to the input), phone input with `+234` prefix selector, password with show/hide `eye` button.

### 9.3 Select (dropdown field)
Trigger looks like a text input with a trailing `chevron-down` (rotates 180° when open). The menu is described in section 10. Native `<select>` is allowed on mobile for speed. Multi-select shows chosen items as removable chips.

### 9.4 Checkbox, radio, toggle
- Checkbox: 24px box, radius `radius-xs`, 1.5px `neutral-400` border. Checked: `primary-500` fill with a black `check`. Indeterminate: black dash.
- Radio: 24px circle. Selected: `primary-500` fill ring with a black centre dot.
- Toggle: 44 × 24 track, `radius-full`. Off: `neutral-400` track, white knob. On: `primary-500` track, black knob. Label on the right, whole row clickable.
- Selectable card (for example "Do you want an installer?"): white card, 1.5px `neutral-400` border; selected: 2px black border, `primary-100` fill, `circle-check` badge top right.
- Hover on all: border `neutral-700`. Focus-visible: `ring-focus`. Disabled: `neutral-100` fill.

### 9.5 Other controls
- Quantity stepper: `minus` and `plus` buttons 44px, number in the middle, min 1, max stock.
- File upload: dashed 1.5px `neutral-400` zone, `radius-lg`, `upload` icon, drag-over state `primary-50` fill with `primary-500` border; shows file name, size, remove button, progress bar.
- Search field: input with leading `search` icon and clear `x` button.
- Slider (price range): track `neutral-200`, active range `primary-500`, 24px knobs with `ring-focus`.

### 9.6 Form behaviour
- Single column on mobile. Two or three columns on desktop only for short related fields (name, email, phone).
- Validate on blur and on submit. On submit show a summary alert listing errors with links to fields, and move focus to the first error. Never clear typed input after an error.
- Server-side validation always; client-side messages use plain language.
- Spam protection with a hidden honeypot field plus rate limiting.
- Success state: confirmation panel with `circle-check`, reference number and next steps.

---

## 10. Dropdown menus, popovers and tooltips

| Item | Spec |
|---|---|
| Menu panel | White, 1px `neutral-200` border, `radius-lg` (12), `shadow-lg`, padding 4, min width equal to trigger, max height 320 with scroll, `z-dropdown` |
| Menu item | Height 44 (dense 36), padding 12, Roboto `text-1`, `radius-md`, icon 20 on the left optional |
| Item hover and keyboard highlight | `primary-50` fill |
| Item selected | `primary-100` fill, trailing `check` icon |
| Item disabled | `neutral-600` text, no hover |
| Item destructive | `error-600` text, hover `error-100` |
| Group label | Overline style, `neutral-600`, padding 12 |
| Divider | 1px `neutral-200`, 4px vertical margin |
| Search inside menu | Sticky input at the top for lists over 8 items |
| Open animation | Fade and 4px slide down, 150ms |
| Keyboard | Arrow keys move, Enter selects, Esc closes and returns focus, type-ahead search |
| Mobile | Selects open as a bottom sheet (`radius-2xl` top corners, `shadow-xl`, drag handle, 44px rows) |

Popover (filters, mini-cart preview): same panel style, padding 16, optional arrow, closes on outside click and Esc.

Tooltip: `neutral-800` fill, white Caption text, `radius-sm`, padding 6 × 10, `shadow-md`, 8px offset, appears after 300ms on hover and on keyboard focus, max width 240. Tooltips never hold essential information or interactive content.

---

## 11. Navigation

### 11.1 Header
- Sticky, white, 72px high. `shadow-md` appears after scroll.
- Left: logo. Centre or right: nav links (Nav link style, 24px gaps). Right: Primary `sm` button, cart icon button with black count badge (white text), optional search icon button.
- Nav item states: default `neutral-800`; hover `primary-800`; active `primary-800` with a 2px `primary-500` underline; focus-visible `ring-focus`.
- Nav items come from site configuration. The approved list is Home, About Us, Contact Us, Our Projects, Shop, Training. Other links (Blog, FAQ, Track order, Installation, legal pages, Buy Small) live in the footer.
- Mobile (under 1024): 64px bar with `menu` button, logo, cart. The menu opens as a left drawer, 56px rows, a pinned Primary button at the bottom, and phone and WhatsApp links.

### 11.2 Tabs and pill filters
- Pill filter row (as in the product section): pills 36px high, `radius-full`, padding 16, Space Grotesk 500 `text-1`.
- Inactive: white fill, 1px `neutral-400` border, `neutral-800` text. Hover: `primary-50` fill. Active: `primary-500` fill, black text, no border. Focus: `ring-focus`.
- On mobile the row scrolls horizontally with a peek of the next pill and `scroll-snap`.
- Underline tabs (admin, detail pages): 48px high, active 3px `primary-500` bar and black text, inactive `neutral-600`.

### 11.3 Breadcrumbs, pagination
- Breadcrumb: Caption or Body S, links `primary-800`, `chevron-right` separators, current page `neutral-600` and not a link.
- Pagination: 44px square items, `radius-md`, current page `primary-500` fill with black text, `chevron-left` and `chevron-right` buttons. "Load more" button replaces numbers on mobile.

### 11.4 Footer
- `bg-inverse` (`neutral-800`), white text, `neutral-300` secondary text, link hover underlined in `secondary-500`.
- Layout (desktop): brand block (logo, tagline, subscribe field with joined arrow button, social icons) left; link columns (Social links, Information with address, phone, email, website icons) right. Column titles use H6.
- Bottom bar: copyright in Caption `neutral-300`, 1px `rgb(255 255 255 / 0.2)` divider above.
- Watermark: the tagline in `text-9` Space Grotesk 700, white at 6 percent opacity, cropped by the bottom edge, `aria-hidden`.
- Mobile: columns stack, link groups can collapse into accordions, contact details and socials stay visible.

---

## 12. Feedback components

### 12.1 Chips and badges
Height 24, padding 0 12, `radius-full`, Roboto 500 `text-0` (12px), optional 14px icon.

| Chip | Fill | Text |
|---|---|---|
| Category: Training | `primary-100` | `primary-900` |
| Category: Project | `secondary-100` | `secondary-900` |
| Category: News | `info-100` | `info-600` |
| Featured | `primary-500` | black |
| Highlight (for example Buy Small) | `secondary-500` | black |
| Neutral | `neutral-100` | `neutral-800` |
| Count badge (cart, notifications) | black | white |

### 12.2 Status chips
Height 28, `radius-full`, Roboto 500 `text-0`, 14px icon plus label. Always icon plus text. Tones:

| Tone | Fill / Text | Statuses |
|---|---|---|
| Neutral | `neutral-100` / `neutral-800` | Pending, Cancelled, Refunded, Draft, Archived, To Do, Not Started, Upcoming |
| Info | `info-100` / `info-600` | Payment Processing, Processing, Ready for Delivery, Out for Delivery, Installation Scheduled, Assigned, Scheduled, In Progress, Review |
| Success | `primary-100` / `primary-900` | Paid, Delivered, Installation Completed, Completed, Approved, Published, Active, On Track |
| Warning | `secondary-100` / `secondary-900` | Installation Pending, Requested, Pending Assignment, Pending KYC, Grace period, Due, At Risk |
| Danger | `error-100` / `error-600` | Blocked, Behind, Failed payment, Overdue, Rejected |

Status names are labels from the PRD and can be changed in settings.

### 12.3 Alerts
Full width, `radius-lg`, 4px left bar, 20px icon, title in Body strong, text in Body, optional action link and close button. Tones: Success (`primary-100`, `primary-900`, `circle-check`), Warning (`secondary-100`, `secondary-900`, `triangle-alert`), Error (`error-100`, `error-600`, `circle-alert`), Info (`info-100`, `info-600`, `info`). Errors use `role="alert"`; others `role="status"`.

### 12.4 Toasts
`neutral-800` fill, white text, `radius-lg`, `shadow-lg`, 5s, close button, `aria-live="polite"`. Position: bottom centre on mobile, top right on desktop. Stack up to 3. Errors stay until dismissed.

### 12.5 Modal and drawer
- Modal: white, `radius-xl`, `shadow-xl`, padding 24, widths 400 / 560 / 720, overlay `rgb(0 0 0 / 0.5)`, close `x` top right, focus trapped, Esc closes, focus returns to the trigger.
- Drawer: right side for filters and mini-cart (width 420), left side for mobile menu.
- Mobile: modals become a bottom sheet with `radius-2xl` top corners and a drag handle.

### 12.6 Progress, loading, empty
- Progress bar: 10px high, `radius-full`, track `neutral-100`, fill `primary-500`. Segmented "power meter" variant: 10 segments with 4px gaps, used for stock, seats, goals and payment progress.
- Skeleton: `neutral-100` blocks, `radius-md`, 1.4s shimmer towards `neutral-50`. Static under reduced motion.
- Spinner: `loader-circle` 20px, 1s rotation.
- Empty state: 48px icon in a `primary-100` circle, H5 title, one line of help, one Primary button.

---

## 13. Page components (from the reference design)

### 13.1 Hero
- Media panel: `radius-2xl`, 16:9 on desktop, around 560px high on mobile. Can be an image or a video.
- Overlay: dark gradient under the text, at least `rgb(0 0 0 / 0.55)` where text sits. Check the final media against 4.5:1 for the headline.
- Content: Overline, Display headline, Body L supporting line (white), two buttons (Primary `lg` plus Light or Outline on dark). Centred on desktop as in the reference, left aligned on mobile.
- Video rules: muted, looping, `playsInline`, poster image, no audio. Provide a visible pause button (moving content over 5 seconds must be pausable). Under reduced motion or save-data, show the poster only. Keep under 5MB, with a compressed mobile source.

### 13.2 Partner logo strip
Title H5 centred. Logos 40px high, greyscale, 48px gaps, colour on hover, each with alt text. Mobile: horizontal scroll with snap.

### 13.3 Facts strip
Full-bleed `bg-tint` band. Title H5 centred. Four to five items in a row: 24px Lucide icon in `primary-800`, stat number, Caption label in `neutral-600`. Mobile: 2 columns. Numbers come from settings and must be marked for Petfeb confirmation until approved.

### 13.4 Split section (Our Vision, Our Mission)
Two columns (5 / 7 or 6 / 6). Image block with `radius-2xl`; overlapping second image allowed (offset 24px, white 4px border). Text: H2, Body L, checklist with 20px `check` icons in `primary-800`, 12px gaps. Alternate sides and alternate white and `bg-tint`. Mobile: image first, text below.

### 13.5 Product card
- White, 1px `neutral-200`, `radius-lg`, `shadow-sm`, hover `shadow-md` and 2px lift, padding 16.
- Image area: `neutral-50` fill, `radius-lg`, 1:1, product centred, object-fit contain.
- Content: H5 name (2 lines), Body S description (3 lines, `neutral-600`), Price, Caption "Min. Order : 1 unit", full-width Primary `md` button ("Buy For ₦567,900").
- States: loading skeleton, out of stock (chip on image, disabled button), low stock chip.
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile (2 compact columns in shop listings).

### 13.6 Training banner
Full-bleed split: image half (left, no radius) and `bg-brand` half (right). H2 and Body in black, Light button. Mobile: image above, green panel below, same text colours.

### 13.7 Project accordion
Container `radius-xl`, 1px `neutral-200`. Each row: padding 24, H5 title left, location Body `neutral-600` right, `chevron-down` that rotates when open. Hover `primary-50`. Open: media panel `radius-xl` with overlay, chips (Completed, Training), "More Details" button. 250ms height animation. `aria-expanded`, keyboard operable (Enter and Space), focus ring on the row.

### 13.8 Blog card
White, 1px `neutral-200`, `radius-lg`, `shadow-sm`. Image 16:10 (`radius-lg` top), category chip, H5 title (2 lines), Body S excerpt (3 lines), Primary `sm` "Read More" button, footer row with 32px avatar, author name, date Caption. Hover `shadow-md`. Grid: 3 columns, 2 on tablet, 1 on mobile.

### 13.9 Testimonial card
White card on `bg-muted` band, `radius-lg`, padding 24. Avatar 48 (initials, `primary-100` fill, `primary-900` text), name in Body strong, role Caption `neutral-600`, 5-star row (`secondary-800` stars with screen-reader text "5 out of 5"), quote Body, optional screenshot thumbnail `radius-md` that opens in a modal, date Caption. Content is managed from the admin dashboard.

### 13.10 CTA band
Full-bleed band in `bg-tint`, `bg-brand` or `secondary-50`; H3 left, button right (Primary on tint, Dark on amber or green). Mobile: stacked, full-width button. One amber element per region.

### 13.11 Contact form section
H2, Body L, then the form (section 9) in a 3-column grid: name, email, phone; address, city, postcode; select; textarea; full-width Primary submit button. Fields have visible labels. Success and error states as in 9.6.

---

## 14. Tables and admin shell

### 14.1 Tables
Container white, 1px `neutral-200`, `radius-lg`. Header row `neutral-50`, Label style, sticky on scroll. Row height 56 (dense 44), 1px `neutral-200` row dividers, hover `primary-50`, selected `primary-100` with a checked checkbox. Number columns right aligned with tabular figures. Status column uses status chips. Row actions in a kebab menu (`ellipsis`). Toolbar above: search, filter pills, bulk actions, export. Footer: rows per page and pagination. States: loading skeleton rows, empty state, error alert with "Try again". On mobile, rows become stacked cards with the status chip at the top right.

### 14.2 Admin shell
- Page background `neutral-50`. Sidebar 264px (72px collapsed), `bg-inverse`, white text, group labels in Overline `neutral-300`, active item `primary-500` fill with black text, hover `rgb(255 255 255 / 0.08)`.
- Top bar 64px white: breadcrumb, search, notifications bell with count badge, user menu with role chip.
- Content cards: white, 1px `neutral-200`, `radius-lg`, `shadow-sm`. KPI card: icon in a `primary-100` circle, Stat number, delta chip with icon and text.
- Items the user cannot access are hidden, not locked.
- Mobile: sidebar becomes a drawer, bottom tab bar for the top five destinations by role.

---

## 15. Motion

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 120ms | Hover, press |
| `duration-base` | 200ms | Dropdowns, chips, focus |
| `duration-slow` | 320ms | Accordion, drawer, modal |
| `duration-reveal` | 600ms | Scroll reveal |
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |

**Scroll reveal (slide-in on scroll):**
- Elements fade from opacity 0 to 1 and slide 24px up (cards, headings) or 32px sideways (split-section images from their own side, text from the other).
- Triggered once, when 20 percent of the element is visible, using `IntersectionObserver`. Stagger children by 80ms, maximum 6 items.
- Apply to selected sections only (for example Vision, Mission, product cards, blog cards). Do not animate the header, hero text, forms or anything above the fold that must be readable immediately.
- Content must stay visible if JavaScript fails (animate from a CSS class added by script).
- `prefers-reduced-motion: reduce`: no slide, no fade delay; elements appear instantly. Also disable hero video autoplay.

Other motion: card lift 2px, button press 1px, chevron rotation 200ms. No parallax, no autoplaying carousels.

---

## 16. Accessibility checklist

- All text and UI pairs come from the contrast matrix (2.8).
- Visible focus on every interactive element (`ring-focus` or `ring-focus-inverse`).
- Touch targets at least 44 × 44, 8px apart.
- Semantic HTML, one H1 per page, no skipped heading levels, skip-to-content link.
- Labels on every field, errors linked with `aria-describedby`, summary alert on submit.
- Status and meaning never by colour alone.
- Images have alt text. Decorative images and the footer watermark use empty alt or `aria-hidden`.
- Keyboard: Esc closes overlays, arrow keys in menus and tabs, focus trap in modals, focus returns to the trigger.
- Reduced motion respected (section 15). Video can be paused.
- Text can scale to 200 percent without loss. No horizontal scroll at 320 wide.

---

## 17. Implementation tokens

Paste into `src/app/globals.css`. With Tailwind v4, map these under `@theme`. With Tailwind v3, map them in `tailwind.config.ts`. shadcn/ui variables should point to these tokens.

```css
:root {
  /* Primary */
  --primary-50:#F4F9EC; --primary-100:#E8F3DA; --primary-200:#D2E8B5; --primary-300:#B4D88A;
  --primary-400:#9CC471; --primary-500:#7BB042; --primary-600:#6A9E36; --primary-700:#4F8221;
  --primary-800:#3F6B1A; --primary-900:#2F5212; --primary-950:#1F3A0B;
  /* Secondary */
  --secondary-50:#FEF8E7; --secondary-100:#FDF0CC; --secondary-200:#FBE29A; --secondary-300:#F9D56B;
  --secondary-400:#F7C74A; --secondary-500:#F5B82E; --secondary-600:#E6A71A; --secondary-700:#C98F0E;
  --secondary-800:#B27800; --secondary-900:#8A5A00; --secondary-950:#5C3C00;
  /* Neutral */
  --neutral-0:#FFFFFF; --neutral-50:#F8F8F8; --neutral-100:#F2F2F2; --neutral-200:#D9D9D9;
  --neutral-300:#BDBDBD; --neutral-400:#8A8A8A; --neutral-500:#767676; --neutral-600:#5C5C5C;
  --neutral-700:#4A4A4A; --neutral-800:#333333; --neutral-850:#1A1A1A; --neutral-900:#000000;
  /* Functional */
  --error-100:#FCE8E6; --error-600:#B3261E; --error-700:#9A1F18; --error-800:#7A1812;
  --info-100:#E6F0FA; --info-600:#1F5FA8;

  /* Semantic */
  --bg-page:#FFFFFF; --bg-tint:var(--primary-50); --bg-muted:var(--neutral-100);
  --bg-brand:var(--primary-500); --bg-brand-deep:var(--primary-950); --bg-inverse:var(--neutral-800);
  --text-strong:#000000; --text-default:var(--neutral-800); --text-muted:var(--neutral-600);
  --text-placeholder:var(--neutral-500); --text-brand:var(--primary-800); --text-on-brand:#000000;
  --text-inverse:#FFFFFF; --text-warning:var(--secondary-900); --text-danger:var(--error-600);
  --border-subtle:var(--neutral-200); --border-control:var(--neutral-400);
  --border-strong:var(--neutral-800); --border-focus:#000000;

  /* Type: major third, base 12px */
  --font-heading:'Space Grotesk',system-ui,sans-serif; --font-body:'Roboto',system-ui,sans-serif;
  --text-0:0.75rem; --text-1:0.9375rem; --text-2:1.1875rem; --text-3:1.4375rem; --text-4:1.8125rem;
  --text-5:2.3125rem; --text-6:2.875rem; --text-7:3.5625rem; --text-8:4.5rem; --text-9:5.5625rem;

  /* Radius */
  --radius-xs:4px; --radius-sm:6px; --radius-md:8px; --radius-lg:12px; --radius-xl:16px;
  --radius-2xl:24px; --radius-full:999px;

  /* Elevation */
  --shadow-xs:0 1px 2px rgb(31 58 11 / 0.06);
  --shadow-sm:0 1px 3px rgb(31 58 11 / 0.10), 0 1px 2px rgb(31 58 11 / 0.06);
  --shadow-md:0 4px 8px -2px rgb(31 58 11 / 0.10), 0 2px 4px -2px rgb(31 58 11 / 0.06);
  --shadow-lg:0 12px 24px -6px rgb(31 58 11 / 0.14), 0 4px 8px -4px rgb(31 58 11 / 0.08);
  --shadow-xl:0 24px 48px -12px rgb(31 58 11 / 0.22);
  --shadow-inset:inset 0 1px 2px rgb(0 0 0 / 0.12);
  --ring-focus:0 0 0 2px #FFFFFF, 0 0 0 4px #000000;
  --ring-focus-inverse:0 0 0 2px #333333, 0 0 0 4px #F5B82E;

  /* Motion */
  --duration-fast:120ms; --duration-base:200ms; --duration-slow:320ms; --duration-reveal:600ms;
  --ease-standard:cubic-bezier(0.2, 0, 0, 1); --ease-out:cubic-bezier(0, 0, 0.2, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast:0ms; --duration-base:0ms; --duration-slow:0ms; --duration-reveal:0ms; }
}
```

Fonts (Next.js): load `Space_Grotesk` (500, 600, 700) and `Roboto` (400, 500, 700) with `next/font/google`, `display: 'swap'`, `subsets: ['latin']`, and expose them as `--font-heading` and `--font-body`.

---

## 18. Build order

1. Tokens, fonts and base styles (section 17).
2. Core components: Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Chip, Status chip, Alert, Toast, Modal, Dropdown menu, Tooltip, Skeleton, Tabs and pills, Accordion, Pagination, Table.
3. Layout: Container, Section (with band variants), Header, Mobile menu, Footer.
4. Content components: Hero, Facts strip, Split section, Product card, Blog card, Testimonial card, Project accordion, CTA band, Contact form.
5. Pages and admin screens, assembled only from the components above.

Before merging any new component, check: tokens only (no raw hex or px outside this file), all states built, keyboard works, contrast pairs come from section 2.8.