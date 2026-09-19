# Mercado Pago productivo en CobrAMO

## Objetivo

Integrar Checkout Pro con Orders API sin exponer secretos en frontend ni aceptar montos enviados por el navegador.

## Estado

Implementado en esta rama:

- catálogo server-side de productos de precio fijo;
- endpoint público de catálogo;
- creación de order real con Checkout Pro / Orders API;
- consulta de estado de order por ID;
- Webhook con validación HMAC de `x-signature`;
- configuración de Netlify Functions;
- secretos excluidos de Git.

Producto fijo inicial:

- `cv-pdf-profesional` — ARS 30.000.

Los servicios publicados como “desde” o “cotización” no deben convertirse automáticamente en un monto final.

## Variables de producción

Configurar en Netlify, scope Functions/Runtime y contexto Production:

- `MP_ACCESS_TOKEN`: Access Token productivo de Mercado Pago.
- `MP_WEBHOOK_SECRET`: clave secreta generada al configurar Webhooks.
- `COBRAMO_PUBLIC_URL=https://cobramo.netlify.app`.

Nunca versionar estas variables.

## Webhook de Mercado Pago

En la aplicación productiva:

1. Webhooks > Configurar notificaciones.
2. Modo productivo.
3. URL: `https://cobramo.netlify.app/api/mp/webhook`.
4. Evento: **Order (Mercado Pago)**.
5. Guardar y copiar la clave secreta a `MP_WEBHOOK_SECRET`.

El webhook sólo acepta eventos firmados y consulta el estado autoritativo de la order en Mercado Pago.

## Estado acreditado

Una venta se considera acreditada únicamente cuando la order devuelva:

- `status = processed`
- `status_detail = accredited`

Una URL de retorno del navegador nunca confirma por sí sola un pago.

## Endpoint de checkout

`POST /api/mp/checkout`

Body:

```json
{
  "sku": "cv-pdf-profesional",
  "email": "cliente@ejemplo.com"
}
```

El backend toma el precio desde el catálogo server-side, crea una order con `X-Idempotency-Key` y devuelve únicamente datos seguros junto con `checkout_url`.

No se aceptan importes enviados por el navegador.
