# Interacción, cronómetros y movimiento

## Principios

Mise debe seguir siendo utilizable sin gestos ocultos ni animaciones. Los gestos aceleran acciones frecuentes; los controles visibles siguen disponibles. Desplazarse, consultar, marcar y controlar un reloj son acciones independientes.

La aplicación diferencia dos relojes:

- **Cronómetro global de sesión:** es un contador ascendente iniciado explícitamente por la persona.
- **Temporizadores de pasos:** son cuentas regresivas asociadas a horno, reposos, frituras u otras acciones.

## Apertura y recuperación

Sin receta activa, Mise abre Inicio en silencio. No reproduce sonidos, no programa avisos y no pide permisos. Cualquier notificación huérfana se reconcilia o cancela sin una alerta de prueba.

Con receta activa, Mise recupera directamente la sesión, restaura la presentación a pantalla completa y reconstruye cada temporizador desde el vencimiento persistido. Volver desde otra aplicación, desbloquear el teléfono o girarlo no reinicia relojes ni cambia el paso seleccionado.

## Barra de estado y navegación lateral

La barra superior propia de Mise es mínima en vertical: isotipo, hora y batería. En horizontal se oculta por completo y Cocina utiliza el alto entero. Sustituye visualmente a la barra de estado mientras la aplicación permanece en modo inmersivo.

Cocina es la vista central de una tira de funciones. Un swipe horizontal deliberado permite entrar en vistas vecinas; la primera prevista es Música. Estas vistas no forman parte del recorrido vertical de la receta y nunca cambian el paso seleccionado.

Reglas del gesto:

- el movimiento vertical tiene prioridad y mantiene el scroll de Receta o Recorrido;
- el cambio lateral comienza solo cuando predomina claramente el desplazamiento horizontal;
- un gesto iniciado sobre un control táctil no cambia de vista;
- la vista acompaña al dedo y vuelve a su lugar si no cruza el umbral;
- una vibración breve confirma el cambio completo;
- dos indicadores mínimos, o una pequeña asomada del borde vecino, comunican que existen vistas laterales sin ocupar la barra;
- con movimiento reducido se elimina el arrastre animado y se conserva una transición directa.

La vista Cocina no depende del swipe para ninguna acción esencial. Las funciones vecinas deben ofrecer también una salida visible y accesible.

## Cronómetro global

Su estado inicial es **00:00 · EMPEZAR**. Crear o abrir una receta no lo inicia.

Al tocar EMPEZAR:

- empieza el contador ascendente;
- se registra la hora real de inicio;
- aparece la animación de activación;
- no se programa una notificación de vencimiento.

Mantenerlo pulsado durante aproximadamente 400 ms abre opciones globales:

- pausar o continuar;
- reiniciar;
- ajustar tiempo con valores rápidos o personalizados;
- marcar un hito;
- ocultar sin detener.

Ajustar el tiempo modifica conscientemente el registro de la sesión. Debe conservarse el ajuste para que la duración guardada no parezca una medición automática exacta.

## Temporizadores de pasos

- Tocar un temporizador activo lleva a su paso y comunica visualmente el destino.
- Mantenerlo pulsado abre Pausar, Reiniciar, Ajustar, Cancelar y Volver al paso.
- Sumar o restar tiempo nunca cambia el contenido de la receta.
- Pausar congela la animación y reduce saturación.
- Al vencer, el estado queda visible y estable; no parpadea.
- Durante los últimos cinco segundos el widget hace una oscilación cartoon pequeña. Los números permanecen estables y Reducir movimiento elimina el efecto.

## Zona de widgets

La franja contiene el cronómetro global seguido de todos los temporizadores iniciados, incluidos los pausados y vencidos. Se desplaza horizontalmente y captura ese gesto antes que la navegación lateral de vistas.

- Tocar un temporizador lleva a su paso.
- Mantenerlo cerca de 400 ms abre Pausar/Continuar, ±30 segundos, Reiniciar, Cancelar y Volver al paso.
- Mantener el cronómetro global abre Pausar/Continuar, ±1 minuto y Reiniciar.
- Si no hay temporizadores iniciados, una tarjeta neutra explica dónde iniciarlos.

Las notificaciones ofrecen **Silenciar** y **Ver paso**. Tocar el cuerpo equivale a Ver paso. Silenciar elimina el aviso pero no borra la receta ni el estado del temporizador.

## Color proporcional al avance

La superficie del temporizador usa un degradado orgánico tipo lámpara de lava. Su intensidad depende del **porcentaje consumido**, no de la duración absoluta:

- 0–35 %: suave y frío;
- 35–70 %: más vivo;
- 70–90 %: cálido y atento;
- 90–100 %: intenso y urgente;
- vencido: alerta estable.

Así, diez segundos restantes en un reloj de veinte segundos y cinco minutos restantes en uno de diez minutos comparten el mismo estado visual del 50 %.

La animación usa dos o tres masas de color lentas, con ciclos distintos de 8–14 segundos. No reacciona cada segundo ni cambia de tono bruscamente. El número mantiene contraste alto y no participa de la deformación. El porcentaje también se comunica mediante una barra o arco de progreso y texto; el color nunca es la única señal.

El cronómetro global no tiene porcentaje de finalización. Usa la versión más serena de la paleta y solo cambia entre detenido, activo y pausado.

## Atajos sobre tarjetas

Cada tarjeta conserva un control visible de Pendiente/Hecho y acceso a Opciones. Además ofrece dos zonas de potencia:

### Mitad izquierda

Mantener pulsado cerca de 400 ms abre el menú contextual del paso:

- escuchar;
- ver ingredientes usados;
- controlar el temporizador;
- abrir riesgos y rescates;
- fijar temporalmente el paso.

### Mitad derecha

Un doble toque alterna entre Pendiente y Hecho. No desplaza la receta ni inicia relojes.

Al marcar:

- se dibuja una tilde como un sello de tinta;
- una onda corta recorre el borde;
- la tarjeta reduce ligeramente su contraste;
- una vibración breve confirma.

Al desmarcar, la tinta se retrae y vuelve el contraste original.

El texto visible usa **Pendiente** y **Hecho**. Marcar queda únicamente como término histórico en documentación antigua o nombres internos.

## Flechas del documento

- Un toque sube o baja exactamente un paso.
- Mantener comienza a repetir el salto y avanza cada 1,2 segundos.
- Soltar, cancelar el contacto o llegar a un extremo detiene la repetición.
- Las flechas no significan principio y final del documento.

## Prevención de activaciones accidentales

- La pulsación prolongada se cancela si el dedo inicia desplazamiento.
- El doble toque solo se reconoce cuando ambos contactos terminan dentro de la mitad derecha.
- El movimiento de scroll siempre tiene prioridad.
- Cambiar automáticamente el paso enfocado durante el scroll no produce vibración.
- Un doble toque queda invalidado si cambia la posición de scroll, aunque el navegador no entregue todos los eventos de movimiento intermedios.
- A los 120 ms de una pulsación quieta aparece una indicación tenue de la mitad activa.
- La acción se confirma cerca de los 400 ms con respuesta háptica.
- La primera vez se muestra una explicación breve y descartable.
- Teclado, lector de pantalla y movimiento reducido conservan controles explícitos equivalentes.

## Movimiento

La personalidad toma recursos de animación dibujada de los años treinta sin imitar una obra concreta:

- compresión y rebote muy sutiles;
- sombras como tinta negra desplazada; solo los controles flotantes usan una sombra cálida translúcida;
- menús que se despliegan como lengüetas;
- transiciones con anticipación y un pequeño sobrepaso;
- imperfección controlada en bordes, nunca en texto ni cifras.

Duraciones:

- respuesta táctil: 120–160 ms;
- cambio de estado: 180–240 ms;
- menú: 240–320 ms;
- confirmación de pulsación prolongada: aproximadamente 400 ms.

No hay bucles decorativos permanentes salvo el movimiento muy lento de un temporizador activo. La configuración Reducir movimiento elimina desplazamientos y conserva cambios de contraste.
