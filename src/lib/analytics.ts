/**
 * Pet-Feb Analytics & Conversion Tracking Helper
 * Safely dispatches standard conversion events to window.dataLayer (GA4 / GTM)
 * and custom DOM events without throwing errors if analytics tags are unconfigured.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsEvent =
  | { event: "view_item"; item_id: string; item_name: string; price?: number; category?: string }
  | { event: "add_to_cart"; item_id: string; item_name: string; price: number; quantity?: number }
  | { event: "begin_checkout"; value: number; currency?: string; items_count: number }
  | { event: "purchase"; transaction_id: string; value: number; currency?: string }
  | { event: "buy_small_application_submit"; system_type?: string; estimated_cost?: number }
  | { event: "contact_form_submit"; form_name: string; topic?: string }
  | { event: "whatsapp_click"; location: string; context?: string };

export function trackEvent(payload: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  try {
    // 1. DataLayer Push (GA4 / Google Tag Manager)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        ...payload,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Custom DOM Event for custom telemetry listeners
    window.dispatchEvent(
      new CustomEvent("petfeb:analytics", {
        detail: payload,
      })
    );
  } catch {
    // Fail silently in restricted sandbox environments
  }
}

