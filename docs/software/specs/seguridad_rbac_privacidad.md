# 🛡️ Seguridad, Control de Acceso (RBAC) y Privacidad
## Plataforma Web Hotel Cápsula para Mascotas - Salta Capital
**Normativa de Aplicación:** Ley 25.326 de Protección de Datos Personales (Argentina) / OWASP Top 10  
**Fecha:** Noviembre 2026  

---

## 1. Matriz de Control de Acceso Basado en Roles (RBAC)

El sistema define tres perfiles de autorización estrictos con principio de mínimo privilegio:

| Recurso / Operación | 👤 Cliente (Turista / Residente) | 🛎️ Operador / Staff Hotel | 👑 Ezequiel (Administrador) |
| :--- | :---: | :---: | :---: |
| **Explorar catálogo de cápsulas y precios** | ✅ Permitido | ✅ Permitido | ✅ Permitido |
| **Crear y cotizar nueva reserva** | ✅ Permitido | ✅ Permitido | ✅ Permitido |
| **Consultar voucher propio** | ✅ Solo su reserva | ✅ Todas | ✅ Todas |
| **Ver streaming de cámara en vivo** | ✅ Solo su cápsula (durante estadía) | ✅ Todas | ✅ Todas |
| **Ejecutar Check-in / Check-out** | ❌ Denegado | ✅ Permitido | ✅ Permitido |
| **Añadir servicios extra a reserva** | ❌ Solo al reservar | ✅ Permitido en caliente | ✅ Permitido en caliente |
| **Visualizar KPIs financieros e ingresos** | ❌ Denegado | ❌ Denegado | ✅ Permitido |
| **Modificar tarifas base de cápsulas** | ❌ Denegado | ❌ Denegado | ✅ Permitido |
| **Restablecer datos demo / Auditoría** | ❌ Denegado | ❌ Denegado | ✅ Permitido |

---

## 2. Seguridad del Streaming de Video (WebRTC / HLS)

Para garantizar la intimidad de las mascotas y la seguridad de las instalaciones físicas en Tres Cerritos:

1. **Tokens Efímeros de Sesión:**
   * Cada reserva genera un token criptográfico único (`webcamToken`).
   * El token solo se habilita a partir del momento exacto del **Check-in** y queda revocado automáticamente al procesar el **Check-out**.
2. **Firmado Criptográfico (HMAC-SHA256):**
   * El enlace al player de video incluye una firma temporal con expiración de 60 minutos que se renueva automáticamente mediante token rotativo.
3. **Aislamiento de Flujos:**
   * Un cliente asignado a la cápsula `C-01` bajo ninguna circunstancia puede solicitar o visualizar el feed de video de la cápsula `C-02` ni de las áreas restringidas de personal.

---

## 3. Protección de Datos y Privacidad (Ley 25.326 Argentina)

* **Datos de Contacto:** El número telefónico y correo del dueño se emplean exclusivamente para la confirmación de la estadía por WhatsApp y notificaciones de emergencia veterinaria.
* **Documentación Sanitaria:** Las fotos de cartillas de vacunación se almacenan en buckets privados con URLs prefirmadas de corta duración.
* **Almacenamiento Local (LocalFirst):** En el modo MVP, la información persiste en el navegador del dispositivo sin retransmitirse a intermediarios no autorizados.

---

## 4. Encabezados de Seguridad HTTP (Security Headers)

En la configuración de despliegue (`vercel.json`), se implementan las siguientes cabeceras recomendadas por OWASP:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(self), microphone=()" }
      ]
    }
  ]
}
```
