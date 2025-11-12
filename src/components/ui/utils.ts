export function cn(...inputs: any[]) {
  return String(inputs.filter(Boolean).join(" "));
}
