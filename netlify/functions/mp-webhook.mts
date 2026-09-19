import { json, mpRequest, publicOrder, verifyWebhookSignature } from "../lib/mp.mts";

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const secret = Netlify.env.get("MP_WEBHOOK_SECRET");
  const token = Netlify.env.get("MP_ACCESS_TOKEN");
  if (!secret || !token) {
    return json({ error: "webhook_not_configured" }, 503);
  }

  const url = new URL(req.url);
  let payload = {};
  try {
    payload = await req.json();
  } catch {}

  const dataId = url.searchParams.get("data.id") || payload?.data?.id || "";
  const type = url.searchParams.get("type") || payload?.type || "";
  const signature = req.headers.get("x-signature") || "";
  const requestId = req.headers.get("x-request-id") || "";

  const valid = await verifyWebhookSignature({
    signature,
    requestId,
    dataId,
    secret,
  });
  if (!valid) {
    return json({ error: "invalid_signature" }, 401);
  }
  if (type !== "order" || !String(dataId).startsWith("ORD")) {
    return json({ received: true, ignored: true });
  }

  try {
    const response = await mpRequest("/v1/orders/" + encodeURIComponent(dataId), token);
    const order = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("mp_webhook_lookup_failed", response.status);
      return json({ error: "provider_lookup_failed" }, 502);
    }
    const safe = publicOrder(order);
    console.log("mp_order_webhook", JSON.stringify(safe));
    return json({ received: true, order: safe });
  } catch {
    return json({ error: "provider_unavailable" }, 502);
  }
};

export const config = {
  path: "/api/mp/webhook",
};
