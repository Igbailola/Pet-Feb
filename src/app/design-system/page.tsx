import type { Metadata } from "next";
import {
  ArrowRight,
  Copy,
  Mail,
  Pencil,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Alert } from "@/components/ui/alert";
import { Button, IconButton } from "@/components/ui/button";
import type { ButtonVariant } from "@/components/ui/button-styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { DropdownMenu, type MenuEntry } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Radio } from "@/components/ui/radio";
import { SelectField } from "@/components/ui/select-field";
import { STATUS_BY_TONE, StatusChip, type StatusTone } from "@/components/ui/status-chip";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip } from "@/components/ui/tooltip";
import { ColorSwatch } from "./color-swatch";

export const metadata: Metadata = {
  title: "Design system | Petfeb",
  description: "Visual check of every Petfeb design token and UI component, with every state.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ layout helpers */

const sections = [
  ["colour", "Colour"],
  ["type", "Type"],
  ["shape", "Radius, shadow, focus"],
  ["buttons", "Buttons"],
  ["fields", "Inputs"],
  ["controls", "Checkbox, radio, toggle"],
  ["chips", "Chips and status"],
  ["alerts", "Alerts"],
  ["overlays", "Dropdown and tooltip"],
] as const;

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line py-12 md:py-16">
      <h2 id={`${id}-title`} className="text-4 leading-[1.15] font-bold tracking-[-0.01em] text-strong md:text-6">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-[56ch] text-2 leading-[1.6] text-muted">{intro}</p>}
      <div className="mt-10 flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-3 leading-[1.3] font-semibold text-strong">{title}</h3>
        {note && <p className="max-w-[68ch] text-1 leading-[1.6] text-muted">{note}</p>}
      </div>
      {children}
    </div>
  );
}

/** A labelled demo cell. */
function Cell({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className ?? ""}`}>
      <span className="text-0 leading-[1.3] font-medium tracking-[0.01em] text-muted">{label}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ data */

const rampSteps = {
  primary: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  secondary: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
  neutral: ["0", "50", "100", "200", "300", "400", "500", "600", "700", "800", "850", "900"],
} as const;

const functionalTokens = ["error-100", "error-600", "error-700", "error-800", "info-100", "info-600"];

const semanticBackgrounds = ["bg-page", "bg-tint", "bg-muted", "bg-brand", "bg-brand-deep", "bg-inverse"];
const semanticText = [
  "text-strong",
  "text-default",
  "text-muted",
  "text-placeholder",
  "text-brand",
  "text-on-brand",
  "text-inverse",
  "text-warning",
  "text-danger",
];
const semanticBorders = ["border-subtle", "border-control", "border-strong", "border-focus"];

/** Literal class names so Tailwind can see them. */
const typeScale = [
  { token: "text-0", px: "12", sample: "text-0" },
  { token: "text-1", px: "15", sample: "text-1" },
  { token: "text-2", px: "19", sample: "text-2" },
  { token: "text-3", px: "23", sample: "text-3" },
  { token: "text-4", px: "29", sample: "text-4" },
  { token: "text-5", px: "37", sample: "text-5" },
  { token: "text-6", px: "46", sample: "text-6" },
  { token: "text-7", px: "57", sample: "text-7" },
  { token: "text-8", px: "72", sample: "text-8" },
  { token: "text-9", px: "89", sample: "text-9" },
] as const;
const typeScaleClass: Record<(typeof typeScale)[number]["token"], string> = {
  "text-0": "text-0",
  "text-1": "text-1",
  "text-2": "text-2",
  "text-3": "text-3",
  "text-4": "text-4",
  "text-5": "text-5",
  "text-6": "text-6",
  "text-7": "text-7",
  "text-8": "text-8",
  "text-9": "text-9",
};

const buttonVariants: { variant: ButtonVariant; label: string; dark?: boolean }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary (amber)" },
  { variant: "outline", label: "Outline" },
  { variant: "dark", label: "Dark" },
  { variant: "deep", label: "Deep green" },
  { variant: "ghost", label: "Ghost / link" },
  { variant: "destructive", label: "Destructive" },
  { variant: "light", label: "Light", dark: true },
  { variant: "outline-inverse", label: "Outline on dark", dark: true },
];

const toneLabels: Record<StatusTone, string> = {
  neutral: "Neutral",
  info: "Info",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
};

const menuItems: MenuEntry[] = [
  { type: "group", id: "g-actions", label: "Actions" },
  { id: "edit", label: "Edit", icon: <Pencil /> },
  { id: "copy", label: "Duplicate", icon: <Copy /> },
  { id: "settings", label: "Settings", icon: <Settings /> },
  { id: "disabled", label: "Archive (unavailable)", disabled: true },
  { type: "divider", id: "d1" },
  { id: "delete", label: "Delete", icon: <Trash2 />, destructive: true },
];

const sortItems: MenuEntry[] = [
  { type: "group", id: "g-sort", label: "Sort by" },
  { id: "newest", label: "Newest", selected: true },
  { id: "price-low", label: "Price: low to high", selected: false },
  { id: "price-high", label: "Price: high to low", selected: false },
  { id: "popular", label: "Most popular", selected: false },
];

/* ------------------------------------------------------------------ page */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-page text-body">
      <header className="sticky top-0 z-100 border-b border-line bg-page/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-3 md:px-8">
          <p className="shrink-0 font-heading text-2 leading-none font-bold text-strong">
            Petfeb <span className="text-link">design system</span>
          </p>
          <nav aria-label="Sections" className="-mx-1 flex min-w-0 gap-1 overflow-x-auto">
            {sections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 rounded-md px-3 py-2 font-heading text-1 leading-[1.2] font-medium text-body outline-none hover:text-link focus-visible:ring-focus"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        <div className="py-12 md:py-16">
          <p className="font-heading text-0 leading-[1.2] font-semibold tracking-[0.08em] text-link uppercase">
            Foundation check
          </p>
          <h1 className="mt-3 text-5 leading-[1.1] font-bold tracking-[-0.015em] text-strong md:text-7">
            Tokens and components
          </h1>
          <p className="mt-4 max-w-[56ch] text-2 leading-[1.6] text-muted">
            Everything below is rendered from the tokens in <code>globals.css</code>. Hover, focus and pressed
            states are shown without interaction using preview hooks. Real hover, keyboard focus and clicks also
            work on every live control.
          </p>
        </div>

        {/* ============================================================ COLOUR */}
        <Section id="colour" title="Colour" intro="Ramps, functional colours and the semantic roles components use.">
          {(["primary", "secondary", "neutral"] as const).map((ramp) => (
            <Group key={ramp} title={`${ramp[0].toUpperCase()}${ramp.slice(1)} ramp`}>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
                {rampSteps[ramp].map((step) => (
                  <ColorSwatch key={step} token={`${ramp}-${step}`} />
                ))}
              </div>
            </Group>
          ))}

          <Group title="Functional" note="Status and validation only. Never decoration.">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {functionalTokens.map((token) => (
                <ColorSwatch key={token} token={token} />
              ))}
            </div>
          </Group>

          <Group title="Semantic: surfaces">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {semanticBackgrounds.map((token) => (
                <ColorSwatch key={token} token={token} />
              ))}
            </div>
          </Group>

          <Group title="Semantic: text" note="Each sample sits on the surface it is meant for.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {semanticText.map((token) => {
                const onDark = token === "text-inverse";
                const onBrand = token === "text-on-brand";
                const surface = onDark ? "bg-inverse" : onBrand ? "bg-brand" : "bg-page";
                const textClass: Record<string, string> = {
                  "text-strong": "text-strong",
                  "text-default": "text-body",
                  "text-muted": "text-muted",
                  "text-placeholder": "text-placeholder",
                  "text-brand": "text-link",
                  "text-on-brand": "text-on-brand",
                  "text-inverse": "text-on-inverse",
                  "text-warning": "text-warning-ink",
                  "text-danger": "text-danger",
                };
                return (
                  <div
                    key={token}
                    className={`flex items-center justify-between gap-3 rounded-md border border-line px-4 py-3 ${surface}`}
                  >
                    <span className={`text-1 leading-[1.3] font-medium ${textClass[token]}`}>Power you can trust</span>
                    <span className={`text-0 ${onDark ? "text-neutral-300" : "text-muted"}`}>{token}</span>
                  </div>
                );
              })}
            </div>
          </Group>

          <Group title="Semantic: borders">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {semanticBorders.map((token) => {
                const borderClass: Record<string, string> = {
                  "border-subtle": "border-line",
                  "border-control": "border-control",
                  "border-strong": "border-outline",
                  "border-focus": "border-line-focus",
                };
                return (
                  <div
                    key={token}
                    className={`flex h-16 items-center justify-center rounded-md border-2 bg-page text-0 text-muted ${borderClass[token]}`}
                  >
                    {token}
                  </div>
                );
              })}
            </div>
          </Group>
        </Section>

        {/* ============================================================ TYPE */}
        <Section
          id="type"
          title="Type"
          intro="Major third scale (ratio 1.25) from a 12px base. Space Grotesk for headings, numbers, buttons and nav. Roboto for everything else."
        >
          <Group title="Font families">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-line p-6">
                <p className="text-0 text-muted">Space Grotesk · 500 / 600 / 700 · --font-heading</p>
                <p className="mt-3 font-heading text-5 leading-[1.1] font-bold text-strong">Power you can trust</p>
                <p className="mt-2 font-heading text-3 leading-[1.3] font-semibold text-body">Solar for homes and shops</p>
                <p className="mt-1 font-heading text-2 leading-[1.3] font-medium text-body">₦567,900 · 5 kVA · 200Ah</p>
              </div>
              <div className="rounded-lg border border-line p-6">
                <p className="text-0 text-muted">Roboto · 400 / 500 / 700 · --font-body</p>
                <p className="mt-3 text-2 leading-[1.6] text-body">
                  Every product is tested for performance, durability and efficiency.
                </p>
                <p className="mt-2 text-1 leading-[1.6] font-medium text-body">Medium weight for emphasis and labels.</p>
                <p className="mt-1 text-1 leading-[1.6] font-bold text-body">Bold weight, used sparingly.</p>
              </div>
            </div>
          </Group>

          <Group title="Scale" note="Pixel values are the rounded major-third steps. 1rem = 16px.">
            <div className="flex flex-col divide-y divide-line rounded-lg border border-line">
              {typeScale.map(({ token, px, sample }) => (
                <div key={token} className="flex flex-col gap-1 px-5 py-4 md:flex-row md:items-baseline md:gap-6">
                  <div className="w-36 shrink-0 text-0 leading-[1.3] text-muted">
                    <span className="font-medium text-strong">{token}</span> · {px}px
                  </div>
                  <p
                    className={`min-w-0 truncate font-heading font-bold leading-[1.1] text-strong ${typeScaleClass[sample]}`}
                  >
                    Power you can trust
                  </p>
                </div>
              ))}
            </div>
          </Group>

          <Group title="Text styles (desktop sizes)" note="Mobile sizes are in the spec, section 3.2.">
            <div className="flex flex-col gap-6 rounded-lg border border-line p-6">
              <p className="font-heading text-8 leading-[1.05] font-bold tracking-[-0.02em] text-strong uppercase">
                Display
              </p>
              <p className="font-heading text-7 leading-[1.1] font-bold tracking-[-0.015em] text-strong">H1 Page title</p>
              <p className="font-heading text-6 leading-[1.15] font-bold tracking-[-0.01em] text-strong">H2 Section title</p>
              <p className="font-heading text-5 leading-[1.2] font-semibold tracking-[-0.005em] text-strong">H3 Sub-section</p>
              <p className="font-heading text-4 leading-[1.25] font-semibold text-strong">H4 Card group title</p>
              <p className="font-heading text-3 leading-[1.3] font-semibold text-strong">H5 Card title</p>
              <p className="font-heading text-2 leading-[1.3] font-semibold text-strong">H6 Small heading</p>
              <p className="max-w-[56ch] text-2 leading-[1.6] text-body">
                Body L, the lead paragraph. Discover a wide range of high-quality solar panels, inverters and
                batteries.
              </p>
              <p className="max-w-[68ch] text-1 leading-[1.6] text-body">
                Body. Every product is tested for performance, durability and efficiency, giving you reliable
                clean energy you can trust.
              </p>
              <p className="text-1 leading-[1.6] font-medium text-body">Body strong</p>
              <p className="text-1 leading-[1.3] font-medium text-body">Label</p>
              <p className="text-0 leading-[1.4] tracking-[0.01em] text-muted">Caption · helper text, dates, Min. order 1 unit</p>
              <p className="font-heading text-0 leading-[1.2] font-semibold tracking-[0.08em] text-link uppercase">
                Overline
              </p>
              <p className="font-heading text-1 leading-[1.2] font-medium text-body">Nav link</p>
              <p className="font-heading text-3 leading-none font-bold text-strong tabular-nums">₦567,900</p>
              <p className="font-heading text-5 leading-none font-bold tracking-[-0.01em] text-strong tabular-nums">
                3k+
              </p>
            </div>
          </Group>
        </Section>

        {/* ============================================================ SHAPE */}
        <Section id="shape" title="Radius, shadow, focus">
          <Group title="Radius">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {[
                ["radius-xs · 4", "rounded-xs"],
                ["radius-sm · 6", "rounded-sm"],
                ["radius-md · 8", "rounded-md"],
                ["radius-lg · 12", "rounded-lg"],
                ["radius-xl · 16", "rounded-xl"],
                ["radius-2xl · 24", "rounded-2xl"],
                ["radius-full", "rounded-full"],
              ].map(([label, cls]) => (
                <Cell key={label} label={label}>
                  <div className={`h-20 border border-neutral-700 bg-primary-100 ${cls}`} />
                </Cell>
              ))}
            </div>
          </Group>

          <Group title="Elevation">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ["shadow-xs", "shadow-xs"],
                ["shadow-sm", "shadow-sm"],
                ["shadow-md", "shadow-md"],
                ["shadow-lg", "shadow-lg"],
                ["shadow-xl", "shadow-xl"],
                ["shadow-inset", "shadow-inset"],
              ].map(([label, cls]) => (
                <Cell key={label} label={label}>
                  <div className={`h-20 rounded-lg bg-neutral-0 ${cls}`} />
                </Cell>
              ))}
            </div>
          </Group>

          <Group title="Focus rings">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg bg-page p-6 ring-1 ring-line">
                <div className="flex size-14 items-center justify-center rounded-md bg-neutral-0 ring-focus text-0">
                  light
                </div>
                <span className="text-1 text-muted">ring-focus: 2px white gap, 4px black ring</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-inverse p-6">
                <div className="flex size-14 items-center justify-center rounded-md bg-neutral-700 text-on-inverse ring-focus-inverse text-0">
                  dark
                </div>
                <span className="text-1 text-neutral-300">ring-focus-inverse: amber ring on dark surfaces</span>
              </div>
            </div>
          </Group>
        </Section>

        {/* ============================================================ BUTTONS */}
        <Section
          id="buttons"
          title="Buttons"
          intro="9 types, 4 sizes. Every type in all six states. Text on green and amber is black, never white."
        >
          <Group title="Types and states" note="Hover, focus and pressed are preview states. Disabled and loading are real.">
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-neutral-50">
                    {["Type", "Default", "Hover", "Focus-visible", "Active", "Disabled", "Loading"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 text-0 leading-[1.3] font-medium text-muted">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buttonVariants.map(({ variant, label, dark }) => (
                    <tr key={variant} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-4 py-3 text-1 leading-[1.3] font-medium text-body">
                        {label}
                        {dark && <span className="block text-0 font-normal text-muted">on dark surface</span>}
                      </th>
                      {(
                        [
                          { key: "default" },
                          { key: "hover", preview: "hover" as const },
                          { key: "focus", preview: "focus" as const },
                          { key: "active", preview: "active" as const },
                          { key: "disabled", disabled: true },
                          { key: "loading", loading: true },
                        ] as const
                      ).map((state) => (
                        <td key={state.key} className={`px-4 py-4 ${dark ? "bg-primary-950" : ""}`}>
                          <Button
                            variant={variant}
                            size="sm"
                            preview={"preview" in state ? state.preview : undefined}
                            disabled={"disabled" in state ? state.disabled : undefined}
                            loading={"loading" in state ? state.loading : undefined}
                          >
                            {label.split(" ")[0]}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Group>

          <Group title="Light on a green band" note="Light and Outline on dark also work on the brand green band.">
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-brand p-6">
              <Button variant="light">View Projects</Button>
              <Button variant="dark">Join Training</Button>
              <Button variant="outline" >Learn more</Button>
            </div>
          </Group>

          <Group title="Focus ring by surface" note="Primary gets ring-focus on light surfaces and ring-focus-inverse on dark ones (surface prop).">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg border border-line p-6">
                <Button preview="focus">Explore products</Button>
                <span className="text-0 text-muted">light surface</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-inverse p-6">
                <Button preview="focus" surface="dark">Explore products</Button>
                <span className="text-0 text-neutral-300">dark surface</span>
              </div>
            </div>
          </Group>

          <Group title="Sizes" note="Heights 28 / 36 / 44 / 52. xs is padded to a 44px hit area on touch screens.">
            <div className="flex flex-wrap items-end gap-4">
              <Cell label="xs · 28">
                <Button size="xs">Add</Button>
              </Cell>
              <Cell label="sm · 36">
                <Button size="sm">Request installation</Button>
              </Cell>
              <Cell label="md · 44 (default)">
                <Button size="md">Add to cart</Button>
              </Cell>
              <Cell label="lg · 52">
                <Button size="lg">Explore products</Button>
              </Cell>
            </div>
          </Group>

          <Group title="With icons" note="Leading icon, trailing arrow for navigation, and the loading spinner replacing the leading icon.">
            <div className="flex flex-wrap items-center gap-4">
              <Button leadingIcon={<ShoppingCart size={20} aria-hidden="true" />}>Add to cart</Button>
              <Button variant="secondary" trailingIcon={<ArrowRight size={20} aria-hidden="true" />}>
                Request installation
              </Button>
              <Button variant="ghost" trailingIcon={<ArrowRight size={20} aria-hidden="true" />}>
                Go to Shop
              </Button>
              <Button loading leadingIcon={<ShoppingCart size={20} aria-hidden="true" />}>
                Adding
              </Button>
              <Button variant="outline" size="sm" leadingIcon={<Zap size={16} aria-hidden="true" />}>
                Spec sheet
              </Button>
            </div>
          </Group>

          <Group title="Full width" note="Primary actions in forms and cards are full width on mobile.">
            <div className="max-w-sm">
              <Button fullWidth>Buy for ₦567,900</Button>
            </div>
          </Group>

          <Group title="Icon buttons" note="44px square (52px large). aria-label is required by the type.">
            <div className="flex flex-wrap items-center gap-3">
              <IconButton aria-label="Search" icon={<Search size={20} aria-hidden="true" />} />
              <IconButton aria-label="Cart" variant="secondary" icon={<ShoppingCart size={20} aria-hidden="true" />} />
              <IconButton aria-label="Account" variant="outline" icon={<User size={20} aria-hidden="true" />} />
              <IconButton aria-label="Account (dark)" variant="dark" icon={<User size={20} aria-hidden="true" />} />
              <IconButton aria-label="Delete" variant="destructive" icon={<Trash2 size={20} aria-hidden="true" />} />
              <IconButton aria-label="Search, hover" preview="hover" icon={<Search size={20} aria-hidden="true" />} />
              <IconButton aria-label="Search, focus" preview="focus" icon={<Search size={20} aria-hidden="true" />} />
              <IconButton aria-label="Search, disabled" disabled icon={<Search size={20} aria-hidden="true" />} />
              <IconButton aria-label="Searching" loading icon={<Search size={20} aria-hidden="true" />} />
              <IconButton aria-label="Search large" size="lg" icon={<Search size={20} aria-hidden="true" />} />
            </div>
          </Group>
        </Section>

        {/* ============================================================ INPUTS */}
        <Section
          id="fields"
          title="Inputs"
          intro="Text input, textarea and select share one frame. Focus is a 2px black border with no layout shift."
        >
          <Group title="Input states">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Input label="Default" placeholder="Enter full name" />
              <Input label="Hover" placeholder="Enter full name" preview="hover" />
              <Input label="Focus" placeholder="Enter full name" preview="focus" />
              <Input label="Filled" defaultValue="Adaeze Okafor" />
              <Input label="Error" defaultValue="adaeze@" error="Enter a valid email address, for example name@example.com." />
              <Input label="Success" defaultValue="adaeze@example.com" success helperText="We will send your quote here." />
              <Input label="Disabled" defaultValue="Port Harcourt" disabled />
              <Input label="Read-only" defaultValue="Order PF-1042" readOnly />
            </div>
          </Group>

          <Group title="Input variants">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Input label="Search" placeholder="Search products" leadingIcon={<Search />} />
              <Input label="Email" type="email" placeholder="name@example.com" required helperText="Used for your receipt." leadingIcon={<Mail />} />
              <Input label="Password" type="password" defaultValue="supersecret" showPasswordToggle />
              <Input label="Phone number" type="tel" prefix="+234" placeholder="801 234 5678" />
              <Input
                label="Subscribe"
                type="email"
                placeholder="Email address"
                trailing={
                  <IconButton
                    aria-label="Subscribe"
                    size="md"
                    className="-mr-3 rounded-l-none"
                    icon={<ArrowRight size={20} aria-hidden="true" />}
                  />
                }
              />
              <Input label="Dense (admin, 40px)" placeholder="Filter orders" dense />
            </div>
          </Group>

          <Group title="Textarea">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Textarea label="Default" placeholder="Type your message" />
              <Textarea label="Focus" placeholder="Type your message" preview="focus" />
              <Textarea label="Filled, with helper" defaultValue="We need a 5 kVA system for a three-bedroom flat." helperText="Tell us about your power needs." />
              <Textarea label="Error" error="Message is required." />
              <Textarea label="Disabled" defaultValue="Locked while the order is processing." disabled />
              <Textarea label="Read-only" defaultValue="Delivery note from dispatch." readOnly />
            </div>
          </Group>

          <Group title="Select" note="Native select inside the input frame, with a trailing chevron.">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SelectField label="Default" defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option>Solar panels</option>
                <option>Inverters</option>
                <option>Batteries</option>
              </SelectField>
              <SelectField label="Hover" preview="hover" defaultValue="Inverters">
                <option>Solar panels</option>
                <option>Inverters</option>
              </SelectField>
              <SelectField label="Focus" preview="focus" defaultValue="Batteries">
                <option>Inverters</option>
                <option>Batteries</option>
              </SelectField>
              <SelectField label="Error" error="Choose a category." defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option>Solar panels</option>
              </SelectField>
              <SelectField label="Success" success defaultValue="Inverters">
                <option>Inverters</option>
              </SelectField>
              <SelectField label="Disabled" disabled defaultValue="Inverters">
                <option>Inverters</option>
              </SelectField>
              <SelectField label="With icon" leadingIcon={<Zap />} defaultValue="5">
                <option value="3">3 kVA</option>
                <option value="5">5 kVA</option>
                <option value="10">10 kVA</option>
              </SelectField>
              <SelectField label="Required" required helperText="Pick one." defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option>Home</option>
                <option>Business</option>
              </SelectField>
            </div>
          </Group>
        </Section>

        {/* ============================================================ CONTROLS */}
        <Section id="controls" title="Checkbox, radio, toggle">
          <Group title="Checkbox">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Checkbox label="Unchecked" />
              <Checkbox label="Hover" preview="hover" />
              <Checkbox label="Focus-visible" preview="focus" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Checked, focus-visible" defaultChecked preview="focus" />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled, checked" disabled defaultChecked />
              <Checkbox label="I accept the Buy Small terms" error="You must accept the terms to continue." />
            </div>
          </Group>

          <Group title="Radio" note="Same name means one choice per group.">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Radio name="r-a" label="Unselected" />
              <Radio name="r-b" label="Selected" defaultChecked />
              <Radio name="r-c" label="Hover" preview="hover" />
              <Radio name="r-d" label="Focus-visible" preview="focus" />
              <Radio name="r-e" label="Disabled" disabled />
              <Radio name="r-f" label="Disabled, selected" disabled defaultChecked />
            </div>
            <fieldset className="mt-2 flex flex-col gap-3 rounded-lg border border-line p-5">
              <legend className="px-2 text-1 font-medium text-body">Do you want an installer?</legend>
              <Radio name="installer" label="Yes, install it for me" defaultChecked />
              <Radio name="installer" label="No, I will arrange my own" />
            </fieldset>
          </Group>

          <Group title="Toggle">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Toggle label="Off" />
              <Toggle label="On" defaultChecked />
              <Toggle label="Hover" preview="hover" />
              <Toggle label="Focus-visible" preview="focus" />
              <Toggle label="Disabled" disabled />
              <Toggle label="Disabled, on" disabled defaultChecked />
            </div>
          </Group>
        </Section>

        {/* ============================================================ CHIPS */}
        <Section id="chips" title="Chips and status">
          <Group title="Chips" note="Height 24, radius-full, 12px Roboto medium.">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="training">Training</Chip>
              <Chip tone="project">Project</Chip>
              <Chip tone="news">News</Chip>
              <Chip tone="featured">Featured</Chip>
              <Chip tone="highlight" icon={<Zap />}>Buy Small</Chip>
              <Chip tone="neutral">Neutral</Chip>
              <Chip tone="count">3</Chip>
              <Chip tone="count">12</Chip>
            </div>
          </Group>

          <Group title="Status chips" note="Always an icon plus a label, never colour alone. All 37 statuses from the spec, grouped by tone.">
            <div className="flex flex-col gap-6">
              {(Object.keys(STATUS_BY_TONE) as StatusTone[]).map((tone) => (
                <div key={tone} className="flex flex-col gap-3">
                  <p className="text-0 leading-[1.3] font-medium text-muted">{toneLabels[tone]}</p>
                  <div className="flex flex-wrap gap-3">
                    {STATUS_BY_TONE[tone].map((status) => (
                      <StatusChip key={status} status={status} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Group>
        </Section>

        {/* ============================================================ ALERTS */}
        <Section id="alerts" title="Alerts" intro="Errors use role=alert. The other tones use role=status.">
          <div className="flex max-w-3xl flex-col gap-4">
            <Alert tone="success" title="Order placed">
              Your payment was received. We will email your receipt shortly.
            </Alert>
            <Alert tone="warning" title="Low stock">
              Only 3 units of the 5 kVA inverter are left at this price.
            </Alert>
            <Alert tone="error" title="Payment failed">
              Your card was declined. Check the details and try again.
            </Alert>
            <Alert tone="info" title="Site assessment">
              A technician will call within one working day to confirm your visit.
            </Alert>
            <Alert tone="info" action={<a href="#alerts" className="outline-none focus-visible:ring-focus rounded-xs">Read how installation works</a>}>
              Text only, with an action link and no title.
            </Alert>
            <Alert tone="success" title="Dismissible" dismissible>
              Use the close button to hide this alert.
            </Alert>
            <Alert tone="error" dismissible>
              Error without a title, dismissible.
            </Alert>
          </div>
        </Section>

        {/* ============================================================ OVERLAYS */}
        <Section
          id="overlays"
          title="Dropdown and tooltip"
          intro="Menu keyboard: arrows move, Home and End jump, Enter or Space selects, Esc closes and returns focus, typing jumps to a matching item."
        >
          <Group title="Dropdown menu" note="The first two are live. The third is held open to show every item type.">
            <div className="grid gap-8 lg:grid-cols-3">
              <Cell label="Live: actions menu">
                <div>
                  <DropdownMenu label="Actions" items={menuItems} leadingIcon={<Settings size={20} aria-hidden="true" />} />
                </div>
              </Cell>
              <Cell label="Live: selectable (sort)">
                <div>
                  <DropdownMenu label="Sort by" items={sortItems} triggerVariant="primary" />
                </div>
              </Cell>
              <Cell label="Trigger states">
                <div className="flex flex-wrap gap-3">
                  <DropdownMenu label="Hover" items={sortItems} triggerPreview="hover" />
                  <DropdownMenu label="Focus" items={sortItems} triggerPreview="focus" />
                </div>
              </Cell>
            </div>
            <div className="mt-2 grid gap-8 lg:grid-cols-2">
              <Cell label="Open: group label, icons, disabled, divider, destructive" className="min-h-[22rem]">
                <div>
                  <DropdownMenu label="Actions" items={menuItems} defaultOpen />
                </div>
              </Cell>
              <Cell label="Open: selectable options, one selected" className="min-h-[22rem]">
                <div>
                  <DropdownMenu label="Sort by" items={sortItems} defaultOpen />
                </div>
              </Cell>
            </div>
          </Group>

          <Group title="Tooltip" note="Hover for 300ms or tab to the button. Tooltips never hold essential information.">
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="Add this item to your cart">
                <Button variant="outline">Hover or focus me</Button>
              </Tooltip>
              <Tooltip content="Delivery within 3 to 5 working days" side="bottom">
                <IconButton aria-label="Delivery info" variant="outline" icon={<Zap size={20} aria-hidden="true" />} />
              </Tooltip>
            </div>
            <div className="grid min-h-40 grid-cols-2 place-items-center gap-6 rounded-lg border border-line p-8 md:grid-cols-4">
              <Tooltip content="Top" side="top" forceOpen>
                <Button variant="outline" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom" side="bottom" forceOpen>
                <Button variant="outline" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left" side="left" forceOpen>
                <Button variant="outline" size="sm">Left</Button>
              </Tooltip>
              <Tooltip content="Right, with a longer message that wraps at 240px maximum width" side="right" forceOpen>
                <Button variant="outline" size="sm">Right</Button>
              </Tooltip>
            </div>
          </Group>
        </Section>
      </main>
    </div>
  );
}
