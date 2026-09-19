import { json, publicProducts } from "../lib/mp.mts";

export default async (req) => {
  if (req.method !== "GET") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const configured = Boolean(Netlify.env.get("MP_ACCESS_TOKEN"));
  return json({
    provider: "Mercado Pago",
    mode: "production",
    configured,
    products: publicProducts(),
  });
};

export const config = {
  path: "/api/mp/catalog",
};
