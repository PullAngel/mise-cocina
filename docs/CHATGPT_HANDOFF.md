# Contrato de traspaso con ChatGPT

## Objetivo

La conversación culinaria sigue siendo libre. Cuando la receta queda decidida, ChatGPT la consolida en `mise.recipe` 1.2 para que Mise pueda mostrarla sin volver a interpretar prosa y sin usar una API.

## Entrega

La opción preferida es `nombre-de-receta.mise.json`. La alternativa universal es:

```text
---MISE/1---
{"format":"mise.recipe","version":"1.2", ...}
---END-MISE---
```

Se puede descargar, abrir, compartir o copiar. Mise extrae el JSON, valida el esquema y comprueba identificadores, ingredientes, componentes y dependencias. Solo una revisión aceptada reemplaza la sesión.

## Información que alimenta la interfaz

- `ingredients[].kind`: símbolo semántico; el color verde es común a todos los ingredientes.
- `ingredients[].amount` y `scaling`: pestaña de ingredientes y cambio de porciones.
- `components[].role`: color estable para la parte del plato y sus pasos.
- `steps[].shortLabel`: texto breve del punto de control.
- `steps[].action` y `amounts`: cuerpo completo del paso.
- `startWhen` y `doneWhen`: señales que evitan depender del reloj.
- `timer`: control preparado que siempre inicia la persona.
- `dependsOn` y `canRunWith`: relaciones para entender el trabajo paralelo.
- `avoid` y `rescues`: información extra local.
- `voice`: audio breve.

El orden de `steps` debe poder leerse de principio a fin. Las relaciones paralelas agregan contexto, pero no cambian el documento ni obligan a confirmar.

## Compatibilidad

El esquema acepta 1.0, 1.1 y 1.2. En versiones anteriores Mise infiere con prudencia los roles más comunes a partir del nombre de la estación y usa `other` cuando no hay una coincidencia clara. Las nuevas entregas deben usar 1.2 y declarar `components[].role`.

El contrato formal está en [el esquema](../schema/mise-recipe.schema.json), el ejemplo completo en [pollo con salsa de ostras](../examples/pollo-ostras.mise.json) y el prompt maestro copiable en [instrucciones para ChatGPT](../prompts/instrucciones-chatgpt-mise.txt). La pantalla de Inicio permite copiarlo o descargarlo junto al ejemplo JSON. El prompt solo entra en acción al decir «pasala a Mise», así que no cambia la conversación culinaria cotidiana.
