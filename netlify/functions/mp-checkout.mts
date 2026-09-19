import { getProduct, json, mpRequest, validEmail } from "../lib/mp.mts";

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const token = Netlify.env.get("MP_ACCESS_TOKEN");
  if (!token) {
    return json({ error: "payments_not_configured" }, 503);
  }

  let input = {};
  try {
    input = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const product = getProduct(input?.sku);
  if (!product) {
    return json({ error: "invalid_product" }, 400);
  }

  const email = String(input?.email || "").trim();
  if (!validEmail(email)) {
    return json({ error: "invalid_email" }, 400);
  }

  const publicUrl = String(
    Netlify.env.get("COBRAMO_PUBLIC_URL") || "https://cobramo.netlify.app"
  ).replace(/\/$/, "");

  const externalReference =
    ("cobramo-" + product.sku + "-" + crypto.randomUUID()).slice(0, 64);

  const payload = {
    type: "online",
    processing_mode: "manual",
    total_amount: product.amount,
    external_reference: externalReference,
    description: product.title,
    ...(email ? { payer: { email } } : {}),
    items: [{
      title: product.title,
      description: product.description,
      quantity: 1,
      unit_measure: "unit",
      unit_price: product.amount,
      total_amount: product.amount,
    }],
    config: {
      notification_url: publicUrl + "/api/mp/webhook",
      online: {
        success_url: publicUrl + "/pagar.html?mp=success",
        failure_url: publicUrl + "/pagar.html?mp=failure",
        pending_url: publicUrl + "/pagar.html?mp=pending",
        auto_return: "approved",
      },
    },
  };

  try {
    const response = await mpRequest("/v1/orders", token, {
      method: "POST",
      headers: { "x-idempotency-key": crypto.randomUUID() },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result?.checkout_url) {
      console.error("mp_checkout_create_failed", response.status, result?.error || "");
      return json({ error: "provider_rejected_order" }, 502);
    }

    return json({
      id: result.id,
      status: result.status,
      external_reference: externalReference,
      checkout_url: result.checkout_url,
    }, 201);
  } catch {
    return json({ error: "provider_unavailable" }, 502);
  }
};

export const config = {
  path: "/api/mp/checkout",
};
