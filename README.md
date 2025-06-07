# 💊 Sistema de Gestión de Farmacia - App FullStack con Next.js + Prisma

Este proyecto implementa una aplicación CRUD completa para gestionar **medicamentos**, **laboratorios**, **órdenes de compra** y **detalles de órdenes**, desarrollada con:

- **Frontend**: Next.js + React + TailwindCSS + Headless UI
- **Backend**: API REST con Next.js API Routes + Prisma ORM
- **Base de datos**: MySQL
- **ORM**: Prisma
- **Diseño**: Colores corporativos naranja, blanco y negro

---

## 📦 Características principales

### 🔐 Autenticación
- Login simple sin tokens
- Validación de credenciales: `admin / 1234`

### 🧪 Módulos implementados

#### ✅ Medicamentos
- Lista en tabla con acción de ver, editar, eliminar
- Modal para agregar nuevo medicamento
- Campos: descripción, presentación, stock, precios, marca, fechas

#### ✅ Laboratorios
- CRUD básico en tabla
- Campos: razón social, dirección, teléfono, correo, contacto

#### ✅ Órdenes de Compra
- Lista con información general y detalles
- Modal para registrar nueva orden
- Modal para visualizar laboratorio asociado y los ítems

#### ✅ Detalles de Orden
- Tabla con medicamentos y orden asociados
- Cálculo automático del monto (`cantidad * precio`)
- Modales para ver, editar y eliminar

---

## 🛠️ Instalación

1. **Clonar repositorio**

```bash
git clone https://github.com/tuusuario/farmacia-app.git
cd farmacia-app
Instalar dependencias

bash
Copiar
Editar
npm install
Configurar la base de datos

Crear archivo .env:

env
Copiar
Editar
DATABASE_URL="mysql://usuario:clave@localhost:3306/bd_Farmacia"
Ejecutar migraciones

bash
Copiar
Editar
npx prisma migrate dev --name init
Levantar la app

bash
Copiar
Editar
npm run dev
📁 Estructura de carpetas
bash
Copiar
Editar
/src
  /app
    /login         ← Página de inicio de sesión
    /dashboard     ← Vista principal
    /medicamentos  ← CRUD de medicamentos
    /laboratorios  ← CRUD de laboratorios
    /ordenes       ← CRUD de órdenes de compra
    /detalles      ← CRUD de detalles
  /components      ← Navbar, botones, tablas
  /pages/api       ← API REST para cada entidad
/prisma/schema.prisma
📷 Capturas
Puedes incluir aquí imágenes de cada módulo mostrando las funcionalidades.

✨ Estilos
Tailwind CSS con personalización visual usando:

Color principal: #f97316 (naranja)

Blanco como fondo

Negro para textos e iconografía

👨‍💻 Autor
Desarrollado por [Tu Nombre] como parte de evaluación de proyecto FullStack en [Nombre del Curso o Institución].