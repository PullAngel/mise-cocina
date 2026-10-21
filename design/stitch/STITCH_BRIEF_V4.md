# Mise — Brief visual V4

## Objetivo

Rediseñar una aplicación Android de cocina cuyo centro es una receta completa con scroll vertical continuo. La persona debe sentir que está dentro de Cocina, no frente a un dashboard de tarjetas.

Usar las capturas actuales para conservar arquitectura y contenido. Usar las propuestas neobrutalistas únicamente como referencia de bordes, sombra dura y tactilidad.

## Composición obligatoria

- Barra mínima: isotipo, hora y batería.
- Horizontal: Recorrido 30 % a la izquierda; Cocina 70 % a la derecha.
- Vertical: Cocina domina; tiempo y pasos próximos ocupan franjas compactas.
- Cocina contiene todos los pasos de principio a fin y se desplaza libremente.
- Recorrido es índice y control, no una segunda receta.
- Sin botones Siguiente o Confirmar.
- Sin navegación inferior.
- Marcar es visible y secundario.

## Lienzo que cambia con el contenido

Diseñar una estructura base de paso y cinco variaciones sobre la misma estructura:

1. acción simple;
2. acción con ingredientes;
3. acción con temporizador térmico;
4. acción con señal sensorial y cuidado;
5. acción con rescate y tarea paralela.

Los módulos ausentes desaparecen sin dejar huecos. La acción siempre mantiene la máxima jerarquía.

## Lenguaje visual

- Fondo lino mate; superficies hueso.
- Tinta casi negra de 2 px.
- Sombra sólida desplazada 3 px solo en controles y superficies elevadas.
- Esquinas redondeadas contenidas; festón reservado para una función clara.
- Salvia: ingrediente disponible y completado.
- Terracota: paso enfocado y calor avanzado.
- Ámbar: señal sensorial o atención intermedia.
- Faltante: rojo terroso más símbolo y texto.
- Texto principal sans, grande y legible. Reducir solo un punto respecto de las capturas reales.

## Tiempo

El temporizador activo es un bloque rectangular integrado, nunca una píldora ni un objeto ilustrativo central. El fondo se mueve lentamente como pigmentos térmicos:

- 0–35 %: salvia gris, miel pálida y crema;
- 35–70 %: miel, ocre y calabaza;
- 70–90 %: terracota, mandarina y cobre;
- 90–100 %: paprika, coral oscuro y un núcleo ámbar;
- vencido: estado estático de alto contraste.

Las cifras permanecen quietas y nítidas. Mostrar también progreso estructural.

## Entrega

Primero producir dos pantallas con idéntico contenido:

1. 844 × 390 horizontal con dos pasos parcialmente visibles en Cocina;
2. 390 × 844 vertical con el paso actual, un temporizador y próximos pasos visibles.

Después producir una hoja de componentes con los cinco tipos de paso, estados del tiempo, ingredientes, marcado y rescate. No generar código todavía.
