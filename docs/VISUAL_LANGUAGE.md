# Lenguaje visual

La dirección vigente es **Cocina Pulp Cinemascope**: pop editorial gastronómico, rotulismo serigráfico y composición animada de mediados de siglo. Es expresiva sin convertir la cocina en un juguete. La identidad vive en el encuadre, el color, las formas y el movimiento; el texto operativo permanece sobrio.

No se usan sombras, contornos, extrusiones ni adornos sobre las letras. El falso volumen pertenece a botones, fichas y superficies.

## Tipografía

- **H1 y H2:** sans condensada, negra y sobria; siempre en mayúsculas. Se permiten tracking negativo moderado y líneas compactas, pero no deformaciones por palabra.
- **H3, etiquetas e instrucciones:** `Cascadia Mono Regular 400`, la misma familia y peso que el modo Edición de Visor MD Volumen 1.
- **Acción predominante de un botón:** la sans condensada de los títulos, con peso 900 y tamaño mayor. Estados y explicaciones secundarias dentro del control permanecen en Cascadia Mono.
- **Números de tiempo:** pueden usar la familia condensada cuando necesitan leerse desde lejos; conservan cifras tabulares.
- **Jerarquía:** el cuerpo nunca imita un afiche letra por letra. Escala, peso y espacio construyen el énfasis.

`CascadiaMono.ttf` se distribuye dentro de la aplicación para mantener el mismo resultado en Android y escritorio. Su licencia SIL Open Font License 1.1 se conserva en `src/assets/fonts/CASCADIA-LICENSE.txt`.

## Materiales y geometría

- lienzo marfil mate y superficies crema;
- tinta estructural azul carbón de 2–3 px;
- sombra sólida de tinta negra de 3–5 px hacia abajo y derecha, sin desenfoque;
- sombra reservada para objetos elevados, seleccionados o pulsables;
- radios contenidos y una única silueta expresiva por función;
- nada de glassmorphism, brillo plástico ni gradientes tecnológicos;
- marcos trapezoidales, óvalos contenidos y diagonales solo cuando ayudan a identificar una función.

No se aplican contorno grueso y sombra a todas las secciones. Hacerlo elimina jerarquía y reduce el área útil.

## Paleta de trabajo

Estos valores son una base para probar en el teléfono, no una paleta cerrada:

| Rol | Base |
| --- | --- |
| lienzo marfil | `#F7EDCF` |
| superficie crema | `#FFF8E5` |
| tinta azul carbón | `#17242A` |
| continuidad secundaria | `#28A5A1` |
| paso Hecho | `#2F8F4E` |
| foco / paso activo | `#F05A47` |
| atención / tiempo | `#F4C84A` |
| rescate / faltante | `#C9475D` |

La superficie térmica combina familias, no una sola interpolación: salvia gris y miel en calma; ocre y calabaza en actividad; cobre y coral en alerta; paprika y rosa oscuro al final. La fase se calcula con el porcentaje consumido, nunca con una cantidad fija de segundos.

## Movimiento

La física toma recursos del cartoon de 1930–50: anticipación corta, impacto y asentamiento. No usa personajes, ojos ni guantes. Un botón presionado ocupa su propia sombra; una marca entra como sello; un cambio de sección puede usar un barrido breve. Todos los efectos duran poco, se cancelan durante scroll y desaparecen con `prefers-reduced-motion`.

## Marco de la aplicación

En vertical, la barra superior usa el menor lenguaje posible: isotipo de Mise, hora y batería. En horizontal desaparece y el lienzo ocupa el alto completo. Hora y batería son información ambiental, no botones.

El nombre completo de Mise puede aparecer en Inicio, pero durante una receta el isotipo basta. Los estados de Android no deben dibujarse encima de esta barra: la aplicación usa modo inmersivo y respeta recortes y áreas seguras.

El texto principal de los pasos conserva la escala grande actual para poder leerse a distancia. Solo se reduce un punto respecto de la implementación observada; el ajuste de contenido se resuelve mediante scroll, espaciado y ayudas visuales, no miniaturizando la instrucción.

## Dos capas, sin ampliar el contrato

Mise comunica relaciones usando datos existentes de la receta. No agrega flechas, etiquetas técnicas ni campos nuevos al archivo solo para decorar la interfaz.

### Capa de objeto

Describe qué parte del plato se está viendo. `components[].role` determina un token estable para principal, salsa, guarnición, ensalada, bebida, postre, terminación u otro:

- ingrediente: símbolo propio dentro de un cuadrado coloreado por parte del plato y un único verde tinta (`#2F684B`) para todos los nombres;
- ingrediente opcional: borde discontinuo;
- ingrediente faltante: rojo (`#A82F28`) más símbolo de ausencia;
- señal sensorial: ámbar;
- rescate: terracota;
- equipo o estación: gris mineral;
- temporizador: superficie cromática proporcional a su avance.

### Capa de preparación

Cada componente ya tiene un identificador y un título. La interfaz le asigna durante la sesión una combinación estable de:

- un acento de color;
- una forma simple;
- un símbolo.

El mismo acento aparece en el índice, el borde de los pasos, los ingredientes usados y los temporizadores asociados. Se limita a cuatro preparaciones prominentes; las restantes reutilizan tonos con formas distintas.

Las menciones de ingredientes dentro del texto operativo no llevan sombras, fondos, subrayados ni efecto de resaltador. Cambia solamente el color de la letra: verde tinta cuando está disponible y rojo cuando está marcado como faltante.

El borde izquierdo de cada paso usa el color de su componente predominante. Al pasar a Hecho, el borde adopta el verde de estado vigente. El color nunca se entrega como HEX en la receta: el JSON aporta el rol y Mise controla la paleta.

Todas las sombras táctiles de botones son tinta negra. Los colores pueden ocupar la superficie o comunicar estado, pero no colorean la sombra. Los cuatro controles flotantes —Ingredientes, orientación, Más y flechas— usan como excepción una sombra cálida parcialmente translúcida para separarse del documento sin parecer otro bloque.

Las relaciones se entienden por repetición visual y proximidad:

- pasos de la misma preparación comparten acento;
- tareas paralelas pueden alinearse o compartir un pequeño símbolo de pares;
- una estación repetida conserva el mismo símbolo de equipo;
- el mise en place aparece antes del primer uso de cada ingrediente.

No se muestran permanentemente textos como “misma sartén”, “pasa a la salsa” o “puede hacerse mientras”. Cuando una relación necesita explicación, se expresa en lenguaje natural dentro del paso o en información adicional.

## Ingredientes

La pestaña Ingredientes implementa dos estados en 0.3:

- disponible;
- faltante.

Los estados de opcionales y el modo Lista de compras quedan para una evolución posterior. La pantalla muestra primero el total completo y después repite los ingredientes agrupados por estación de mise en place.

En modo informativo, cambiar un estado no modifica pasos automáticamente. Mise puede señalar qué pasos usan un faltante, pero no reescribe la receta ni inventa sustituciones.

Una evolución posterior podrá reutilizar esos estados para una lista de compras agrupada por rubro o compartida.

## Mise en place como primer paso

Toda receta nueva comienza con una sección integrada **Preparar antes de cocinar**. No es una ventana previa y no bloquea el recorrido.

Incluye:

- equipo;
- ingredientes que deben lavarse, cortarse, rallarse o medirse;
- decisiones sobre ingredientes opcionales;
- faltantes conocidos;
- tareas que pueden adelantarse;
- preparaciones que conviene dejar para más tarde.

Si un ingrediente opcional será usado, su preparación debe aparecer antes de su primera intervención. Una recomendación tardía nunca introduce por sorpresa algo que debió picarse al comienzo.
