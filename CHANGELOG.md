# Historial de versiones

Este proyecto sigue versionado semántico mientras el contrato y la aplicación maduran. Las versiones `0.x` pueden cambiar comportamiento o formato con una guía de migración.

## Sin publicar

### Cambiado

- **Licencia del código:** de GPL-3.0-or-later a [PolyForm Noncommercial 1.0.0](LICENSE), de forma prospectiva. El código sigue siendo público y se puede estudiar, modificar y compartir sin fines comerciales; la explotación comercial queda reservada al titular. No es Open Source en el sentido de la OSI. Las versiones 0.4.1 y 0.5.0 conservan la GPL (texto en `LICENSES/GPL-3.0-or-later.txt`). Ver [docs/LICENSING.md](docs/LICENSING.md).
- Las contribuciones requieren aceptar un [CLA](CLA.md). Guía actualizada en [CONTRIBUTING.md](CONTRIBUTING.md), con casilla en la plantilla de pull request y [documento de mantenimiento](docs/CLA_SETUP.md).
- README: la descarga del APK pasa al principio, con pasos para personas no técnicas, y las imágenes de portada son capturas reales del teléfono en lugar de una maqueta.
- La ficha de producto indica doce recetas precargadas, en línea con las pruebas.

### Añadido

- `NOTICE` con el aviso de copyright que la licencia exige conservar, y `LICENSES/` con el texto de la GPL anterior.
- Capturas reales de los cuatro tonos del temporizador y de la cocina en horizontal en `docs/screenshots/`.

### Eliminado

- `website/assets/product-preview.svg`, la maqueta dibujada a mano de la que salía la imagen de portada anterior.

## 0.5.0 — 2026-11-22

### Añadido

- Tutorial de primera vez con resaltes sobre la pantalla real, en tres tramos (inicio, mesada y cocina). Se puede saltar, aparece una vez por pantalla y se repite desde «Cómo funciona Mise» o desde Más opciones en la cocina.
- Preparar IA en cinco pasos numerados, para ChatGPT, Claude, Gemini u otra IA.
- 36 Chefs: experiencia en cocina, prioridad y nivel de guía suman cada uno su propio bloque de instrucciones al prompt (`prompts/chef-experiencia-*.txt`, `prompts/chef-guia-*.txt`), y la pantalla resume el resultado en una frase.
- Capturas reales del teléfono en `docs/screenshots/`.

### Cambiado

- Inicio: «Cocinar algo ya» va primero; botones con un solo lenguaje visual (naranja principal, crema secundario, verde para estados), colores definidos como variables y textos de al menos 11 px.
- Las preguntas del Chef usan botones con aclaración en lugar de menús: «Experiencia en cocina», «¿Qué priorizo?» y «¿Cuánto te guío?».
- Nuevo ícono y pantalla de carga con la marca de Mise.
- Contrato de entrega para IA con forma exacta del JSON, planificación previa, reglas de temporizadores y revisión final.
- Inicio agrega «Copiar «Pasala a Mise»» para chats largos.
- Los errores de importación nombran la propiedad exacta y se aceptan bloques JSON con marcas de código dentro de los delimitadores. Aviso si un paso depende de otro posterior.

### Corregido

- Al abrir la aplicación ya no suenan alarmas de temporizadores vencidos: pasan a «Listo» y no se reprograman.
- Tocar un temporizador terminado silencia su alarma y lo quita de la cinta; la cinta ordena terminados, luego en curso por vencimiento y al final pausados.

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
