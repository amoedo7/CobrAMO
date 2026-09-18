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

**Referencia pública / placeholder histórico.** Este repo no contiene actualmente el código fuente del CobrAMO que está en producción y **no debe usarse para desplegar producción**.

`amoedo7/CobrAMO` es el destino/referencia canónica prevista, pero el source observado que coincidía con producción no está publicado en `main` ni tiene provenance remota verificable. Por eso el estado operativo sigue siendo `source_sync_gap`: conocer el destino canónico esperado y conocer la revisión que generó producción son hechos diferentes.

Producción conocida:

https://cobramo.netlify.app/

Hasta recuperar/publicar una fuente verificable y reconciliarla con el deploy servido, este repositorio continúa siendo sólo una referencia pública y el estado de producción no es `PASS`.

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

Recuperar o publicar la fuente que realmente corresponde al deploy productivo, reconciliarla con `amoedo7/CobrAMO` y obtener provenance verificable antes de cualquier evolución de producción.

No se debe reconstruir ni desplegar producción a ciegas desde este placeholder.

## Seguridad

Nunca versionar información de autenticación ni datos bancarios que no estén destinados explícitamente a ser públicos.

---

<div align="center">

**DesarrollAMO** · cobrar tiene que ser simple; verificar tiene que ser serio.

</div>
