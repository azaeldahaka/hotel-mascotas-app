# 🏗️ Arquitectura de Software: Modelo C4 & Estrategias de Concurrencia
## Plataforma Web Hotel Cápsula para Mascotas - Salta Capital
**Metodología:** Modelo C4 (Contexto, Contenedores, Componentes, Código)  
**Normas de Referencia:** ISO/IEC/IEEE 42010 / IEEE 1016  
**Fecha:** Noviembre 2026  

---

## 1. Nivel 1: Diagrama de Contexto del Sistema

El siguiente diagrama define los límites del sistema, los usuarios principales y las interacciones con sistemas externos:

```mermaid
flowchart TD
    subgraph Usuarios
        Turista["👤 Turista Receptivo<br/>(Busca guardería para excursión)"]
        Residente["👤 Residente Salta Capital<br/>(Hospedaje por viaje o trabajo)"]
        Ezequiel["👔 Ezequiel (Dueño / Administrador)<br/>(Controla ocupación y facturación)"]
        Vet["🩺 Personal Clínico / Staff<br/>(Supervisa vacunas y medicación)"]
    end

    subgraph PlataformaHotel ["🏨 Plataforma Web Hotel Cápsula (hotel-mascotas-app)"]
        SistemaCore["Sistema Web de Reservas & Gestión Hotelera<br/>(Portal de Clientes + Panel de Ezequiel)"]
    end

    subgraph Externos ["Sistemas Externos"]
        WhatsApp["💬 WhatsApp Business API / wa.me<br/>(Confirmación y contacto directo)"]
        GoogleMaps["📍 Google Maps / Cartografía SAETA<br/>(Ubicación en Tres Cerritos)"]
        CamarasIP["📹 Gateway de Streaming Cámaras HD<br/>(Transmisión en vivo por WebRTC)"]
        Pasarela["💳 Pasarela de Pago / Transferencia<br/>(Mercado Pago / Cobro mostrador)"]
    end

    Turista -->|Consulta disponibilidad y reserva| SistemaCore
    Residente -->|Registra mascota y contrata estadía| SistemaCore
    Ezequiel -->|Supervisa KPIs y grilla de 16 cápsulas| SistemaCore
    Vet -->|Valida cartillas y controla medicación| SistemaCore

    SistemaCore -->|Envía voucher preformateado| WhatsApp
    SistemaCore -->|Muestra mapa y accesibilidad| GoogleMaps
    SistemaCore -->|Genera token de acceso temporal| CamarasIP
    SistemaCore -->|Registra cobro de estadía y extras| Pasarela
```

---

## 2. Nivel 2: Diagrama de Contenedores

Detalla los entornos de ejecución, protocolos de comunicación y tecnologías seleccionadas:

```mermaid
flowchart TD
    ClienteApp["📱 Single Page Application (SPA)<br/><b>Tecnología:</b> React 19 + TypeScript + Vite<br/><b>Estilos:</b> Tailwind CSS v4 + Apple Glass HIG<br/><b>Despliegue:</b> Vercel Edge Network (CDN)"]

    StateEngine["💾 Motor de Estado Local / Cache<br/><b>Tecnología:</b> React Context API + LocalStorage<br/>(Permite persistencia reactiva en vivo)"]

    BackendEdge["⚙️ Backend Serverless / API Gateway<br/><b>Tecnología:</b> Node.js / Vercel Edge Functions<br/>(Endpoints REST para reservas y autenticación)"]

    DBRelacional["🗄️ Base de Datos Relacional<br/><b>Tecnología:</b> PostgreSQL (ACID)<br/>(Tablas: usuarios, mascotas, cápsulas, reservas)"]

    StreamServer["📹 Servidor de Streaming WebRTC/HLS<br/>(Protegido con tokens JWT de sesión)"]

    ClienteApp -->|Lee y actualiza estado| StateEngine
    ClienteApp -->|Peticiones HTTPS / JSON| BackendEdge
    BackendEdge -->|Consultas SQL con transacciones ACID| DBRelacional
    ClienteApp -->|Conexión WSS / WebRTC segura| StreamServer
```

---

## 3. Nivel 3: Diagrama de Componentes del Frontend

Desglose de los módulos internos que componen la aplicación cliente/dueño:

```mermaid
flowchart TD
    subgraph CoreArchitecture ["Arquitectura de Componentes (Frontend React)"]
        App["App.tsx (Root Container)"]
        Provider["HotelContext.tsx (Store Transaccional & Persistencia)"]
        Selector["ModeSelector.tsx (Segmented Control Apple Glass)"]
        HeaderComp["Header.tsx (Marca, Teléfono 24/7 y Switch Especie)"]

        subgraph ClientModule ["Módulo Vista Cliente"]
            ClientView["ClientView.tsx (Catálogo y Hero Tres Cerritos)"]
            CapsuleCard["CapsulaCard.tsx (Tarjeta con Specs y Precios)"]
            Wizard["BookingWizardModal.tsx (3 Pasos: Fechas, Mascota, Extras)"]
            Voucher["VoucherModal.tsx (Voucher Digital, QR y WhatsApp)"]
            LocationModal["LocationModal.tsx (Mapa Tres Cerritos y Líneas SAETA)"]
        end

        subgraph OwnerModule ["Módulo Panel de Ezequiel"]
            Dashboard["OwnerDashboard.tsx (Dashboard Central con 4 KPIs)"]
            CapsuleGrid["CapsuleGrid.tsx (Grilla de 16 Cápsulas Caninas/Felinas)"]
            Drawer["CapsuleDetailDrawer.tsx (Apple Bottom Sheet de Huésped)"]
            Table["ReservationsTable.tsx (Filtros, Búsqueda y Check-in/out)"]
            HealthPanel["HealthAuditPanel.tsx (Semáforo de Bioseguridad y Vacunas)"]
        end
    end

    App --> Provider
    Provider --> Selector
    Selector -->|Modo Cliente| HeaderComp
    HeaderComp --> ClientView
    ClientView --> CapsuleCard
    CapsuleCard --> Wizard
    Wizard --> Voucher
    HeaderComp --> LocationModal
    Voucher --> LocationModal

    Selector -->|Modo Ezequiel| Dashboard
    Dashboard --> CapsuleGrid
    Dashboard --> Table
    Dashboard --> HealthPanel
    CapsuleGrid --> Drawer
    Table --> Drawer
```

---

## 4. Estrategia de Concurrencia y Control Anti-Overbooking

Uno de los mayores riesgos en la gestión hotelera es la colisión de fechas (*overbooking*), donde dos usuarios intentan reservar la misma cápsula simultáneamente.

### 4.1. Mecanismo de Bloqueo Pesimista (*Pessimistic Locking*)
En el modelo relacional de producción (PostgreSQL), la confirmación de una reserva se ejecuta mediante una transacción serializada con bloqueo de fila:

```sql
BEGIN TRANSACTION;

-- 1. Verificar disponibilidad y bloquear la cápsula seleccionada
SELECT id, estado 
FROM capsulas 
WHERE id = :capsula_id 
  AND id NOT IN (
      SELECT capsula_id 
      FROM reservas 
      WHERE estado IN ('CONFIRMADA', 'CHECKIN')
        AND (fecha_checkin < :fecha_checkout AND fecha_checkout > :fecha_checkin)
  )
FOR UPDATE;

-- 2. Si la fila no retorna resultados, se aborta la transacción por colisión
-- 3. Si está libre, se inserta la reserva y se actualiza el estado
INSERT INTO reservas (id, codigo, capsula_id, fecha_checkin, fecha_checkout, total, estado)
VALUES (:id, :codigo, :capsula_id, :fecha_checkin, :fecha_checkout, :total, 'CONFIRMADA');

COMMIT;
```

### 4.2. Estrategia de Validación en el Cliente (Optimistic Check)
En la SPA desplegada en el cliente:
1. Al abrir el modal de reserva, se valida que la cápsula continúe en estado `DISPONIBLE`.
2. Al pulsar *"Confirmar Reserva"*, el store local actualiza atómicamente el estado a `RESERVADA`, asignando el `reservaActualId` a la cápsula e impidiendo que otro intento de reserva la seleccione.
3. Si Ezequiel efectúa un *Check-in*, la cápsula transiciona a `OCUPADA`; al realizar el *Check-out*, pasa a `DISPONIBLE` para recibir al siguiente huésped.
