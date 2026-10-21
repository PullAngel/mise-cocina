# Revisión de producto y experiencia — septiembre de 2026

## Decisión

El boceto se convirtió en una composición adaptable con tres piezas persistentes: documento principal, recorrido secundario y franja de tiempos. Es una sola sesión y una sola posición; girar cambia la distribución, no el contenido.

## Lectura desde tres roles

**Producto.** La tarea central es cocinar una receta nueva sin volver al chat. Se conserva importación, revisión breve, recorrido completo, cantidades y recuperación local. La valoración final, la bodega y las correcciones abiertas quedan fuera de la superficie diaria.

**Diseño.** El documento permite lectura continua y el recorrido ofrece saltos. Las marcas son memoria opcional. Ingredientes obtiene una pestaña real y una gramática de símbolos. Los controles poco frecuentes salen del borde inferior y viven en Opciones.

**Uso en cocina.** Con las manos ocupadas, un barrido vertical, un toque grande o audio resuelven la mayoría de consultas. Los relojes siguen visibles, la orientación se puede fijar desde una esquina y cambiar de aplicación no destruye el estado.

## Decisiones descartadas

- Desplazamiento circular sin principio ni fin: puede desorientar y complica accesibilidad. Se usa un documento continuo con saltos a inicio y final.
- Confirmar para avanzar: introduce decisiones artificiales y bloquea recetas flexibles.
- Barra fija de error y cierre: ocupa el espacio de máxima disponibilidad con acciones ocasionales.
- Evaluación obligatoria al final: no aporta a la ejecución actual.
- Ruido contra keyloggers: pertenece a otro producto y no protege datos ya capturados.

## Prueba de rotación

La receta debe mantener identificador de paso, marcas, porciones y relojes en las transiciones vertical→horizontal→vertical. La posición visual se restaura buscando el paso seleccionado después del cambio de tamaño, en lugar de conservar píxeles incompatibles entre composiciones.

## Revisión aprobada posterior

- El cronómetro global deja de comenzar automáticamente y adopta un estado 00:00 · EMPEZAR.
- Los temporizadores regresivos comunican avance mediante un degradado orgánico cuya intensidad depende del porcentaje consumido.
- Las relaciones entre preparaciones se expresan con continuidad visual derivada de componentes y estaciones existentes; no se amplía el JSON para incorporar flechas decorativas.
- Mantener la mitad izquierda de una tarjeta abre su menú. Un doble toque en la mitad derecha alterna su marca.
- Desplazarse cancela cualquier gesto pendiente.
- Ingredientes y cronómetro global se consideran fuentes de estado compartido.
- La primera sección de la receta es el mise en place, incluyendo decisiones tempranas sobre ingredientes opcionales.
- La barra superior se reduce a isotipo, hora y batería; el espacio recuperado pertenece a la receta.
- Cocina ocupa la posición central de una navegación lateral por swipe. Música queda como primera vista vecina futura y no introduce controles persistentes.
- La tipografía principal mantiene su escala actual y baja solamente un punto.
- Lisp queda registrado como experimento muy futuro, aislado del runtime y de la importación obligatoria.

## Revisión de Stitch V4

- Se conservan bordes entintados, sombra sólida corta y tactilidad de imprenta.
- Cocina vuelve a ser el lienzo principal continuo; el paso actual no se aísla como tarjeta heroica.
- El lienzo puede incorporar módulos derivados de datos existentes y no requiere ampliar el JSON.
- Se descartan barra inferior, carrusel de pasos, botón Marcar a todo lo ancho y decoraciones sin significado.
- El temporizador se integra como superficie rectangular del paso o de atención, no como objeto ilustrado independiente.
- La implementación se divide en entregas instalables y conserva el stack actual.

## Cierre de dirección visual

Se elige la variante **B · Cocina Pulp Cinemascope**, corregida con estas reglas:

- H1 y H2 condensadas, negras, sobrias y en mayúsculas;
- ninguna sombra, extrusión, borde ni adorno sobre letras;
- H3 y texto menor en Cascadia Mono Regular 400, igual al editor de Visor MD Volumen 1;
- falso volumen únicamente en superficies táctiles;
- coral, turquesa y amarillo comunican foco, continuidad y atención sobre marfil y azul carbón;
- movimiento inspirado en animación 1930–50 solo como física breve de interacción.

La cabecera de cocina contiene Mise, hora y batería. Receta e Ingredientes cambian por gesto horizontal o por un control visible equivalente. La hora y batería provienen del dispositivo en Android y degradan de forma segura en web.
