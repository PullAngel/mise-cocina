# Plan de implementación

## Objetivo

Convertir la interfaz actual en un lienzo culinario continuo, táctil y estable sin cambiar el formato de receta ni reescribir la aplicación. Cada etapa debe dejar una versión instalable y reversible.

## Estado de la entrega visual B

Implementado en la base actual:

- tokens de Cocina Pulp Cinemascope y superficies con sombra dura;
- H1/H2 condensadas sin efectos tipográficos;
- Cascadia Mono local para H3 y texto menor;
- cabecera mínima con hora y batería reales;
- cambio lateral entre Receta e Ingredientes con prioridad para el scroll vertical;
- cronómetro global manual y persistente;
- fases cromáticas de temporizador calculadas por porcentaje;
- un solo estado de sesión al rotar.

Pendiente de esta misma línea de trabajo: completar los atajos de pulsación larga/doble toque y la validación física final en Samsung Galaxy A55 o Poco X5 Pro.

## Límites para evitar sobreingeniería

- Mantener React, TypeScript, Vite y Capacitor.
- Mantener el estado local actual; no incorporar Redux, router ni máquina de estados.
- Mantener compatibilidad con `mise.recipe` 1.0/1.1 y emitir 1.2; los módulos visuales se derivan de campos existentes.
- Usar CSS para bordes, sombras y movimiento; no agregar una librería de animación.
- No virtualizar la receta: las recetas objetivo son pequeñas y deben permanecer completas en el DOM.
- Extraer componentes solo cuando reduzcan `App.tsx` o permitan verificar una conducta concreta.
- No implementar Música, bóvedas, Lisp ni sincronización en este ciclo.

## Etapa 1 — Marco estable

**Trabajo**

- Reducir la barra superior a isotipo, hora y batería.
- Resolver correctamente pantalla inmersiva y áreas seguras al abrir, volver y rotar.
- Crear tokens CSS para lienzo, tinta, salvia, terracota, ámbar, bordes y sombra dura.
- Aplicar borde de 2 px y sombra de 3 px solo a superficies elevadas o interactivas.

**No cambia**

- estructura de la receta;
- temporizadores;
- importación y persistencia.

**Salida verificable**

Las tres capturas de referencia pueden repetirse sin superposición de Android y con más espacio para Cocina.

## Etapa 2 — Lienzo principal

**Trabajo**

- Separar `RecipeDocument`, `StepSection` y `RoutePanel` de `CookView` solo cuando la siguiente conducta necesite pruebas aisladas; no es requisito previo del rediseño.
- Eliminar el aspecto de “tarjeta dentro de una tarjeta” del documento.
- Mantener la tipografía principal casi igual: reducir solo un punto.
- Integrar ingredientes, señales y rescates dentro de cada sección.
- Hacer que Marcar sea visible pero secundario.

**Salida verificable**

Se puede leer la receta completa de punta a punta, saltar desde Recorrido y volver a desplazar sin bloqueos.

## Etapa 3 — Tiempo contextual

**Trabajo**

- Separar `SessionClock` y `StepTimerSurface`.
- Mostrar la superficie térmica solo cuando corresponda.
- Calcular los estados cromáticos desde el porcentaje consumido.
- Mantener toque para ir al paso y pulsación prolongada para opciones.
- Conservar persistencia y notificaciones existentes.

**Salida verificable**

Un temporizador sobrevive al bloqueo, cambio de aplicación, cierre y reapertura; el diseño cambia con 0 %, 50 %, 85 %, 100 % y vencido.

## Etapa 4 — Composición adaptable

**Trabajo**

- Horizontal: Recorrido 30 % y Cocina 70 %.
- Vertical: Cocina dominante, franja de atención compacta y Recorrido parcial expandible.
- Conservar el mismo paso y estado al rotar.
- Reubicar controles de salto para que nunca cubran texto.

**Salida verificable**

Las mismas acciones funcionan en 390 × 844 y 844 × 390 sin contenido distinto ni pérdida de posición.

## Etapa 5 — Gestos y tactilidad

**Trabajo**

- Pulsación izquierda, doble toque derecho y cancelación por scroll.
- Navegación lateral con detección por dirección dominante.
- Sello de marcado, sombra presionada y háptica breve.
- Alternativa visible y accesible para cada gesto.

**Salida verificable**

Desplazar una receta larga no activa menús, marcas ni cambio de vista accidentalmente.

## Etapa 6 — Pulido y entrega Android

**Trabajo**

- Probar apertura sin receta y recuperación con receta activa.
- Revisar contraste, tamaño táctil, Reduce movimiento y lector de pantalla.
- Probar Samsung Galaxy A55 y Poco X5 Pro en ambas orientaciones.
- Generar capturas reales y ajustar tokens, no estructuras.

**Salida verificable**

APK instalable, sesión recuperable y matriz manual completada sin fallos bloqueantes.

## Verificación mínima por cambio

1. `npm test` para importación, cantidades y cálculo de tiempos.
2. `npm run build` para TypeScript y paquete web.
3. Una receta corta sin reloj y una receta compleja con dos relojes.
4. Rotación vertical → horizontal → vertical.
5. Segundo plano, bloqueo, reapertura y notificación.

No se crearán snapshots visuales frágiles. Las pruebas nuevas cubrirán solo lógica que pueda romper estado, tiempos, selección o gestos.

## Orden de commits

Cada etapa se mantiene en un commit revisable. Si una etapa necesita más de un cambio estructural, se divide antes de continuar. No se mezclan rediseño visual, cambios del formato y capacidades nativas en el mismo commit.

La primera entrega útil termina en la Etapa 2. Las etapas 3 a 5 se incorporan una por una sobre esa base; la Etapa 6 prepara la instalación. Así se puede probar el diseño principal temprano sin comprometer la versión estable actual.
