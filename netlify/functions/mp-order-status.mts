import { json, mpRequest, publicOrder } from "../lib/mp.mts";

export default async (req) => {
  if (req.method !== "GET") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const token = Netlify.env.get("MP_ACCESS_TOKEN");
  if (!token) {
    return json({ error: "payments_not_configured" }, 503);
  }

  const url = new URL(req.url);
  const orderId = String(url.searchParams.get("id") || "").trim();
  if (!orderId.startsWith("ORD") || orderId.length > 80) {
    return json({ error: "invalid_order_id" }, 400);
  }

  try {
    const response = await mpRequest("/v1/orders/" + encodeURIComponent(orderId), token);
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return json({ error: "order_not_found" }, response.status === 404 ? 404 : 502);
    }
    return json(publicOrder(result));
  } catch {
    return json({ error: "provider_unavailable" }, 502);
  }
};

export const config = {
  path: "/api/mp/order-status",
};
