// MindBloom notification utilities

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    return reg;
  } catch {
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

/** Calculate milliseconds until the next occurrence of HH:MM */
export function msUntilTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

export async function scheduleReminder(tag: string, title: string, body: string, timeStr: string) {
  if (typeof window === 'undefined' || Notification.permission !== 'granted') return;
  const reg = await navigator.serviceWorker.ready;
  const delayMs = msUntilTime(timeStr);
  if (reg.active) {
    reg.active.postMessage({ type: 'SCHEDULE_REMINDER', tag, title, body, delayMs });
  }
}

export function cancelScheduledReminder(_tag: string) {
  // SW-based timeouts can't be cancelled directly; we rely on re-scheduling on page load
  // The tag-based deduplication in showNotification handles duplicates
}
