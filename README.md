# 🏨 Hotel Cápsula para Mascotas - Salta Capital (Tres Cerritos)

Plataforma Web, Sistema de Reservas y Panel de Operación para el **Primer Hotel Cápsula para Mascotas del Norte Argentino**, combinando el **Estudio y Formulación de Negocio Turístico** con la **Ingeniería de Software (Metodología SDD / IEEE 1016)**.

---

## 🚀 Enlaces del Proyecto

* 🌐 **Demo en Producción (Vercel):** [https://hotel-mascotas-app.vercel.app](https://hotel-mascotas-app.vercel.app)
* 🐙 **Repositorio en GitHub:** [https://github.com/azaeldahaka/hotel-mascotas-app](https://github.com/azaeldahaka/hotel-mascotas-app)

---

## 🌟 Funcionalidades Principales (MVP)

### 🐾 1. Vista Clientes (Experiencia de Reserva para Turistas y Residentes)
* **Diferenciación Estricta de Especies:** Áreas físicas y acústicas 100% separadas para **Perros 🐕** (10 cápsulas) y **Gatos 🐈** (6 torres felinas).
* **Modalidad Flexible:** *Hospedaje nocturno* o *Guardería Daycare* por horas (ideal para turistas durante excursiones al Tren a las Nubes, Salinas o Cafayate).
* **Motor de Cotización en 3 Pasos:** Selección de fechas, ficha médica/vacunas y servicios adicionales (*Pet Spa/Baño*, *Pet Taxi Salta*, *Piscina supervisada*, *Menú Gourmet Barf*).
* **Voucher Digital con QR & WhatsApp:** Generación instantánea de comprobante con simulación de streaming de cámara HD y enlace directo a WhatsApp con Ezequiel.
* **Mapa de Localización & Líneas SAETA:** Acceso cartográfico interactivo a la Avenida Reyes Católicos (Tres Cerritos) y colectivos (5A, 5B, 8 Transversal).

### 👔 2. Panel de Control del Dueño (Ezequiel)
* **Barra de KPIs en Tiempo Real:** Porcentaje de ocupación, facturación estimada de la jornada, movimientos del día y alertas veterinarias.
* **Grilla Visual de las 16 Cápsulas Físicas:** Códigos de color (🟢 Libre, 🔴 En Hotel con foto del huésped, 🟡 Llega Hoy).
* **Bottom Sheet Táctil (Apple Drawer):** Ficha clínica del animal, check-in, check-out, recargo de servicios extra y contacto directo con el dueño.
* **Semáforo Sanitario:** Auditoría biosegura de vacunas (Antirrábica, Séxtuple y Triple Felina) para prevenir contagios.
* **Restablecimiento de Datos Demo:** Botón para reiniciar los datos de prueba y comenzar demostraciones limpias en cualquier momento.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 19 + TypeScript + Vite 6
* **Estilos:** Tailwind CSS v4 con principios **Apple HIG** y **Mobile-Native** (latencia cero, `100dvh`, feedback háptico `:active { transform: scale(0.97) }`, glassmorphism con `backdrop-filter: blur(24px)`).
* **Iconografía:** Lucide React
* **Manejo de Fechas:** Date-fns
* **Efectos:** Canvas Confetti
* **Despliegue & CI/CD:** Vercel Edge Network

---

## 📁 Estructura del Repositorio

```text
hotel-mascotas-app/
├── public/                              # Assets estáticos y mapas de Tres Cerritos
├── src/                                 # Código fuente de la aplicación React
│   ├── components/                      # Componentes UI (Header, ModeSelector, LocationModal)
│   │   ├── client/                      # Catálogo, tarjetas, wizard de reserva y voucher
│   │   └── owner/                       # Dashboard de Ezequiel, grilla 16 cápsulas, drawer y semáforo
│   ├── context/                         # HotelContext (store reactivo y persistencia LocalStorage)
│   ├── data/                            # Mocks realistas iniciales (16 cápsulas, huéspedes y reservas)
│   └── types/                           # Tipado TypeScript del modelo de dominio
│
└── docs/                                # Documentación de Negocio e Ingeniería de Software
    ├── negocio-academico/               # Proyecto de Negocio y Trabajo Integrador de Turismo
    │   ├── entregables/                 # PDFs, Word final, Proyección Económica en Excel
    │   ├── inputs/                      # Diagnósticos FODA, Canvas, Localización y Mapas
    │   ├── anexos/                      # Material complementario
    │   └── TRABAJO_FINAL_HOTEL_CAPSULA_MASCOTAS.md
    │
    └── software/                        # Ingeniería de Software / SDD (IEEE 1016 / ISO 42010)
        ├── context/                     # Resúmenes consolidados de requerimientos
        ├── specs/                       # SRS (Requisitos Funcionales RF y No Funcionales RNF)
        ├── architecture/                # Modelo C4 (Contexto, Contenedores, Componentes)
        └── backlog/                     # Historias de usuario y roadmap
```

---

## 💻 Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/azaeldahaka/hotel-mascotas-app.git
   cd hotel-mascotas-app
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compilar para producción:
   ```bash
   npm run build
   npm run preview
   ```
