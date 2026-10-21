# Arquitectura

Mise es una aplicación React y TypeScript compilada por Vite. Se instala como PWA y el mismo paquete se integra en Android mediante Capacitor. No tiene backend, cuenta ni credenciales.

## Datos

El contrato canónico es `mise.recipe` 1.2, validado primero con JSON Schema y después mediante comprobaciones de referencias. La versión 1.2 agrega `Component.role` para vincular partes del plato con el lenguaje visual. Sigue siendo opcional para conservar compatibilidad con 1.0 y 1.1; el prompt lo exige en nuevas entregas.

`steps` es la fuente única del documento y del índice. La interfaz no crea dos recorridos. El identificador del paso seleccionado persiste y, durante una rotación, se vuelve a localizar el mismo elemento después de recalcular la composición.

## Persistencia y relojes

IndexedDB conserva la única sesión activa: receta, porciones, marcas, paso seleccionado, bloqueo de orientación y relojes. Cada reloj almacena `dueAt`, una fecha absoluta; la pantalla deriva el tiempo restante y no depende de que JavaScript siga ejecutándose.

En Android, Local Notifications programa una alarma por reloj. Un complemento nativo crea un canal con uso de alarma y puede solicitar acceso a No molestar. Otro complemento fija la orientación actual o vuelve al sensor completo. La PWA usa las capacidades equivalentes cuando el navegador las ofrece.

## Interfaz

Receta y Recorrido son dos superficies desplazables que leen el mismo estado. CSS cambia solo su ubicación:

- horizontal: Recorrido a la izquierda, Receta a la derecha;
- vertical: Receta arriba, franja de relojes y Recorrido abajo.

La marca, el reloj, el audio y la navegación son operaciones independientes. Las opciones poco frecuentes aparecen en una hoja temporal.

Ingredientes y cronómetro global son fuentes de estado compartido. El estado de un ingrediente puede señalar pasos afectados sin reescribirlos. El cronómetro global se persiste separado de los vencimientos y solo existe después de una acción explícita.

El lenguaje visual de preparaciones se deriva de `componentId` y `components[].role`. El contrato expresa función culinaria, nunca códigos HEX ni adornos de interfaz.

El lienzo mutable no requiere un motor de reglas. Cada sección renderiza componentes simples según propiedades que ya existen: `amounts`, `timer`, `doneWhen`, `avoid`, `rescues` y `canRunWith`. Una propiedad ausente no renderiza su componente. Esta composición declarativa reemplaza los widgets vacíos y mantiene estable el contrato 1.2.

La aplicación mantiene una única capa de navegación horizontal por vistas, con Cocina como posición central. El gesto lateral se resuelve por dirección dominante para no competir con los dos scrolls verticales ni con los gestos de tarjeta. Cambiar de vista conserva la sesión montada, el paso seleccionado y los relojes; una futura vista Música será un adaptador de la sesión multimedia del sistema y no una dependencia del motor de recetas.

En Android, la ventana inmersiva oculta las barras del sistema y la barra propia obtiene hora y batería mediante capacidades locales de solo lectura. Debe reaccionar a recortes, cámara frontal y restauración de barras tras desbloquear o volver desde otra aplicación, evitando que los indicadores del sistema se superpongan al contenido.

## Importación

Android admite compartir o abrir JSON; la web admite archivo, portapapeles y Share Target cuando está disponible. Todos pasan por el mismo parser. El texto exterior a `---MISE/1---` se ignora y el límite es 1 MB. Una entrega inválida no toca la sesión.

Las recetas precargadas se compilan con la aplicación, validan contra el mismo esquema y se abren como cualquier importación. Una futura bóveda deberá producir copias validadas y nunca modificará silenciosamente una sesión activa.

## Recientes y bóvedas

Recientes deberá almacenar una copia local validada de la receta y metadatos privados en un registro separado. El visor nunca ejecutará HTML, scripts ni direcciones incluidas en una receta.

Una bóveda local futura se abrirá mediante permisos de documentos del sistema. Una bóveda en línea usará un adaptador aislado, descargará a cuarentena y pasará por el mismo importador antes de aparecer en Inicio. Una sesión activa conservará su instantánea aunque cambie el origen remoto.

La conexión entre dispositivos inspirada en KDE Connect queda fuera del núcleo. Si se implementa, requerirá emparejamiento explícito, cifrado punto a punto y mensajes mínimos de sesión; no expondrá directamente IndexedDB ni archivos de bóvedas.
