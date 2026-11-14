# ADR-004: Filosofía de Diseño Mobile-First & Apple Human Interface Guidelines (HIG)

## Estado
Aprobado e Implementado

## Contexto
Tanto el cliente (turista reservando desde su celular en Salta) como Ezequiel (dueño operando en el mostrador o caminando por las instalaciones del hotel) utilizarán predominantemente dispositivos móviles. Un sitio web convencional con retraso de clics, fuentes pequeñas y menús engorrosos arruinaría la experiencia.

## Decisión
Se implementaron los estándares de **Mobile-Native (Emil Kowalski) y Apple HIG**:
1. **Viewport & Safe Areas:** `viewport-fit=cover`, altura dinámica `100dvh` y paddings adaptados a notch y barra de navegación (`env(safe-area-inset-*)`).
2. **Latencia Cero en Toques:** Eliminación del tap highlight azul/gris (`-webkit-tap-highlight-color: transparent`) y anulación del retardo de 300ms (`touch-action: manipulation`).
3. **Control Anti-Zoom:** Tipografía mínima de `16px` en inputs para impedir el auto-zoom invasivo de Safari en iOS.
4. **Respuesta Táctil Inmediata:** Transiciones `:active { transform: scale(0.97) }` de 100-120ms con curvas de resorte.
5. **Glassmorphism Funcional:** Barras de control y selector de vista con `backdrop-filter: blur(24px) saturate(180%)` y bordes sutiles de iluminación superior.

## Consecuencias
* **Positivas:** La web app se siente indistinguible de una aplicación nativa descargada de la App Store / Google Play, especialmente al instalarse como PWA en la pantalla de inicio.
* **Negativas:** Requiere pruebas continuas en dispositivos físicos reales para validar márgenes de seguridad en diferentes marcas de teléfonos.
