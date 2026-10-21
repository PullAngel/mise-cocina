# Ficha de producto — Mise Cocina

## Descripción

**Mise Cocina** es una aplicación local para Android y web que convierte una receta estructurada en una superficie de trabajo legible, táctil y recuperable. Está diseñada para cocinar con atención dividida, manos ocupadas y el teléfono apoyado a cierta distancia.

No es un generador de recetas ni un chat dentro de la cocina. La conversación culinaria ocurre antes, con la persona o asistente que se prefiera. Mise recibe el resultado en un formato abierto, lo valida y lo presenta para ejecutar.

## Propuesta

> La receta deja de ser una página que hay que recordar y se convierte en una mesa de trabajo que acompaña el ritmo real de cocinar.

Mise organiza una misma receta en cuatro capas conectadas:

1. **Documento continuo:** todos los pasos de punta a punta, con desplazamiento libre.
2. **Recorrido:** índice compacto para ubicarse y volver a cualquier paso.
3. **Ingredientes:** cantidades escalables, faltantes y agrupación por uso.
4. **Instrumentos:** cronómetro de sesión, temporizadores y lectura en voz.

## Para quién

- Personas que ajustan recetas mediante una conversación y después quieren cocinar sin volver a leer el chat.
- Cocineros domésticos que valoran señales físicas y sensoriales más que tiempos rígidos.
- Usuarios que necesitan ver instrucciones grandes a distancia.
- Desarrolladores y diseñadores interesados en interfaces locales para tareas físicas.
- Herramientas que quieran producir o consumir el formato abierto `mise.recipe`.

## Diferencias

| Mise | Recetario convencional |
| --- | --- |
| La receta es un flujo operativo | La receta es una página |
| Temporizadores vinculados a pasos | Temporizador separado |
| Señales de punto y rescates | Tiempo e instrucciones generales |
| Estado local recuperable | Lectura sin estado |
| Formato JSON documentado | Contenido encerrado en una plataforma |
| Sin cuenta, servidor ni API key | Dependencia frecuente de una cuenta o servicio |

## Capacidades actuales

- Importación desde archivo, texto o compartir de Android.
- Validación mediante JSON Schema y referencias.
- Trece recetas precargadas.
- Escalado de porciones.
- Ingredientes disponibles o faltantes.
- Componentes del plato con lenguaje cromático.
- Pasos marcables mediante acción explícita.
- Temporizadores persistentes y notificaciones locales.
- Cronómetro global iniciado manualmente.
- Lectura de un paso o de la receta completa.
- Rotación automática y bloqueo desde la interfaz.
- PWA instalable y APK Android.

## Principios

- **Local primero:** cocinar no depende de una conexión.
- **Una sola receta:** documento, índice y audio leen la misma fuente de estado.
- **El gesto debe ser seguro:** desplazar nunca cambia una decisión.
- **La información llega antes de necesitarla:** los opcionales se preparan a tiempo.
- **La señal manda sobre el reloj:** color, olor, textura y sonido ayudan a reconocer el punto.
- **El formato es parte del producto:** esquema, ejemplos y prompts permanecen públicos.

## Estado

La versión 0.4.1 es una **alpha para uso cotidiano y pruebas con personas cercanas**. No es una publicación de tienda. La compatibilidad Android, la accesibilidad y el comportamiento de notificaciones todavía se amplían con pruebas reales.

## Modelo abierto y sostenibilidad

El núcleo se distribuye bajo GPL-3.0-or-later. El proyecto puede monetizarse en el futuro mediante distribución preparada, soporte, servicios, integraciones o trabajo a medida sin convertir el repositorio comunitario en una demostración incompleta. La identidad de marca se mantiene separada para distinguir versiones oficiales de forks.

## Identidad

- **Nombre:** Mise Cocina
- **Frase principal:** La receta deja de ser un texto.
- **Categoría:** herramienta local de ejecución culinaria
- **Plataformas:** Android y PWA
- **Tecnología:** React, TypeScript, Vite y Capacitor
- **Contrato:** `mise.recipe` 1.2
- **Licencia:** GPL-3.0-or-later
