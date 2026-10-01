// Lightweight cn() helper — merges Tailwind classes, no extra deps
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
