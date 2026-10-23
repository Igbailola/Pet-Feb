"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import type { ButtonSize, ButtonVariant } from "./button-styles";
import { cn, type PreviewState } from "./cn";

/**
 * Dropdown menu: docs/design-system.md section 10.
 * Keyboard: arrows move, Home/End jump, Enter or Space selects, Esc closes and returns focus,
 * typing jumps to the next matching item (type-ahead). Clicking outside closes.
 */

export type MenuItem = {
  type?: "item";
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  /** Pass true or false to make the item a selectable option (shows a check when true). */
  selected?: boolean;
  onSelect?: () => void;
};
export type MenuGroup = { type: "group"; id: string; label: string };
export type MenuDivider = { type: "divider"; id: string };
export type MenuEntry = MenuItem | MenuGroup | MenuDivider;

export type DropdownMenuProps = {
  label: string;
  items: MenuEntry[];
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  leadingIcon?: ReactNode;
  /** Which edge of the trigger the panel lines up with. */
  align?: "start" | "end";
  /** Start open (used by the design-system page to show the open panel). */
  defaultOpen?: boolean;
  /** Show a hover/focus/active state on the trigger without interaction. */
  triggerPreview?: PreviewState;
  className?: string;
};

const itemBase =
  "flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-1 leading-[1.3] outline-none " +
  "transition-colors duration-(--duration-fast) ease-standard focus-visible:shadow-[inset_0_0_0_2px_var(--border-focus)]";

export function DropdownMenu({
  label,
  items,
  triggerVariant = "outline",
  triggerSize = "md",
  leadingIcon,
  align = "start",
  defaultOpen = false,
  triggerPreview,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ text: "", timer: 0 as unknown as ReturnType<typeof setTimeout> });
  const menuId = useId();

  const getItems = useCallback(
    () => Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)') ?? []),
    [],
  );

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Close on outside pointer press.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const focusItem = (index: number) => {
    const list = getItems();
    if (!list.length) return;
    list[(index + list.length) % list.length].focus();
  };

  const openAndFocus = (which: "first" | "last") => {
    setOpen(true);
    // Wait for the panel to mount, then move focus into it.
    requestAnimationFrame(() => focusItem(which === "first" ? 0 : -1));
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAndFocus("first");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAndFocus("last");
    }
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = getItems();
    const current = list.indexOf(document.activeElement as HTMLButtonElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(current + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        focusItem(current - 1);
        return;
      case "Home":
        event.preventDefault();
        focusItem(0);
        return;
      case "End":
        event.preventDefault();
        focusItem(-1);
        return;
      case "Escape":
        event.preventDefault();
        close(true);
        return;
      case "Tab":
        setOpen(false);
        return;
    }

    // Type-ahead: letters build a prefix that jumps to the next matching item.
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      clearTimeout(typeahead.current.timer);
      typeahead.current.text += event.key.toLowerCase();
      typeahead.current.timer = setTimeout(() => {
        typeahead.current.text = "";
      }, 500);
      const text = typeahead.current.text;
      const ordered = [...list.slice(current + 1), ...list.slice(0, current + 1)];
      const match = ordered.find((el) => el.textContent?.trim().toLowerCase().startsWith(text));
      match?.focus();
    }
  };

  const select = (item: MenuItem) => {
    item.onSelect?.();
    close(true);
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <Button
        ref={triggerRef}
        variant={triggerVariant}
        size={triggerSize}
        leadingIcon={leadingIcon}
        preview={triggerPreview}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        trailingIcon={
          <ChevronDown
            aria-hidden="true"
            size={20}
            strokeWidth={1.75}
            className={cn(
              "transition-transform duration-(--duration-base) ease-standard",
              open && "rotate-180",
            )}
          />
        }
      >
        {label}
      </Button>

      {open && (
        <div
          ref={panelRef}
          id={menuId}
          role="menu"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onPanelKeyDown}
          className={cn(
            "absolute top-full z-1000 mt-2 max-h-80 w-max min-w-full overflow-y-auto rounded-lg border border-line bg-neutral-0 p-1 shadow-lg",
            "animate-[ds-menu-in_var(--duration-fast)_var(--ease-out)]",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((entry) => {
            if (entry.type === "divider") {
              return <div key={entry.id} role="separator" className="my-1 h-px bg-line" />;
            }
            if (entry.type === "group") {
              return (
                <div
                  key={entry.id}
                  role="presentation"
                  className="px-3 py-2 font-heading text-0 leading-[1.2] font-semibold tracking-[0.08em] text-muted uppercase"
                >
                  {entry.label}
                </div>
              );
            }
            const selectable = entry.selected !== undefined;
            return (
              <button
                key={entry.id}
                type="button"
                role={selectable ? "menuitemradio" : "menuitem"}
                aria-checked={selectable ? entry.selected : undefined}
                disabled={entry.disabled}
                tabIndex={-1}
                onClick={() => select(entry)}
                className={cn(
                  itemBase,
                  entry.disabled
                    ? "cursor-not-allowed text-muted"
                    : cn(
                        "cursor-pointer",
                        entry.destructive
                          ? "text-danger hover:bg-error-100 focus:bg-error-100"
                          : "text-body hover:bg-primary-50 focus:bg-primary-50",
                        entry.selected && "bg-primary-100 hover:bg-primary-100 focus:bg-primary-100",
                      ),
                )}
              >
                {entry.icon && (
                  <span aria-hidden="true" className="flex shrink-0 items-center [&>svg]:size-5">
                    {entry.icon}
                  </span>
                )}
                <span className="flex-1">{entry.label}</span>
                {entry.selected && <Check aria-hidden="true" size={20} strokeWidth={2} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
