# 🎯 Guía de Demostración y Pitch para Ezequiel (Dueño del Hotel)
## Cómo presentar el MVP del Hotel Cápsula para Mascotas en 10 Minutos
**Autor:** Leandro Ovando  
**Audiencia:** Ezequiel (Dueño / Operador del Hotel) y Mesa Evaluadora  
**URL de la Demo en Vivo:** [https://hotel-mascotas-app.vercel.app](https://hotel-mascotas-app.vercel.app)  
**Dispositivo Recomendado:** Celular (para demostrar la experiencia Mobile-Native / PWA) o Laptop.  

---

## ⏱️ Estructura del Pitch (10 Minutos)

```
[00:00 - 02:00]  1. El Gancho: El dolor actual vs. La solución del Hotel Cápsula
[02:00 - 05:00]  2. La Cara del Cliente: Reserva en 2 minutos sin audios de WhatsApp
[05:00 - 08:30]  3. El Plato Fuerte: El Centro de Mando de Ezequiel (Control Total)
[08:30 - 10:00]  4. Respuestas a Preguntas Clave & Cierre
```

---

## 🎬 Guión Paso a Paso para la Presentación

### 1. El Gancho (Minuto 0:00 a 2:00)
> *"Ezequiel, hoy en Salta cuando alguien viaja o hace una excursión como el Tren a las Nubes o Salinas Grandes, enfrenta un drama: las guarderías tradicionales son jaulas colectivas ruidosas donde los animales se estresan, se pelean o se enferman. Los dueños no confían y vos perdés horas cotizando por mensajes de WhatsApp.*  
>  
> *Por eso diseñamos esta plataforma para tus **16 cápsulas en Tres Cerritos**: automatiza la venta para que el cliente reserve en 2 minutos y te da a vos el control diario de ocupación, facturación y bioseguridad en la palma de la mano."*

---

### 2. La Experiencia del Cliente (Minuto 2:00 a 5:00)
1. **Abrir la web en el celular:** [https://hotel-mascotas-app.vercel.app](https://hotel-mascotas-app.vercel.app)
2. **Mostrar el selector Perros vs. Gatos:**
   * *"Mirá: lo primero que ve el cliente es la separación estricta. Si toco 'Gatos', ve las 6 torres felinas zen con aislamiento acústico. Si toco 'Perros', ve las 10 cápsulas caninas. Esto transmite confianza inmediata."*
3. **Tocar 'Tres Cerritos, Salta Capital' en el encabezado:**
   * *"Si el cliente tiene dudas de cómo llegar, toca acá y ve el mapa oficial de Avenida Reyes Católicos, las paradas de las líneas SAETA 5A, 5B y 8 Transversal, y un botón para abrir Google Maps con GPS."*
4. **Hacer una reserva en vivo (por ejemplo, en la Cápsula C-04):**
   * Elegir entre *Hospedaje Nocturno* o *Guardería Daycare* por horas (ideal para excursiones).
   * Cargar el perro de prueba: *"Simba, 8 kg, sin alergias, vacunas al día"*.
   * Agregar servicios extra: *"Le sumamos Pet Spa ($8.500) y Pet Taxi ($6.000). El cotizador calcula todo en vivo sin que vos tengas que hacer cuentas con calculadora."*
5. **Confirmar la reserva:**
   * Se dispara el confeti 🎉 y se abre el **Voucher Digital con código `#SALTA-XXXX`**.
   * Mostrar el botón de **"Probar Cámara"** con streaming simulado a 22°C.
   * Mostrar el botón de **"Enviar Reserva por WhatsApp"** (ya viene con el texto armado para mandártelo a vos).

---

### 3. El Centro de Mando de Ezequiel (Minuto 5:00 a 8:30)
*Este es el momento donde Ezequiel ve el valor real para su día a día.*

1. **Tocar el selector superior 'Panel de Ezequiel':**
   * *"Ahora cambiamos el chip: esta es tu pantalla de control como dueño."*
2. **Mostrar la actualización en tiempo real:**
   * *"Fijate en la cápsula C-04 que acabamos de reservar: pasó automáticamente a amarillo ('LLEGA HOY') y tus KPIs de ocupación y facturación se recalcularon solos."*
3. **Explicar los 4 KPIs:**
   * **Ocupación Hoy:** Porcentaje y ratio (ej: 8/16 cápsulas ocupadas - 50%).
   * **Facturación Estimada:** Dinero recaudado en el día entre estadías y extras de spa/taxi.
   * **Movimientos:** Cuántos ingresos y salidas tenés programados hoy.
   * **Alertas Clínicas:** Semáforo de animales que toman medicación para que el staff no se olvide de darles su dosis.
4. **Abrir una cápsula ocupada (C-01 - Milo):**
   * Se despliega la hoja táctil inferior (*Apple Bottom Sheet*).
   * *"Desde acá hacés todo con un dedo: tenés los datos del dueño, el botón para llamarlo o abrir su WhatsApp, el botón de 'Check-In' cuando llega y 'Check-Out' cuando se va."*
   * *"Si el dueño te llama al mediodía y te pide un baño a último momento, tocás '+ Agregar Extra', elegís Spa y el total se recalcula al instante."*
5. **Mostrar la pestaña 'Semáforo Sanitario':**
   * *"Ningún perro o gato entra sin vacunas. Acá tu personal veterinario tiene el semáforo para verificar que la antirrábica y la séxtuple estén al día, protegiendo la salud de todo el hotel."*

---

### 4. Preguntas Típicas de Ezequiel & Respuestas Rápidas

#### P1: *"¿Qué pasa si dos personas intentan reservar la misma cápsula a la misma hora?"*
* **Respuesta:** *"El sistema tiene un bloqueo automático: en cuanto una cápsula está reservada, el botón se bloquea para otros clientes. Además, en la base de datos PostgreSQL dejamos programada una regla matemática (índice GiST) que rechaza a nivel de servidor cualquier intento de solapamiento de fechas. El riesgo de overbooking es cero."*

#### P2: *"¿Tengo que pagar para subirla al Play Store o App Store?"*
* **Respuesta:** *"No. La configuramos como PWA (Progressive Web App). Cuando entrás desde Safari o Chrome en tu teléfono, tocás 'Agregar a pantalla de inicio' y se instala con su propio ícono oficial como si fuera una app nativa, a costo cero de mantenimiento de tiendas."*

#### P3: *"¿Y si quiero volver a mostrar la demo a otra persona desde cero?"*
* **Respuesta:** *"Tenés el botón 'Restablecer Demo' arriba a la derecha. Lo tocás y todo vuelve al estado inicial en un segundo para que practiques tu presentación cuantas veces quieras."*
