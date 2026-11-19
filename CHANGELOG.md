# Historial de versiones

Este proyecto sigue versionado semántico mientras el contrato y la aplicación maduran. Las versiones `0.x` pueden cambiar comportamiento o formato con una guía de migración.

## Sin publicar

### Corregido

- Al abrir la aplicación ya no suenan alarmas de temporizadores vencidos: pasan a «Listo» y no se reprograman.
- Tocar un temporizador terminado silencia su alarma y lo quita de la cinta; la cinta ordena terminados, luego en curso por vencimiento y al final pausados.

### Cambiado

- Contrato de entrega para IA con forma exacta del JSON, planificación previa, reglas de temporizadores y revisión final; cada perfil define su nivel de detalle.
- Inicio agrega «Copiar pedido de entrega» para chats largos.
- Los errores de importación nombran la propiedad exacta y se aceptan bloques JSON con marcas de código dentro de los delimitadores. Aviso si un paso depende de otro posterior.

## 0.4.1 — 2026-09-19

### Corregido

- El scroll cancela candidatos a doble toque y no cambia pasos ni dispara háptica.
- Los símbolos de ingredientes recuperan el color de la parte del plato.
- Las sombras regulares son negras y los controles flotantes conservan su elevación cálida.
- La jerarquía tipográfica y la pantalla de inicio distinguen mejor acciones principales.

### Incluido en 0.4

- Trece recetas precargadas con pasos, señales y rescates.
- Kit de prompts para crear o adaptar un Chef compatible con Mise.
- Contrato `mise.recipe` 1.2 con roles de componentes.
- Lectura global y por paso.
- Temporizadores persistentes, notificaciones y orientación gestionada por la aplicación.

## Estado de distribución

La serie 0.4 es una alpha para pruebas. Los APK publicados antes de una cadena de firma estable se identifican como compilaciones de prueba y pueden requerir desinstalar una versión anterior al cambiar de firma.
