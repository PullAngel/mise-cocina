# Seguridad

## Versiones atendidas

Mientras Mise esté en alpha, las correcciones se publican sobre la versión más reciente. No se mantienen ramas anteriores con actualizaciones de seguridad.

## Reportar una vulnerabilidad

No publiques detalles explotables en un issue. Usá **Security → Report a vulnerability** en GitHub para enviar un reporte privado. Incluí versión, plataforma, pasos mínimos para reproducir y el impacto observado.

Se priorizan problemas de importación de archivos, ejecución de contenido no confiable, exposición de datos locales, permisos Android y notificaciones. No envíes datos reales de otras personas ni pruebas que afecten servicios ajenos.

## Límites actuales

Mise procesa recetas no confiables con límite de tamaño, validación JSON Schema y comprobaciones de referencias. No interpreta HTML ni scripts incluidos en una receta. La revisión vigente está en [docs/SECURITY_INPUTS.md](docs/SECURITY_INPUTS.md).
