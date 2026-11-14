-- ============================================================================
-- ESQUEMA FÍSICO DDL (PostgreSQL 15+)
-- Proyecto: Hotel Cápsula para Mascotas - Salta Capital (Barrio Tres Cerritos)
-- Arquitectura: Relacional ACID con Prevención Férrea de Overbooking (GiST)
-- ============================================================================

-- 1. Extensiones requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist"; -- Requerido para exclusion constraints en rangos de fechas

-- 2. Tipos Enumerados del Dominio
CREATE TYPE tipo_especie AS ENUM ('DOG', 'CAT');
CREATE TYPE estado_capsula AS ENUM ('DISPONIBLE', 'OCUPADA', 'RESERVADA', 'MANTENIMIENTO');
CREATE TYPE categoria_capsula AS ENUM ('Standard', 'Deluxe', 'Master Penthouse');
CREATE TYPE tipo_servicio AS ENUM ('HOSPEDAJE', 'DAYCARE');
CREATE TYPE estado_reserva AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CHECKIN', 'COMPLETADA', 'CANCELADA');
CREATE TYPE temperamento_mascota AS ENUM ('Sociable', 'Tranquilo', 'Miedoso', 'Enérgico');

-- 3. Tabla: Usuarios / Dueños de Mascotas
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_completo VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    es_turista BOOLEAN DEFAULT FALSE,
    ciudad_origen VARCHAR(100) DEFAULT 'Salta',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: Cápsulas Físicas (16 Unidades en Barrio Tres Cerritos)
CREATE TABLE capsulas (
    id VARCHAR(10) PRIMARY KEY, -- 'C-01' a 'C-10', 'F-01' a 'F-06'
    codigo VARCHAR(20) UNIQUE NOT NULL, -- 'CAN-01', 'FEL-01'
    nombre VARCHAR(100) NOT NULL,
    especie tipo_especie NOT NULL,
    categoria categoria_capsula NOT NULL DEFAULT 'Standard',
    precio_noche NUMERIC(10, 2) NOT NULL CHECK (precio_noche > 0),
    precio_hora_daycare NUMERIC(10, 2) NOT NULL CHECK (precio_hora_daycare > 0),
    capacidad_kg_max NUMERIC(5, 2) NOT NULL CHECK (capacidad_kg_max > 0),
    estado estado_capsula NOT NULL DEFAULT 'DISPONIBLE',
    tiene_camara_hd BOOLEAN DEFAULT TRUE,
    tiene_climatizacion BOOLEAN DEFAULT TRUE,
    aislamiento_acustico BOOLEAN DEFAULT TRUE,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla: Mascotas Huéspedes
CREATE TABLE mascotas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    especie tipo_especie NOT NULL,
    raza VARCHAR(100) NOT NULL,
    edad VARCHAR(50),
    peso_kg NUMERIC(5, 2) NOT NULL CHECK (peso_kg > 0),
    temperamento temperamento_mascota DEFAULT 'Sociable',
    alergias_notas TEXT,
    medicacion TEXT DEFAULT 'Ninguna',
    vacuna_antirrabica BOOLEAN NOT NULL DEFAULT FALSE,
    vacuna_sextuple_o_triple BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabla: Catálogo de Servicios Extra (Upselling)
CREATE TABLE servicios_extra (
    id VARCHAR(50) PRIMARY KEY, -- 'spa-banio', 'pet-taxi', etc.
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio_precio >= 0),
    unidad VARCHAR(50) NOT NULL, -- 'por sesion', 'por trayecto'
    especie_aplicable VARCHAR(10) NOT NULL DEFAULT 'AMBOS' CHECK (especie_aplicable IN ('DOG', 'CAT', 'AMBOS')),
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE
);

-- 7. Tabla: Reservas con Restricción de Exclusión Anti-Overbooking
CREATE TABLE reservas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(20) UNIQUE NOT NULL, -- 'SALTA-8901'
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    mascota_id UUID NOT NULL REFERENCES mascotas(id),
    capsula_id VARCHAR(10) NOT NULL REFERENCES capsulas(id),
    tipo_servicio tipo_servicio NOT NULL DEFAULT 'HOSPEDAJE',
    fecha_checkin DATE NOT NULL,
    fecha_checkout DATE NOT NULL,
    horas_daycare INTEGER CHECK (horas_daycare BETWEEN 1 AND 24),
    rango_estadia DATERANGE GENERATED ALWAYS AS (DATERANGE(fecha_checkin, fecha_checkout, '[)')) STORED,
    subtotal_hospedaje NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_extras NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    estado estado_reserva NOT NULL DEFAULT 'CONFIRMADA',
    webcam_token VARCHAR(120),
    notas_especiales TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Regla de Integridad de Negocio: Check-out debe ser igual o posterior a Check-in
    CONSTRAINT chk_fechas_validas CHECK (fecha_checkout >= fecha_checkin),

    -- REGLA CRÍTICA DE CONCURRENCIA: Ninguna cápsula puede tener solapamiento de fechas si la reserva está activa
    CONSTRAINT no_overbooking_capsula EXCLUDE USING gist (
        capsula_id WITH =,
        rango_estadia WITH &&
    ) WHERE (estado IN ('CONFIRMADA', 'CHECKIN'))
);

-- 8. Tabla Intermedia: Servicios Extra por Reserva
CREATE TABLE reserva_servicios_extra (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reserva_id UUID NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    servicio_extra_id VARCHAR(50) NOT NULL REFERENCES servicios_extra(id),
    precio_aplicado NUMERIC(10, 2) NOT NULL,
    notas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Índices de Rendimiento
CREATE INDEX idx_reservas_capsula ON reservas(capsula_id);
CREATE INDEX idx_reservas_fechas ON reservas(fecha_checkin, fecha_checkout);
CREATE INDEX idx_mascotas_usuario ON mascotas(usuario_id);
CREATE INDEX idx_capsulas_especie_estado ON capsulas(especie, estado);

-- ============================================================================
-- DATOS SEMILLA (16 Cápsulas Físicas en Barrio Tres Cerritos, Salta)
-- ============================================================================

INSERT INTO capsulas (id, codigo, nombre, especie, categoria, precio_noche, precio_hora_daycare, capacidad_kg_max, estado) VALUES
-- 10 Cápsulas Caninas
('C-01', 'CAN-01', 'Cápsula Suite Canina C-01', 'DOG', 'Master Penthouse', 28000.00, 4500.00, 35.00, 'OCUPADA'),
('C-02', 'CAN-02', 'Cápsula Suite Canina C-02', 'DOG', 'Deluxe', 22000.00, 3800.00, 25.00, 'OCUPADA'),
('C-03', 'CAN-03', 'Cápsula Suite Canina C-03', 'DOG', 'Deluxe', 22000.00, 3800.00, 25.00, 'RESERVADA'),
('C-04', 'CAN-04', 'Cápsula Canina Standard C-04', 'DOG', 'Standard', 17500.00, 3000.00, 15.00, 'DISPONIBLE'),
('C-05', 'CAN-05', 'Cápsula Canina Standard C-05', 'DOG', 'Standard', 17500.00, 3000.00, 15.00, 'OCUPADA'),
('C-06', 'CAN-06', 'Cápsula Suite Canina C-06', 'DOG', 'Deluxe', 22000.00, 3800.00, 25.00, 'DISPONIBLE'),
('C-07', 'CAN-07', 'Cápsula Canina Standard C-07', 'DOG', 'Standard', 17500.00, 3000.00, 18.00, 'OCUPADA'),
('C-08', 'CAN-08', 'Cápsula Canina Standard C-08', 'DOG', 'Standard', 17500.00, 3000.00, 18.00, 'DISPONIBLE'),
('C-09', 'CAN-09', 'Cápsula Canina Standard C-09', 'DOG', 'Standard', 17500.00, 3000.00, 15.00, 'DISPONIBLE'),
('C-10', 'CAN-10', 'Cápsula Suite Canina C-10', 'DOG', 'Master Penthouse', 28000.00, 4500.00, 45.00, 'DISPONIBLE'),
-- 6 Torres Felinas
('F-01', 'FEL-01', 'Torre Cápsula Felina F-01', 'CAT', 'Master Penthouse', 24000.00, 3600.00, 10.00, 'OCUPADA'),
('F-02', 'FEL-02', 'Torre Cápsula Felina F-02', 'CAT', 'Deluxe', 19500.00, 3200.00, 9.00, 'OCUPADA'),
('F-03', 'FEL-03', 'Cápsula Felina Standard F-03', 'CAT', 'Standard', 15500.00, 2700.00, 8.00, 'DISPONIBLE'),
('F-04', 'FEL-04', 'Torre Cápsula Felina F-04', 'CAT', 'Deluxe', 19500.00, 3200.00, 9.00, 'DISPONIBLE'),
('F-05', 'FEL-05', 'Cápsula Felina Standard F-05', 'CAT', 'Standard', 15500.00, 2700.00, 8.00, 'OCUPADA'),
('F-06', 'FEL-06', 'Cápsula Felina Standard F-06', 'CAT', 'Standard', 15500.00, 2700.00, 8.00, 'DISPONIBLE');

INSERT INTO servicios_extra (id, nombre, precio, unidad, especie_aplicable, descripcion) VALUES
('spa-banio', 'Pet Spa & Baño Ozonizado', 8500.00, 'por sesión', 'AMBOS', 'Baño terapéutico desestresante, secado silencioso y corte higiénico.'),
('pet-taxi', 'Pet Taxi Salta (Traslado Seguro)', 6000.00, 'por trayecto', 'AMBOS', 'Recogida o entrega puerta a puerta en vehículo climatizado con transportadora fija.'),
('piscina-canina', 'Piscina & Agility Guiado', 5000.00, 'por sesión 45 min', 'DOG', 'Hidroterapia y recreación acuática con instructor.'),
('menu-gourmet', 'Nutrición Premium / Menú Barf', 3500.00, 'por ración diaria', 'AMBOS', 'Alimento orgánico húmedo de alta palatabilidad supervisado por veterinarios.');
