<div align="center">

# CobrAMO

### La puerta de cobro de DesarrollAMO

**Un punto claro para conectar propuestas, referencias de pago y confirmaciones verificables.**

[💳 Producción conocida](https://cobramo.netlify.app/) · [🏢 Ver oficina](https://github.com/amoedo7/landings/blob/main/oficinas.html#cobramo) · [🌐 DesarrollAMO](https://desarrollamo.com.ar/)

</div>

---

## Qué es CobrAMO

CobrAMO es la **capa de presentación y referencia de cobro** del ecosistema DesarrollAMO. Su función es simplificar el momento más sensible de una venta: pasar de una propuesta aceptada a un pago identificable y verificable.

```text
propuesta
   ↓
aceptación
   ↓
CobrAMO
   ↓
referencia + método disponible
   ↓
pago
   ↓
verificación externa
   ↓
operación / entrega
```

## Estado de este repositorio

**Placeholder histórico.** Este repo no contiene actualmente el código fuente del CobrAMO que está en producción.

Producción conocida:

https://cobramo.netlify.app/

Hasta reconciliar el source real, este repositorio **no es fuente de verdad y no debe usarse para desplegar producción**.

Esta distinción es deliberada: preferimos documentar una ausencia antes que fingir que el código de GitHub y el sitio desplegado son lo mismo.

### Evidencia de producción observada

El proyecto conectado de Netlify ya quedó identificado de forma estable:

- proyecto: `cobramo`;
- site id: `5eb79ee0-1f9b-4f7c-8ffb-a25d457c55e1`;
- URL HTTPS: `https://cobramo.netlify.app/`;
- snapshot observado el `2026-08-30`: deploy `6a7d6bc1d75069b3afa2f40e`, estado `ready`;
- ese deploy fue publicado con `deploy_source=cli` y no expone `build_id`, `commit_ref` ni `public_repo`.

Por eso ahora conocemos con precisión **qué proyecto de Netlify sirve producción**, pero todavía no conocemos un repositorio o workspace recuperable que sea su source. Ese faltante sigue siendo explícito y no se convierte en PASS por tener el sitio online.

## Principios

- una puerta de cobro reconocible para todo el ecosistema;
- separar métodos por moneda, país y contexto;
- dar prioridad a la acción principal de pagar/cobrar;
- usar referencias trazables;
- no inventar estados `PAYMENT_VERIFIED`;
- apoyar la verificación en evidencia externa real cuando corresponda;
- no actuar como wallet ni custodio de fondos;
- no guardar contraseñas, PIN, OTP, seeds, claves privadas ni API keys.

## Cómo encaja en DesarrollAMO

| Capa | Responsabilidad |
|---|---|
| **Ventas / PresupuestAMO** | crea propuesta y condiciones |
| **CobrAMO** | presenta opciones y referencia de cobro |
| **ContaduríaAMO** | registra y lee el impacto económico |
| **PlataformAMO** | conserva estado, evidencia e historial |
| **Operación** | comienza sólo cuando el estado correcto está verificado |

## Próximo paso técnico

Localizar o recuperar el workspace que realmente genera `cobramo.netlify.app`, compararlo con producción y después decidir si:

1. se migra aquí;
2. este repo queda como alias/documentación; o
3. se crea una fuente canónica nueva y este repo apunta a ella.

No se debe reconstruir producción a ciegas desde este placeholder. El `site_id` documentado permite identificar el proyecto correcto en Netlify durante esa recuperación sin depender del nombre visible o de este chat.

## Seguridad

Nunca versionar información de autenticación ni datos bancarios que no estén destinados explícitamente a ser públicos.

---

<div align="center">

**DesarrollAMO** · cobrar tiene que ser simple; verificar tiene que ser serio.

</div>
