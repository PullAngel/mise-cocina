# Entradas de recetas — alcance inicial

Mise trata cada receta importada como datos no confiables. La candidata aplica un límite de 1 MB, analiza JSON sin ejecutar HTML, valida contra un esquema cerrado y comprueba referencias entre ingredientes, componentes y pasos.

Antes de una publicación abierta se revisará el flujo contra OWASP MASVS y se añadirán límites más finos de profundidad, longitud y cantidad, casos maliciosos y mensajes de diagnóstico ampliados. Esta etapa no incorpora red, URLs ejecutables ni reparación automática del contenido.
