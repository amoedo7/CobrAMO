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

**Referencia pública / placeholder histórico.** Este repo no contiene el código fuente del CobrAMO que está en producción y **no debe usarse para desplegar producción**.

La fuente operativa canónica ya fue identificada en el registro interno de fuentes de DesarrollAMO, pero su reconciliación con el deploy productivo sigue abierta porque el deploy observado no expone provenance suficiente para demostrar qué revisión exacta lo generó.

Producción conocida:

https://cobramo.netlify.app/

Esta distinción es deliberada: conocer la fuente esperada y conocer el deploy servido son hechos diferentes. Hasta verificar su correspondencia, este repositorio continúa siendo sólo una referencia pública y el estado de producción permanece como `drift`, no `PASS`.

### Evidencia pública de producción

- proyecto público conocido: `cobramo`;
- URL HTTPS: `https://cobramo.netlify.app/`;
- el deploy productivo observado fue publicado sin `commit_ref` ni `public_repo` verificables;
- por esa razón no puede atribuirse el contenido live a una revisión concreta sólo por estar online.

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

Reconciliar la fuente canónica con el deploy productivo y obtener provenance verificable antes de cualquier evolución de producción. Este repositorio público debe seguir como referencia mientras esa relación no esté demostrada.

No se debe reconstruir ni desplegar producción a ciegas desde este placeholder.

## Seguridad

Nunca versionar información de autenticación ni datos bancarios que no estén destinados explícitamente a ser públicos.

---

<div align="center">

**DesarrollAMO** · cobrar tiene que ser simple; verificar tiene que ser serio.

</div>
