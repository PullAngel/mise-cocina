# Android

El APK se abre a pantalla completa y es la opción recomendada para cocinar. La interfaz reacciona al giro y el candado de la esquina fija o libera la orientación sin cambiar el paso visible.

## Permisos de relojes

La sesión y los vencimientos se recuperan siempre. Para recibir avisos fuera de Mise:

1. En **Opciones → Alarmas y sonido**, concedé notificaciones y alarmas exactas.
2. Si querés atravesar Silencio o No molestar, abrí el segundo permiso especial y habilitá Mise.
3. Conservá audible el volumen de alarmas del teléfono.

El permiso especial permite que el canal de Mise atraviese No molestar; Android o el fabricante todavía pueden limitarlo si el volumen de alarmas está en cero.

## Recibir una receta

Descargá o compartí el archivo JSON y elegí Mise, o compartí texto con `---MISE/1---`. La aplicación valida la entrega antes de reemplazar la sesión activa.

## Compilar

Ejecutá `pnpm run android:sync`. Con `JAVA_HOME` y `ANDROID_HOME` configurados, ejecutá `gradlew.bat assembleDebug` dentro de `android`.

Antes de una distribución pública se necesita una firma de release, el identificador definitivo y pruebas de batería, giro y notificaciones en Samsung Galaxy A55 y Poco X5 Pro.

