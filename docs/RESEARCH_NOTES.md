# Casos reales y decisiones

## Recetas seleccionadas del chat «Chef Gourmet Casero»

### 1. Pollo con salsa de ostras, cebolla, morrón y arroz

Contexto: cena abundante y tupper para el día siguiente. Aparecieron decisiones sobre tamaño del pollo para recalentar, dos tandas para lograr dorado, mezcla previa de salsa, ajuste de sal y aceite de sésamo fuera del fuego.

Exige: cantidad por paso, preparación paralela del arroz, señal de dorado, rescates para salsa salada o espesa y cierre con conservación.

### 2. Bondiola glaseada con tamarindo, miel, cebolla y boniato

Contexto: coordinar horno, sartén y reposo. La miel solo entra al final; la cebolla aprovecha el fondo; el glaseado se ajusta por acidez, dulzor y espesor.

Exige: tres procesos visibles, avisos temporales, descansos que liberan trabajo y correcciones sensoriales.

### 3. Asado con papas gigantes y vegetales

Contexto: parrilla baja, cortes irregulares, carne parcialmente congelada y seguimiento mediante fotografías. El calor se controla por zonas, no con una temperatura exacta.

Exige: estados cualitativos, adaptación en marcha, señal visual/táctil, prioridad de seguridad y posibilidad de corregir el plan sin reiniciarlo.

### 4. Arroz chaufa para ocho personas

Contexto: dos hornallas, una porción vegetariana, restricción de legumbres, pollo medio congelado y con hueso, escala grande y necesidad de no desperdiciar.

Exige: dependencias explícitas, reserva de una rama vegetariana, trabajo en tandas, equipo limitado y cantidades escaladas.

### 5. Dos pizzas gourmet para transportar

Contexto: horno sin medición en grados, presupuesto limitado, dos unidades para una cena compartida y transporte después de enfriarse.

Exige: instrucciones relativas al equipo real, tratamiento previo de ingredientes, momento de corte, ventilación y estado de servicio fuera de casa.

## Patrones observados

- La receta elegida cambia cuando aparece nueva información.
- Las preguntas más valiosas ocurren durante la ejecución, no durante la elección.
- El orden importa tanto como los ingredientes.
- «Primero esto o aquello» suele significar «cómo aprovecho calor, fondo o tiempo de espera».
- Los tiempos son orientativos; el punto se decide por color, textura, aroma o sabor.
- Varias técnicas tienen un momento peligroso: ajo que se quema, miel demasiado temprano, sésamo calentado, sartén saturada.
- Equipo y contexto cambian el plan: dos hornallas, horno sin termómetro, parrilla baja, air fryer en el trabajo.
- Escala, restricciones y porciones para el día siguiente deben formar parte del plan, no una nota al final.
- La persona quiere cocinar mejor, no obedecer una aplicación.

## Errores de propuestas anteriores corregidos

### Formato YAML como base

Se reemplaza por JSON validado. YAML es agradable de leer, pero introduce interpretaciones implícitas y errores de indentación innecesarios para un intercambio automático.

### Chat integrado sin clave

No es una promesa válida sin que alguien opere y pague un servicio. La primera versión incluye rescates locales y un traspaso explícito de estado hacia la conversación existente.

### Cronómetros web tratados como alarmas fiables

Una página puede recuperar correctamente un vencimiento, pero no garantizar sonido si el sistema la suspende. La PWA mantiene pantalla activa cuando puede; las alarmas nativas quedan como ampliación.

### Demasiadas tarjetas equivalentes

Tres paneles iguales no expresan prioridad. Cada diseño debe diferenciar qué merece atención, qué se acerca y qué puede esperar.

### Línea de tiempo falsamente precisa

La cocina doméstica cambia con tamaño, temperatura y equipo. El modelo usa dependencias, acontecimientos y ventanas de calidad antes que una agenda rígida.

## Estado del arte consultado

Cooklang demuestra que una receta legible puede anotar ingredientes, utensilios y temporizadores. Mise puede importar Cooklang más adelante, pero necesita información adicional sobre dependencias, señales sensoriales, rescates y estado de ejecución.

Las aplicaciones de cocina existentes ofrecen pasos grandes, voz y múltiples cronómetros. La oportunidad de Mise está en conservar decisiones de una conversación y coordinar componentes que cambian durante la ejecución, sin integrar otro generador de recetas.

Los planificadores que convierten recetas en grafos temporales confirman el valor de la coordinación, pero una programación automática rígida no encaja con los casos reales observados. Mise debe tratar el grafo como recomendación revisable.

