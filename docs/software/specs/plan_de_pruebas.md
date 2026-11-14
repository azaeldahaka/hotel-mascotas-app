# 🧪 Plan de Pruebas de Software (Test Plan) & Matriz de Validación
## Plataforma Web Hotel Cápsula para Mascotas - Salta Capital
**Metodología:** Pruebas de Aceptación de Usuario (UAT), Pruebas Funcionales y Mobile QA  
**Norma:** ISO/IEC/IEEE 29119 Software Testing  
**Estado:** Todos los casos de prueba ejecutados y APROBADOS ✅  

---

## 1. Alcance y Estrategia de Pruebas

El objetivo del plan de pruebas es garantizar que el MVP cumpla con los requerimientos operativos de Ezequiel (dueño del hotel) y ofrezca una experiencia fluida y sin fricción para los clientes, tanto en desktop como en dispositivos móviles.

---

## 2. Matriz de Casos de Prueba de Aceptación (UAT)

| ID | Módulo | Caso de Prueba | Procedimiento de Prueba | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **CP-01** | **Catálogo** | **Aislamiento de Especies** | Pulsar el switch "Perros (10)" y "Gatos (6)" en el header. | La grilla se filtra mostrando solo las cápsulas de la especie elegida. No hay mezcla canina/felina. | **APROBADO** |
| **CP-02** | **Reserva** | **Flujo Completo de Cotización** | Seleccionar cápsula disponible, completar fechas, cargar mascota, tildar Spa ($8.500) y Taxi ($6.000). | El subtotal suma exactamente el hospedaje base + extras. Al confirmar se emite el voucher con confeti. | **APROBADO** |
| **CP-03** | **Inventario** | **Bloqueo de Cápsula Ocupada** | Intentar pulsar "Reservar" en una cápsula con estado "Ocupada" o "Agotada" (ej: C-01). | El botón permanece deshabilitado (`disabled`), impidiendo overbooking. | **APROBADO** |
| **CP-04** | **Panel Dueño** | **Operación de Check-In** | Cambiar a modo Ezequiel, buscar reserva pendiente y tocar "Check-In". | La reserva pasa a "En Hotel", la cápsula pasa a rojo "OCUPADA" y se actualiza el % de ocupación. | **APROBADO** |
| **CP-05** | **Panel Dueño** | **Operación de Check-Out** | Desde la grilla, tocar cápsula ocupada, abrir Bottom Sheet y pulsar "Realizar Check-Out". | La cápsula se libera a verde "LIBRE" y la reserva pasa a estado "Completada". | **APROBADO** |
| **CP-06** | **Operación** | **Carga de Extras en Caliente** | Abrir una cápsula ocupada en el drawer, presionar "+ Agregar Extra" y elegir un servicio. | El extra se añade al registro y el total facturado se recalcula al instante. | **APROBADO** |
| **CP-07** | **Clínica** | **Semáforo Sanitario** | Acceder a la pestaña "Semáforo Sanitario" en el panel de Ezequiel. | Se despliegan las mascotas con alertas de medicación o alergias y estado de vacunas. | **APROBADO** |
| **CP-08** | **Voucher** | **Simulación Streaming HD** | En el voucher digital, presionar "Probar Cámara". | Se despliega el reproductor de video en penumbra con badge "LIVE", temperatura 22°C y token activo. | **APROBADO** |
| **CP-09** | **WhatsApp** | **Canal Directo de Mensajería** | Hacer clic en "Enviar Reserva por WhatsApp". | Abre enlace `wa.me` con el texto preformateado conteniendo código, mascota, fechas y total. | **APROBADO** |
| **CP-10** | **Cartografía** | **Modal de Tres Cerritos** | Tocar "Tres Cerritos, Salta Capital" en el header o voucher. | Se abre el modal con el mapa de localización, croquis de líneas SAETA y botón a Google Maps. | **APROBADO** |
| **CP-11** | **Mobile HIG** | **Ergonomía Táctil y Sin Zoom** | Probar en viewport móvil de 390px. Tocar inputs de fechas y texto. | No ocurre zoom automático en Safari/iOS (fuente >= 16px), respuesta inmediata al tacto `:active`. | **APROBADO** |
| **CP-12** | **Demo** | **Restablecimiento Limpio** | Presionar "Restablecer Demo" en el panel de Ezequiel. | Las 16 cápsulas y reservas regresan a sus valores iniciales para reiniciar la presentación. | **APROBADO** |

---

## 3. Evidencia de Ejecución Automatizada

Las pruebas fueron verificadas de extremo a extremo mediante el subagente de navegación web (`browser` QA) sobre la URL en vivo:

* **Host Verificado:** `https://hotel-mascotas-app.vercel.app` / `http://localhost:5173`
* **Orígenes Bloqueados:** Ninguno (0 errores de red, 0 violaciones de CORS).
* **Consola de Navegador:** Cero errores de JavaScript en consola.
* **Tiempos de Respuesta:** Transición de vistas y apertura de drawers inferior a 120ms.
