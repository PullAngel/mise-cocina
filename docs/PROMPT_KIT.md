# Kit ChatGPT → Mise

Cada versión de Mise incluye un kit compatible con su esquema. En la versión 0.4 el kit usa `mise.recipe` 1.2 y contiene solamente:

1. un prompt elegido o generado en Inicio;
2. el archivo `mise-recipe.schema.json`.

## Crear o transformar un Chef

Inicio pregunta brevemente por experiencia, prioridad y nivel de iniciativa esperado. Con esas respuestas recomienda uno de cuatro perfiles, que también se pueden elegir manualmente:

- **Práctico:** resuelve rápido con lo disponible y pregunta solo lo indispensable;
- **Explorador:** propone combinaciones, variantes y sabores menos obvios;
- **Técnico:** enseña técnicas, señales y causas sin perder el flujo;
- **Calmo:** guía paso a paso, reduce carga mental y anticipa preparaciones.

Las respuestas forman una parte editable del prompt. El contrato de salida es rígido e igual para todos los perfiles.

## Adaptar un chat existente

El adaptador conserva el rol, el tono y la memoria culinaria del chat. Solo añade preparación anticipada, señales sensoriales, trabajo paralelo y la entrega Mise al recibir «pasala a Mise».

## Compatibilidad

Los prompts declaran la versión requerida. Cuando el esquema cambie, la aplicación y este documento se actualizan juntos. El modelo debe usar `components[].role` para identificar la parte del plato; la aplicación decide el color, por lo que el archivo no contiene valores HEX.
