export default function parsePrice(value: string) {
  if (typeof value === "number") return value;

  let parsed = value.replace(/\s/g, "").replace(/\./g, "");

  parsed = parsed.replace(/,/g, ".");

  return Number(parsed);
}
