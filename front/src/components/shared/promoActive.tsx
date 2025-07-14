export function isPromoActive(): boolean {
  const now = new Date();
  const start = new Date("2025-07-08");
  const end = new Date("2025-10-07");
  return now >= start && now <= end;
}
