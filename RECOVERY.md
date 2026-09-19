# CobrAMO Recovery

## Alcance

Este procedimiento recupera únicamente el estado versionado de este repositorio. CobrAMO declara actualmente que este repo es un placeholder histórico y **no** la fuente de verdad de `cobramo.netlify.app`; por tanto, restaurar este repositorio no equivale a restaurar producción ni a verificar pagos.

## Principios

- No inventar, inferir ni reconstruir estados `PAYMENT_VERIFIED` a partir de este repositorio.
- No copiar secretos, credenciales, PIN, OTP, seeds, claves privadas ni datos bancarios desde backups o historiales hacia Git.
- Si la fuente productiva real no está reconciliada, su recuperación permanece `UNKNOWN`.
- Preferir rollback Git reversible sobre ediciones destructivas.

## Recuperación del repositorio

1. Identificar el último commit conocido bueno en `main` mediante historial Git y evidencia CI.
2. Crear una rama de recuperación desde `main`; no reescribir historia compartida.
3. Restaurar únicamente archivos versionados desde el commit conocido bueno mediante un commit nuevo o revert explícito.
4. Ejecutar el AutoCheck canónico declarado en `.amo`:

   ```sh
   python3 scripts/autocheck.py
   ```

5. Si el check no ejecuta o no existe evidencia suficiente, registrar `UNKNOWN`; no promover a PASS.
6. Fusionar sólo con los gates aplicables en verde y conservar PR/commit como evidencia.

## Producción y pagos

La URL productiva documentada es una referencia observable. Hasta reconciliar qué sistema la construye y despliega, este repo no debe usarse para desplegar, sobrescribir ni declarar recuperada esa superficie.

La recuperación de registros o estados de pago requiere la fuente autoritativa correspondiente y evidencia externa verificable. Este procedimiento no concede autoridad de verificación de pagos.

## Rollback

Si una recuperación introduce regresión, revertir el commit/PR de recuperación y volver a ejecutar el AutoCheck. No borrar evidencia histórica para ocultar el fallo.

## Escalado

Detener la recuperación local y registrar el bloqueo cuando sea necesario tocar producción no reconciliada, secretos, credenciales, datos sensibles, permisos, pagos o una fuente externa cuya autoridad no esté demostrada.
