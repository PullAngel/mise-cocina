# Lienzo principal de Cocina

## Decisión

La pantalla principal es la receta completa. No es una tarjeta de “paso actual” dentro de un tablero. Todos los pasos forman un documento vertical continuo, con principio y final, que permite desplazarse libremente sin confirmar ni cambiar de modo.

“Scroll infinito” significa lectura continua y sin cortes artificiales. La receta no forma un bucle: al final existe un cierre claro y siempre se puede volver a cualquier paso mediante Recorrido.

## Qué permanece estable

Cada paso conserva esta jerarquía:

1. número y preparación;
2. acción principal en tipografía grande;
3. cantidades usadas en ese momento;
4. señal que determina cuándo está listo;
5. ayudas contextuales que realmente existan.

Marcar sigue siendo una acción secundaria visible. No ocupa todo el ancho, no avanza el documento y no inicia un reloj.

## Cómo puede mutar

El lienzo cambia su composición según los datos del paso, sin crear tipos nuevos de receta:

| Dato existente | Módulo que aparece | Tratamiento |
| --- | --- | --- |
| `amounts` | ingredientes del paso | fichas verdes compactas con cantidad |
| `timer` | superficie térmica | bloque rectangular integrado, no píldora |
| `doneWhen` | punto de cocción | señal sensorial con ámbar contenido |
| `avoid` | cuidado | lengüeta breve antes del riesgo |
| `rescues` | rescate | panel desplegable junto al problema |
| `canRunWith` | en paralelo | referencia pequeña al otro paso |
| `componentId` | continuidad | acento repetido en Receta y Recorrido |

Un módulo ausente no deja un hueco ni un widget vacío. La acción principal conserva siempre la primera lectura.

## Superficie térmica

Cuando hay un temporizador activo, el bloque térmico usa el ancho disponible del paso o de la franja de atención. No adopta forma de cápsula ni compite como ilustración independiente.

Incluye únicamente:

- nombre corto;
- tiempo restante grande;
- progreso estructural;
- estado Pausado, Activo o Vencido.

El color evoluciona por porcentaje consumido. La animación vive detrás de las cifras, es lenta y se detiene con Reducir movimiento.

## Composición horizontal

- Recorrido: aproximadamente 30 %.
- Cocina: aproximadamente 70 % y visualmente continua hasta los bordes de su superficie.
- Ambos paneles desplazan de manera independiente.
- Los relojes activos se integran en Cocina o en una franja compacta de atención; no reducen permanentemente la altura si no existen.

## Composición vertical

- Cocina recibe la mayor parte de la pantalla.
- Una franja de atención muestra el cronómetro global y, si existe, el temporizador activo.
- Recorrido muestra una porción compacta de los pasos cercanos y puede expandirse, pero nunca desplaza por completo a Cocina durante el uso normal.
- Ingredientes permanece accesible desde una acción visible y desde la navegación lateral.

## Relación con el scroll

El paso seleccionado se obtiene de la posición real del documento. Recorrido puede llevar a un paso, pero luego el usuario conserva libertad total. Al rotar se vuelve a ubicar el mismo identificador de paso, no el mismo número de píxeles.

Los gestos sobre una tarjeta se cancelan al comenzar a desplazar. El swipe horizontal entre vistas solo se activa cuando el movimiento horizontal domina claramente al vertical.
