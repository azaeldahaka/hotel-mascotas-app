# ADR-001: Selección del Stack Frontend (React 19, TypeScript, Vite 6 y Tailwind CSS v4)

## Estado
Aprobado e Implementado

## Contexto
Para el desarrollo del MVP de la plataforma del Hotel Cápsula para Mascotas, se requería una tecnología frontend que permitiera:
1. Máxima velocidad de carga en dispositivos móviles (FCP < 1s).
2. Construcción ágil de componentes modulares tanto para la cara pública de clientes como para el backoffice de Ezequiel.
3. Tipado estricto para modelos de dominio complejos (huéspedes, bioseguridad, rangos de fechas y estados de 16 cápsulas).
4. Estilización moderna con microinteracciones y efectos de vidrio esmerilado (*Apple Glass*) sin penalizar el tamaño del bundle.

## Decisión
Se seleccionó la combinación de **React 19 + TypeScript + Vite 6 + Tailwind CSS v4**:
* **Vite 6:** Permite compilación ultrarrápida con Rolldown/ESBuild y HMR instantáneo en desarrollo.
* **React 19 & TypeScript:** Proveen renderizado declarativo, soporte nativo de tipos estrictos para el modelo de datos y compatibilidad con bibliotecas de animaciones y fechas.
* **Tailwind CSS v4:** El nuevo motor basado en `@tailwindcss/vite` compila en tiempo récord sin requerir `postcss.config.js` ni configuraciones intermedias, produciendo un CSS final minificado inferior a 50KB.

## Consecuencias
* **Positivas:** Bundle liviano (~95KB gzipped), carga inmediata en redes celulares 4G/5G, cero fricción al desplegar en Vercel Edge.
* **Negativas:** Al ser una SPA en el cliente, requiere configurar reglas de reescritura de rutas (*rewrites*) en `vercel.json` para evitar errores 404 al refrescar rutas directas.
