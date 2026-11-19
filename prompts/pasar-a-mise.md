# Prompt para pasar una receta a Mise

La versión canónica y directamente copiable está en [`instrucciones-chatgpt-mise.txt`](instrucciones-chatgpt-mise.txt); es el adaptador de chat más el contrato de entrega, y un test comprueba que no se desincronicen. También se puede copiar o descargar desde Inicio en la aplicación.

1. Adjuntá una vez `schema/mise-recipe.schema.json` y `examples/pollo-ostras.mise.json` a la conversación donde desarrollás la receta, y pegá el contenido de `instrucciones-chatgpt-mise.txt` (o el prompt de un perfil generado en Inicio).
2. Conversá hasta que la receta quede decidida y decí «pasala a Mise».
3. En un chat largo, las instrucciones iniciales quedan lejos y pueden perderse: usá **Copiar pedido de entrega** en Inicio y pegalo junto con «pasala a Mise». Lleva el contrato completo y no depende de mensajes anteriores.
4. Descargá, compartí o copiá la entrega. Mise la valida y, si hay un error, lo nombra con la propiedad exacta: pegáselo al asistente y pedile que corrija solo ese dato.
5. Cociná recorriendo el documento; marcar, escuchar o iniciar un reloj son acciones independientes.

Qué muestra Mise hoy mientras cocinás: `action`, `amounts`, `heat`, `startWhen`, `doneWhen`, `timer.label`, `avoid`, `rescues` y `voice`. `dependsOn`, `canRunWith`, `preferredStation`, `hold` y `finish` se validan y se guardan pero todavía no se muestran, por eso el contrato pide decir el paralelismo y la conservación también con palabras.

Mise 1.2 también acepta archivos 1.0 y 1.1 anteriores. `components[].role` comunica qué parte del plato representa cada estación; `kind` y `shortLabel` mejoran la interfaz.
