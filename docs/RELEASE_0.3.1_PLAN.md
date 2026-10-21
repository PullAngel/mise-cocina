# Entrega 0.3.1

Esta corrección cierra dos inconsistencias visuales y simplifica el traspaso desde ChatGPT sin conectar la aplicación a una API.

## Alcance

1. Las menciones de ingredientes dentro de la receta usan texto limpio, sin sombras, fondos ni efecto de resaltador.
2. Todos los ingredientes comparten el verde tinta `#234632`; un ingrediente faltante usa el rojo `#A82F28`.
3. Inicio permite copiar o descargar el prompt maestro y descargar un ejemplo `.mise.json` válido.
4. El prompt se activa únicamente cuando la persona dice «pasala a Mise» y conserva el contexto y el tono normal de la conversación hasta ese momento.

## Verificación

- revisar Inicio en teléfono vertical y horizontal;
- copiar el prompt y abrir ambos archivos descargados;
- comprobar una receta con ingredientes disponibles y faltantes;
- ejecutar validación TypeScript, pruebas unitarias, compilación web y APK Android.
