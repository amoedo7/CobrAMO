# CobrAMO

CobrAMO es la **capa de presentación y referencia de cobro** del ecosistema DesarrollAMO: un único lugar desde el que mostrar al cliente métodos de pago disponibles según moneda, país y contexto.

## Estado de este repositorio

**Placeholder histórico.** Este repositorio estaba vacío y **no contiene actualmente el código fuente del CobrAMO que está en producción**.

Producción conocida:

https://cobramo.netlify.app/

Hasta que el código de producción sea vinculado o migrado aquí, este repo **no debe tratarse como fuente de verdad ni usarse para desplegar CobrAMO**.

## Principios de CobrAMO

- una caja/referencia central para el ecosistema AMO;
- separar métodos por moneda y país;
- diferenciar claramente proveedores y cuentas;
- priorizar la acción principal de pagar/cobrar;
- no almacenar contraseñas, PIN, OTP, seeds, claves privadas ni API keys;
- no inventar confirmaciones de pago;
- la verificación de un pago debe apoyarse en evidencia externa real cuando corresponda.

## Próximo paso técnico

Localizar el repositorio o workspace que realmente genera `cobramo.netlify.app`, verificarlo contra producción y recién entonces decidir si se migra aquí o si este repo queda como alias/documentación.

## Seguridad

Nunca versionar datos bancarios que no estén destinados explícitamente a ser públicos, credenciales, tokens o información de autenticación.

---

**DesarrollAMO** · CobrAMO es infraestructura de cobro, no una wallet ni un custodio de fondos.
