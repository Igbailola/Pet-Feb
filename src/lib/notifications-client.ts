"use client";

const STORAGE_KEY = "petfeb_dismissed_notifications";
const EVENT_NAME = "petfeb_notifications_changed";

/**
 * Retrieves the list of dismissed attention task / notification IDs from localStorage.
 */
export function getDismissedNotificationIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Dismisses a single notification / attention task ID.
 */
export function dismissNotification(id: string): void {
  if (typeof window === "undefined") return;
  const current = getDismissedNotificationIds();
  if (!current.includes(id)) {
    const next = [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { dismissedIds: next } }));
  }
}

/**
 * Dismisses multiple notification / attention task IDs at once.
 */
export function dismissAllNotifications(ids: string[]): void {
  if (typeof window === "undefined") return;
  const current = new Set(getDismissedNotificationIds());
  ids.forEach((id) => current.add(id));
  const next = Array.from(current);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { dismissedIds: next } }));
}

/**
 * Restores all cleared notifications.
 */
export function restoreAllNotifications(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { dismissedIds: [] } }));
}

/**
 * Restores a specific cleared notification.
 */
export function restoreNotification(id: string): void {
  if (typeof window === "undefined") return;
  const current = getDismissedNotificationIds();
  const next = current.filter((item) => item !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { dismissedIds: next } }));
}

/**
 * Subscribes to changes in dismissed notifications across tabs and components.
 */
export function subscribeToNotificationChanges(
  callback: (dismissedIds: string[]) => void
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{ dismissedIds: string[] }>;
    const ids = customEvent.detail?.dismissedIds || getDismissedNotificationIds();
    callback(ids);
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}
