export const PRODUCTS = Object.freeze({
  "cv-pdf-profesional": Object.freeze({
    sku: "cv-pdf-profesional",
    title: "CV PDF profesional",
    description: "Diseño profesional, PDF listo para enviar o imprimir y 1 revisión.",
    currency: "ARS",
    amount: "30000.00",
  }),
});

export function publicProducts() {
  return Object.values(PRODUCTS).map(({ sku, title, description, currency, amount }) => ({
    sku, title, description, currency, amount,
  }));
}

export function getProduct(sku) {
  return PRODUCTS[String(sku || "")] || null;
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export function validEmail(value) {
  if (value == null || value === "") return true;
  const email = String(value).trim();
  if (email.length > 254 || email.includes(" ")) return false;
  const at = email.indexOf("@");
  return at > 0 && at < email.length - 3 && email.slice(at + 1).includes(".");
}

export async function mpRequest(path, token, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("accept", "application/json");
  headers.set("authorization", "Bearer " + token);
  if (init.body) headers.set("content-type", "application/json");
  return fetch("https://api.mercadopago.com" + path, { ...init, headers });
}

export function publicOrder(order) {
  return {
    id: order?.id || null,
    status: order?.status || null,
    status_detail: order?.status_detail || null,
    external_reference: order?.external_reference || null,
    total_amount: order?.total_amount || null,
    total_paid_amount: order?.total_paid_amount || null,
    currency: order?.currency || null,
    accredited: order?.status === "processed" && order?.status_detail === "accredited",
  };
}

function parseSignature(header) {
  const parts = {};
  for (const piece of String(header || "").split(",")) {
    const index = piece.indexOf("=");
    if (index < 1) continue;
    parts[piece.slice(0, index).trim()] = piece.slice(index + 1).trim();
  }
  return parts;
}

function hexBytes(value) {
  const hex = String(value || "");
  if (hex.length !== 64) return null;
  const bytes = new Uint8Array(32);
  for (let index = 0; index < 32; index += 1) {
    const byte = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
    if (Number.isNaN(byte)) return null;
    bytes[index] = byte;
  }
  return bytes;
}

export async function verifyWebhookSignature({ signature, requestId, dataId, secret }) {
  const parts = parseSignature(signature);
  const provided = hexBytes(parts.v1);
  if (!parts.ts || !provided || !dataId || !secret) return false;

  let manifest = "id:" + String(dataId).toLowerCase() + ";";
  if (requestId) manifest += "request-id:" + requestId + ";";
  manifest += "ts:" + parts.ts + ";";

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  return crypto.subtle.verify("HMAC", key, provided, encoder.encode(manifest));
}
