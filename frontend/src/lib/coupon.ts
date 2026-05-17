import { api, ApiError } from "./api";

// Backend response esnek: discountPercent / discount_percent / discount / data.discountPercent ... hepsini dener
export async function validateCoupon(code: string): Promise<number> {
  const result = await api.post<Record<string, unknown>>("/coupons/validate", { code: code.toUpperCase() });
  const r = result as any;
  const pct =
    r.discountPercent ??
    r.discount_percent ??
    r.discount ??
    r.data?.discountPercent ??
    r.data?.discount_percent ??
    r.data?.discount ??
    0;
  return Number(pct) || 0;
}

export { ApiError };
