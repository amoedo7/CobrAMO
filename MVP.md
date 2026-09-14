# MVP · CobrAMO

## Situación real
El sitio de producción existe, pero este repositorio todavía no contiene su fuente canónica. Por eso el primer MVP no es “rediseñar CobrAMO”: es **recuperar y reconciliar la fuente sin inventarla**.

## Resultado que debe entregar
Una propuesta aceptada puede convertirse en una referencia de cobro clara, y luego en un estado verificable, sin que CobrAMO custodie fondos ni declare pagos por sí solo.

## Fase 0 · recuperación obligatoria
1. Identificar el proyecto Netlify correcto por site id.
2. Recuperar/snapshotear el deploy fuente cuando sea posible.
3. Comparar producción vs workspace.
4. Elegir fuente canónica.
5. Sólo entonces habilitar cambios/deploys.

## Flujo MVP
1. Recibir referencia de cliente/presupuesto.
2. Detectar país/moneda/contexto.
3. Mostrar métodos disponibles reales.
4. Generar referencia trazable.
5. Llevar al método de pago.
6. Registrar “iniciado”/“reportado”.
7. Verificación externa cambia a “verificado”.
8. PlataformAMO recibe evidencia/estado.

## Criterio de aceptación
- fuente de producción reconciliada;
- ninguna credencial bancaria secreta en repo;
- “pagado/verificado” requiere evidencia externa;
- referencia permite atribuir el pago;
- errores/métodos no disponibles son explícitos.

## Fuera del MVP
- wallet/custodia;
- inventar saldos;
- validar un pago sólo porque el usuario volvió a la página.
