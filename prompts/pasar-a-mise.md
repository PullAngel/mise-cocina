# Prompt para pasar una receta a Mise

La versión canónica y directamente copiable está en [`instrucciones-chatgpt-mise.txt`](instrucciones-chatgpt-mise.txt). También se puede copiar o descargar desde Inicio en la aplicación. Adjuntá una vez `schema/mise-recipe.schema.json` y `examples/pollo-ostras.mise.json` a la conversación donde desarrollás la receta. Después pegá este texto:

> Cuando te diga «pasala a Mise», consolidá la receta final y todas las decisiones útiles de esta conversación en un archivo `.mise.json` compatible con `mise.recipe` 1.2. La conversación puede seguir siendo natural; estructurá solamente la entrega final.
>
> Cada ingrediente debe incluir cantidad total, `kind` y política de escalado. Cada paso debe incluir un `shortLabel` de 2 a 5 palabras para el índice, una acción autosuficiente, cantidades usadas en ese momento, estación, calor si aplica, señal real para empezar, señales sensoriales para reconocer el punto, cronómetro opcional, dependencias, tareas compatibles en paralelo, errores previsibles, rescates y una frase corta para audio.
>
> Ordená `steps` como un recorrido completo de principio a fin. Usá `dependsOn` y `canRunWith` para conservar el trabajo paralelo; no conviertas el orden en confirmaciones obligatorias. No inventes información: guardá las dudas en `context.uncertainties`.
>
> El primer sector debe preparar a la persona para cocinar: equipo, ingredientes que hay que lavar, cortar, rallar o medir y decisiones sobre opcionales. Si recomendás un ingrediente opcional, incluilo en el mise en place y en su primer uso; nunca lo introduzcas recién al final cuando ya sería tarde prepararlo.
>
> Respondé únicamente con un bloque entre `---MISE/1---` y `---END-MISE---`, cuyo interior sea JSON válido contra el esquema adjunto. Si podés crear archivos, entregá además el mismo contenido como `nombre-de-receta.mise.json`.

Uso cotidiano:

1. Conversá hasta que la receta quede decidida.
2. Decí «pasala a Mise».
3. Descargá, compartí o copiá la entrega.
4. Mise la valida y muestra únicamente las dudas relevantes.
5. Cociná recorriendo el documento; marcar, escuchar o iniciar un reloj son acciones independientes.

Mise 1.2 también acepta archivos 1.0 y 1.1 anteriores. `components[].role` comunica qué parte del plato representa cada estación; `kind` y `shortLabel` mejoran la interfaz.
