# Kit ChatGPT → Mise

Cada versión de Mise incluye un kit compatible con su esquema. En la versión 0.4 el kit usa `mise.recipe` 1.2 y contiene solamente:

1. un prompt elegido o generado en Inicio;
2. el archivo `mise-recipe.schema.json`.

## Crear o transformar un Chef

Inicio hace tres preguntas y arma el Chef combinando un bloque de instrucciones por cada respuesta (3 × 4 × 3 = 36 combinaciones posibles):

- **Experiencia en cocina** (`prompts/chef-experiencia-*.txt`): Principiante, Intermedia o Avanzada. Define cuánto explicar y qué técnicas proponer.
- **¿Qué priorizo?** (`prompts/chef-practico.txt`, `chef-explorador.txt`, `chef-tecnico.txt`, `chef-calmo.txt`): Rapidez, Sabor, Técnica o Calma. Define el foco y da nombre al Chef (Práctico, Explorador, Técnico o Calmo).
- **¿Cuánto te guío?** (`prompts/chef-guia-*.txt`): Mucho, Normal o Poco. Define cómo conduce la conversación.

Cada bloque trae un «ajuste al pasar a Mise». Si chocan, la experiencia decide cuánto explicar y la prioridad decide en qué poner el foco. El contrato de salida es rígido e igual para todos: fija la forma exacta del JSON, la planificación previa, el uso de temporizadores (uno por paso) y la revisión final.

**Pedido de entrega.** En chats largos las instrucciones iniciales se alejan. Inicio ofrece «Copiar «Pasala a Mise»», que pega el contrato completo junto con «pasala a Mise».

## Adaptar un chat existente

El adaptador conserva el rol, el tono y la memoria culinaria del chat. Solo añade preparación anticipada, señales sensoriales, trabajo paralelo y la entrega Mise al recibir «pasala a Mise».

## Compatibilidad

Los prompts declaran la versión requerida. Cuando el esquema cambie, la aplicación y este documento se actualizan juntos. El modelo debe usar `components[].role` para identificar la parte del plato; la aplicación decide el color, por lo que el archivo no contiene valores HEX.
