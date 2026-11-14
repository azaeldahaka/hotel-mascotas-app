# 📋 Backlog del Producto & Historias de Usuario (User Stories)
## Hotel Cápsula para Mascotas - Salta Capital (Barrio Tres Cerritos)
**Metodología:** Ágil / Scrum con Criterios de Aceptación Gherkin (Dado / Cuando / Entonces)  
**Norma:** SDD / IEEE 1016  
**Fecha:** Noviembre 2026  

---

## 1. Épica 1: Experiencia de Reserva y Fidelización del Huésped

### HU-001: Exploración de Catálogo y Diferenciación por Especie
* **Como** tutor de una mascota (turista o residente de Salta),
* **Quiero** filtrar de inmediato las habitaciones según mi mascota sea perro o gato,
* **Para** tener la seguridad de que mi animal se alojará en un espacio exclusivamente acondicionado para su especie sin estrés.
* **Criterios de Aceptación:**
  * **Dado** que el usuario ingresa a la plataforma web,
  * **Cuando** selecciona la pestaña "Perros (10)",
  * **Entonces** solo se listan las 10 cápsulas caninas con especificaciones acústicas y acceso a patios recreativos.
  * **Cuando** selecciona la pestaña "Gatos (6)",
  * **Entonces** se despliegan las 6 torres felinas con rascadores verticales, feromonas Feliway y aislamiento acústico total.

---

### HU-002: Motor de Reserva y Selección de Modalidad (Noche vs. Daycare)
* **Como** turista que visita Salta para realizar excursiones (Tren a las Nubes, Salinas, Cafayate),
* **Quiero** contratar una guardería de día por horas o una estadía completa por noches,
* **Para** disfrutar mis paseos con tranquilidad sabiendo que mi mascota está cuidada.
* **Criterios de Aceptación:**
  * **Dado** que el usuario selecciona una cápsula disponible,
  * **Cuando** elige la modalidad "Daycare",
  * **Entonces** puede ajustar un slider entre 2 y 12 horas y el precio se calcula automáticamente con la tarifa por hora de esa cápsula.
  * **Cuando** elige "Hospedaje Nocturno",
  * **Entonces** selecciona fecha de check-in y check-out, calculándose el subtotal en función de las noches transcurridas.

---

### HU-003: Contratación de Servicios Extra (Upselling de Spa y Transporte)
* **Como** dueño de una mascota,
* **Quiero** añadir servicios adicionales durante el proceso de reserva,
* **Para** que mi mascota reciba un baño relajante o sea trasladada puerta a puerta a mi hotel o domicilio.
* **Criterios de Aceptación:**
  * **Dado** que el usuario se encuentra en el Paso 3 del wizard de reserva,
  * **Cuando** tilda "Pet Spa & Baño Ozonizado ($8.500)" o "Pet Taxi Salta ($6.000)",
  * **Entonces** el desglose financiero suma el adicional en tiempo real y actualiza el total general estimado.

---

### HU-004: Ficha Sanitaria y Semáforo de Vacunación
* **Como** responsable de la admisión del hotel,
* **Quiero** que el cliente declare el temperamento y certifique las vacunas obligatorias de su mascota,
* **Para** proteger la bioseguridad del establecimiento e impedir el ingreso de animales no inmunizados.
* **Criterios de Aceptación:**
  * **Dado** que el cliente ingresa los datos de su mascota,
  * **Cuando** declara nombre, raza, peso y alergias,
  * **Entonces** debe marcar obligatoriamente la vigencia de la Vacuna Antirrábica y Séxtuple/Triple Felina antes de poder confirmar la reserva.

---

### HU-005: Voucher Digital con QR, Cámara Demo y Contacto a WhatsApp
* **Como** cliente que finalizó una reserva,
* **Quiero** recibir un comprobante digital con código único y acceso directo a WhatsApp con Ezequiel,
* **Para** tener respaldo inmediato de mi reserva y coordinar la llegada al hotel.
* **Criterios de Aceptación:**
  * **Dado** que el cliente confirma la reserva,
  * **Cuando** se genera la orden,
  * **Entonces** se despliega una animación de confeti y una tarjeta con código (ej: `#SALTA-8901`), mapa de Tres Cerritos, simulación de streaming de cámara HD y un botón preformateado que abre WhatsApp con Ezequiel.

---

## 2. Épica 2: Centro de Mando Operativo de Ezequiel (Backoffice)

### HU-006: Tablero de KPIs en Tiempo Real
* **Como** dueño del hotel (Ezequiel),
* **Quiero** visualizar las métricas clave de mi negocio en una sola pantalla,
* **Para** tomar decisiones operativas y financieras rápidas al comenzar mi jornada.
* **Criterios de Aceptación:**
  * **Dado** que Ezequiel abre el panel de control,
  * **Cuando** observa la barra superior de métricas,
  * **Entonces** ve en tiempo real el % de ocupación (ratio sobre 16 cápsulas), la facturación estimada de hoy en pesos argentinos, los movimientos de check-in/out del día y las alertas médicas activas.

---

### HU-007: Grilla Interactiva del Inventario de 16 Cápsulas Físicas
* **Como** Ezequiel o personal del hotel,
* **Quiero** un mapa visual de las 16 cápsulas en Tres Cerritos con código de colores,
* **Para** saber al instante qué habitación está libre, cuál ocupada y cuál esperando ingreso.
* **Criterios de Aceptación:**
  * **Dado** que se visualiza la grilla de cápsulas,
  * **Cuando** una cápsula está libre se muestra en color verde; si está ocupada se muestra en rojo con la foto del perro/gato y fecha de egreso; si llega hoy se muestra en amarillo.
  * **Cuando** Ezequiel toca cualquier cápsula,
  * **Entonces** se despliega una hoja inferior táctil (*Apple Bottom Sheet*) con los datos del huésped y botones para hacer Check-In, Check-Out o añadir servicios extra en caliente.

---

### HU-008: Semáforo Clínico y Alertas Médicas
* **Como** staff veterinario y de cuidado del hotel,
* **Quiero** una lista consolidada de las mascotas que requieren medicación o dietas especiales,
* **Para** no cometer errores en la administración de fármacos o alimentación durante la estadía.
* **Criterios de Aceptación:**
  * **Dado** que Ezequiel pulsa la pestaña "Semáforo Sanitario",
  * **Cuando** hay mascotas con medicación o alergias reportadas,
  * **Entonces** se destacan con insignias de advertencia violetas y amarillas con las indicaciones exactas del dueño.
