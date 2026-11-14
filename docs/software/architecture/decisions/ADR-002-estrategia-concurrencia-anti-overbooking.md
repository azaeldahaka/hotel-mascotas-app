# ADR-002: Estrategia de Concurrencia y Control Anti-Overbooking

## Estado
Aprobado e Implementado

## Contexto
El hotel dispone de un inventario físico limitado a **16 cápsulas individuales climatizadas** en Salta Capital. Un conflicto de overbooking (dos reservas confirmadas para la misma cápsula en fechas coincidentes) causaría un grave incidente operativo y de confianza para el negocio de Ezequiel.

## Decisión
Se adopta una estrategia de **doble capa de protección**:
1. **En la Base de Datos (PostgreSQL):** Se utiliza el tipo de dato nativo `DATERANGE` con un índice y restricción de exclusión `EXCLUDE USING gist (capsula_id WITH =, rango_estadia WITH &&) WHERE (estado IN ('CONFIRMADA', 'CHECKIN'))`. Esto delega al motor de base de datos la imposibilidad matemática de solapamiento temporal.
2. **En la Aplicación / Cliente:** Mecanismo optimista atómico en el store reactivo que desactiva de inmediato el botón "Reservar" de toda cápsula que transiciona a estado `OCUPADA` o `RESERVADA`, informando visualmente al usuario.

## Consecuencias
* **Positivas:** Cero riesgo de sobreventa de cápsulas a nivel transaccional.
* **Negativas:** La restricción de exclusión GiST requiere la extensión `btree_gist` instalada en PostgreSQL.
