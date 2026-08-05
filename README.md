# Restaurant Management System (RMS)

Aplicación web para gestionar las operaciones diarias de un restaurante: mesas, pedidos, menú y estados de atención, pensada como proyecto full stack con React, Node, Express y MongoDB.

---

## 🎯 Qué quiero construir

El objetivo es tener un sistema donde el equipo del restaurante pueda:

- Ver todas las mesas y su estado (libre, ocupada, pendiente).
- Crear y gestionar pedidos por mesa (platos, bebidas, cantidades, total a pagar).
- Gestionar el menú (categorías, precios, disponibilidad).
- Controlar reservas y cierre de cuentas desde una vista central.

Todo orientado a restaurantes pequeños/medianos que necesitan algo más organizado que hojas de papel o procesos improvisados.

---

## 👥 Roles y paneles

La aplicación tendrá tres tipos de usuario internos:

- **Admin**  
  - Gestiona usuarios del sistema y configura el menú y sus precios.
- **Staff (camareros)**  
  - Gestionan mesas y comandas, añaden platos a las mesas y siguen el servicio.
- **Reception**  
  - Controla reservas, estado de las mesas y pagos, y puede marcar disponibilidad de platos.

Cada rol tendrá su propio panel y rutas en el frontend, con acceso controlado por autenticación.

---

## 🧩 Funcionalidades clave previstas

En la versión que quiero terminar:

- Gestión de mesas:
  - Ver estado de todas las mesas y su capacidad.
- Gestión de pedidos:
  - Crear pedidos por mesa, añadir/editar ítems y ver el subtotal.
- Gestión de menú:
  - CRUD básico de platos y bebidas, con categorías y flag de disponibilidad.
- Cierre de cuentas:
  - Vista para recepción donde se pueda revisar el pedido de una mesa y marcar el pago.
- Opcional si hay tiempo:
  - Módulo de reservas.
  - Módulo básico de inventario.

---

## 🛠️ Stack previsto

- **Frontend**: React + React Router + Bootstrap/Tailwind.
- **Backend**: Node.js + Express.
- **Base de datos**: MongoDB (Mongoose).
- **Auth**: Usuarios internos con roles (admin, staff, reception).

El objetivo final es tener un RMS sencillo pero completo, que demuestre autenticación, roles, CRUD de datos y una interfaz clara para operar el restaurante.
