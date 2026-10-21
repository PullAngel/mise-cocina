# Mise — Brief visual V3 para Stitch

## Objetivo

Explorar una identidad visual original y una interacción táctil memorable para una aplicación Android de cocina. Mise convierte una receta ya decidida en un documento continuo con ayudas activas. No es un dashboard, un recetario social ni un asistente que obliga a confirmar cada paso.

## Contexto

- Samsung Galaxy A55 y Poco X5 Pro.
- Uso principal horizontal 844 × 390 px.
- Debe refluír a vertical 390 × 844 px sin cambiar contenido ni estado.
- Se observa a 1–2 metros, con atención dividida y manos ocupadas.
- Aplicación instalada a pantalla completa.
- Idioma de interfaz: español.

## Arquitectura que debe conservarse

- Receta completa con desplazamiento vertical.
- Índice secundario desplazable que lleva a cualquier sector.
- Marcar no avanza ni bloquea.
- Pestaña Ingredientes siempre disponible.
- Cronómetro global manual y temporizadores de pasos.
- Opciones poco frecuentes en hojas temporales.
- Sin barra inferior persistente.
- Sin botón Confirmar o Siguiente.

## Marco superior y vistas laterales

Durante una receta, la barra superior contiene solamente:

- isotipo mínimo de Mise;
- hora;
- batería.

Eliminar el nombre extendido, el título de la receta, controles musicales y espacios reservados sin función. La barra debe respetar cámara y áreas seguras sin permitir que la barra de Android se dibuje encima. El espacio recuperado amplía la superficie principal.

Cocina es la vista central. Un swipe horizontal permite pasar a funciones vecinas, entre ellas una futura vista Música. Comunicar esa posibilidad con indicadores mínimos o un borde vecino, no con botones grandes ni una navegación persistente. El swipe lateral no debe confundirse con el scroll vertical.

La tipografía grande del paso actual es una decisión aprobada. Reducirla solamente un punto respecto de las capturas reales; no rediseñarla a una escala convencional de aplicación. El scroll y la composición deben sostener la lectura.

## Primera sección de la receta

La receta empieza con **00 · Preparar antes de cocinar**. Resume utensilios, cortes, mediciones, faltantes, opcionales elegidos y tareas adelantables. Forma parte del documento y puede saltarse.

## Cronómetros

### Global

Empieza en **00:00 · EMPEZAR**. No corre al abrir la receta. Su aspecto es neobrutalista, limpio y táctil. Mantener pulsado abre opciones.

### De pasos

Tocar lleva al paso. Mantener pulsado abre opciones. El fondo usa masas cromáticas lentas tipo lámpara de lava. La intensidad depende del porcentaje consumido:

- inicio suave;
- mitad más viva;
- último 30 % cálido;
- último 10 % intenso;
- vencido estable, sin parpadeo.

El número permanece nítido. Mostrar también progreso estructural para no depender del color.

## Gestos sobre tarjetas

- Mitad izquierda + mantener 400 ms: menú contextual.
- Mitad derecha + doble toque: alternar marcado.
- Scroll cancela cualquier gesto.
- Los botones visibles equivalentes permanecen.
- Primera vez: explicación breve.
- Marcar produce una tilde como sello de tinta, onda de borde y vibración corta.

## Lenguaje visual

Base Salvia Mineral y Lino. Ingredientes en verde salvia. Faltantes en coral rojo más símbolo. Señales sensoriales en ámbar. Rescates en terracota.

Cada preparación recibe un acento discreto de color + forma + símbolo. Usar líneas laterales, esquinas, pequeños glifos y repetición; evitar colorear tarjetas completas.

Las relaciones entre pasos se comunican por continuidad visual y proximidad. No llenar la pantalla con flechas o etiquetas técnicas.

## Movimiento

Inspiración original en animación impresa y “rubber hose” de los años treinta, sin copiar personajes, logotipos ni recursos concretos de Cuphead:

- squash y stretch mínimo;
- sombras de tinta desplazada;
- menú como lengüeta;
- pequeño sobrepaso;
- bordes artesanales controlados.

Evitar glassmorphism, gradientes violeta-azul genéricos, ilustraciones decorativas de IA, brillos futuristas y estética de dashboard SaaS.

## Pantallas a explorar

1. Cocina horizontal con receta, índice y dos relojes activos.
2. Estados del cronómetro global.
3. Ingredientes informativo/lista de compras.
4. Inicio sin receta: Importar, Recientes y Bóvedas futura.
5. Adaptación vertical solo después de elegir la dirección horizontal.

## Datos de ejemplo

Usar pollo crocante de tamarindo, batata al horno, jengibre opcional elegido y salsa que puede espesarse demasiado. Mostrar un reloj de fritura, uno de horno y el paso 00 de mise en place.

## Entrega solicitada

Primero, dos variantes de la misma pantalla horizontal con idéntica arquitectura:

- A: mineral, editorial y sobria;
- B: táctil, expresiva y ligeramente caricaturesca.

Después de elegir una, crear estados e interacciones sin cambiar la arquitectura.
