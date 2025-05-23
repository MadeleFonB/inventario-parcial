#Sistema de Gestión de Inventario con Autenticación

Proyecto desarrollado como parte del parcial para implementar un sistema backend con autenticación, control de inventarios y gestión de productos.

## Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Dotenv
- Postman (para pruebas)

## Como iniciar el proyecto
# 1. Clonar el repositorio
git clone https://github.com/MadeleFonB/inventario-parcial.git

# 2. Entrar al directorio del proyecto
cd inventario-parcial

# 3. Instalar dependencias
npm install

# 4. Crear archivo .env
# Ejemplo:
      PORT=3001
      MONGO_URI=mongodb://localhost:27017/ecommerce
      JWT_SECRET=supersecreto

# 5. Iniciar el servidor
npm start


## Autenticación

### Registro de usuario
`POST /api/user/register`

Crea un nuevo usuario.

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}

## Login
POST /api/user/login

Devuelve un token JWT para autenticación.

{
  "email": "juan@example.com",
  "password": "123456"
}

## CRUD de Productos

Ruta base: /api/products
# Obtener todos los productos (público)
GET /api/products

# Obtener un producto por ID (público)
GET /api/products/:id

# Crear producto (protegido)
POST /api/products
Token requerido en el header Authorization

{
  "name": "Laptop Lenovo",
  "stock": 10,
  "minStock": 2
}
# Actualizar producto (protegido)
PUT /api/products/:id

# Eliminar producto (protegido)
DELETE /api/products/:id

# Registro de Movimientos de Inventario

Ruta base: /api/inventory
POST /api/inventory
Token requerido

{
  "productId": "ID del producto",
  "type": "entrada | salida",
  "quantity": 5
}
Valida el stock antes de permitir una salida.
Registra quién hizo la operación mediante el token.


# Modelos principales

User: nombre, email, contraseña (encriptada)
Product: nombre, stock actual, stock mínimo
InventoryLog: producto, tipo (entrada/salida), cantidad, usuario

# Estructura del proyecto

├── models/
│   ├── User.js
│   ├── Product.js
│   └── InventoryLog.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── inventory.js
├── middleware/
│   └── auth.js
├── .env
├── index.js
└── README.md
