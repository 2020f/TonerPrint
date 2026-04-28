# TonerPrint Backend — Plan de Implementación Completo

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar las piezas faltantes del proyecto TonerPrint y dejarlo listo para despliegue en VPS Hostinger con Node.js + MySQL.

**Architecture:** Next.js 14 fullstack corriendo en VPS Ubuntu 22.04 con PM2 como process manager, Nginx como proxy reverso en puerto 80/443, y MySQL 8.0 local. Imágenes de productos almacenadas en `/public/uploads/products/`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, MySQL (mysql2), JWT (jose), bcryptjs, PM2, Nginx

---

## Mapa de archivos

| Acción | Archivo | Qué hace |
|---|---|---|
| Crear | `app/admin/products/[id]/page.tsx` | Página editar producto — carga producto por ID y muestra ProductForm |
| Modificar | `app/api/products/[id]/image/route.ts` | Agregar `mkdir` recursivo antes de `writeFile` |
| Crear | `public/uploads/products/.gitkeep` | Garantiza que el directorio exista en git |
| Crear | `.env.example` | Plantilla de variables de entorno para el VPS |
| Crear | `ecosystem.config.js` | Configuración PM2 para producción |
| Modificar | `next.config.mjs` | Migrar `domains` deprecado a `remotePatterns` |

---

## Task 1: Página editar producto

**Files:**
- Create: `app/admin/products/[id]/page.tsx`

- [ ] **Step 1: Crear la página de edición**

```typescript
// app/admin/products/[id]/page.tsx
import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const products = await query<any[]>(
    'SELECT * FROM products WHERE id = ?',
    [params.id]
  ).catch(() => []);

  if (!products.length) notFound();

  const product = products[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Productos
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-black text-gray-900">Editar producto</h1>
      </div>
      <ProductForm product={product} isEdit />
    </div>
  );
}
```

- [ ] **Step 2: Verificar que la tabla de productos enlace a /admin/products/[id]**

Revisar `components/admin/ProductsTable.tsx` — debe tener un botón editar que apunte a `/admin/products/${product.id}`. Si no existe, buscar el botón de editar y confirmar la ruta.

- [ ] **Step 3: Commit**

```bash
git add app/admin/products/[id]/page.tsx
git commit -m "feat: agregar página editar producto en admin"
```

---

## Task 2: Corregir subida de imágenes (mkdir recursivo)

**Files:**
- Modify: `app/api/products/[id]/image/route.ts`

- [ ] **Step 1: Agregar import mkdir y crear directorio antes de escribir**

Reemplazar el contenido actual de `app/api/products/[id]/image/route.ts` con:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { query } from '@/lib/db';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó imagen' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `product-${params.id}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    const filePath = path.join(uploadDir, filename);

    // Crear directorio si no existe
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    const url = `/uploads/products/${filename}`;
    await query('UPDATE products SET image_url = ? WHERE id = ?', [url, params.id]);

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Crear directorio uploads con .gitkeep**

```bash
mkdir -p public/uploads/products
touch public/uploads/products/.gitkeep
```

Agregar al `.gitignore` (o crear si no existe):
```
# Uploads — ignorar archivos pero mantener directorio
public/uploads/products/*
!public/uploads/products/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add app/api/products/[id]/image/route.ts public/uploads/products/.gitkeep .gitignore
git commit -m "fix: mkdir recursivo en upload de imágenes, agregar directorio uploads"
```

---

## Task 3: Corregir next.config.mjs (remotePatterns)

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Migrar domains deprecado a remotePatterns**

Reemplazar el contenido de `next.config.mjs` con:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mediumblue-porpoise-731818.hostingersite.com' },
      { protocol: 'https', hostname: 'rosybrown-ant-681893.hostingersite.com' },
      { protocol: 'http',  hostname: 'localhost' },
    ],
  },
  optimizeFonts: false,
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.mjs
git commit -m "chore: migrar images.domains a remotePatterns en next.config"
```

---

## Task 4: Crear .env.example

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Crear plantilla de variables de entorno**

```bash
# .env.example — copiar a .env.local y completar valores
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tonerprint_db
DB_USER=tonerprint_user
DB_PASSWORD=CAMBIAR_POR_PASSWORD_SEGURO

JWT_SECRET=CAMBIAR_POR_STRING_ALEATORIO_LARGO_64_CARACTERES

NODE_ENV=production
PORT=3000

# URL pública del sitio (sin slash al final)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

- [ ] **Step 2: Asegurarse que .env.local esté en .gitignore**

Verificar que `.gitignore` contiene:
```
.env.local
.env.production.local
.env*.local
```

- [ ] **Step 3: Commit**

```bash
git add .env.example .gitignore
git commit -m "chore: agregar .env.example con variables requeridas para VPS"
```

---

## Task 5: Crear ecosystem.config.js para PM2

**Files:**
- Create: `ecosystem.config.js`

- [ ] **Step 1: Crear configuración PM2**

```javascript
// ecosystem.config.js — configuración PM2 para producción en VPS
module.exports = {
  apps: [
    {
      name: 'tonerprint',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
```

- [ ] **Step 2: Crear directorio logs con .gitkeep**

```bash
mkdir -p logs
touch logs/.gitkeep
echo "logs/*.log" >> .gitignore
```

- [ ] **Step 3: Commit**

```bash
git add ecosystem.config.js logs/.gitkeep .gitignore
git commit -m "chore: agregar ecosystem.config.js para PM2 en VPS"
```

---

## Task 6: Verificar ProductsTable tiene enlace de edición

**Files:**
- Read: `components/admin/ProductsTable.tsx`

- [ ] **Step 1: Leer el componente y buscar el botón editar**

Abrir `components/admin/ProductsTable.tsx` y verificar que el botón de editar apunte a `/admin/products/${product.id}`. Si apunta a otro lado o no existe, agregar:

```tsx
import Link from 'next/link';
// ...dentro de la fila de la tabla:
<Link
  href={`/admin/products/${product.id}`}
  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
  title="Editar"
>
  <Pencil className="w-4 h-4" />
</Link>
```

- [ ] **Step 2: Commit si hubo cambios**

```bash
git add components/admin/ProductsTable.tsx
git commit -m "fix: enlazar botón editar de ProductsTable a /admin/products/[id]"
```

---

## Task 7: Build de producción y verificación local

- [ ] **Step 1: Instalar dependencias**

```bash
npm install
```

Resultado esperado: `added N packages` sin errores.

- [ ] **Step 2: Build de producción**

```bash
npm run build
```

Resultado esperado: `✓ Compiled successfully` o similar, sin errores TypeScript.

Si hay errores de TypeScript, corregirlos antes de continuar.

- [ ] **Step 3: Verificar que el build arranca**

```bash
node server.js
```

Abrir `http://localhost:3000` — debe cargar la tienda.
Abrir `http://localhost:3000/login` — debe mostrar login.
Abrir `http://localhost:3000/admin` — debe redirigir a `/login`.

Detener con `Ctrl+C`.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "chore: proyecto listo para despliegue en VPS"
```

---

## Resultado Final — Estado del proyecto

Cuando se completen estas 7 tareas, el proyecto tendrá:

### Panel Admin completo
| Ruta | Estado |
|---|---|
| `/admin` | Dashboard con stats, pedidos recientes, bajo stock |
| `/admin/products` | Tabla de productos con búsqueda y filtros |
| `/admin/products/new` | Crear producto con specs, precio, stock, badge |
| `/admin/products/[id]` | Editar producto + subir imagen |
| `/admin/orders` | Tabla de pedidos con filtro por estado |
| `/admin/orders/[id]` | Detalle pedido + cambiar estado |
| `/admin/users` | Lista de usuarios registrados |

### API completa
| Endpoint | Método | Función |
|---|---|---|
| `/api/auth/login` | POST | Login con JWT |
| `/api/auth/logout` | POST | Cerrar sesión |
| `/api/auth/me` | GET | Sesión actual |
| `/api/products` | GET, POST | Listar / crear productos |
| `/api/products/[id]` | GET, PUT, DELETE | Producto por ID |
| `/api/products/[id]/image` | POST | Subir imagen |
| `/api/orders` | GET, POST | Listar / crear pedidos |
| `/api/orders/[id]` | GET | Detalle con items |
| `/api/orders/[id]/status` | PATCH | Cambiar estado |
| `/api/users` | GET, POST | Listar / crear usuarios |
| `/api/users/[id]` | GET, PUT, DELETE | Usuario por ID |
| `/api/seed` | POST | Solo dev — poblar BD |

### Listo para VPS
- `ecosystem.config.js` para PM2
- `.env.example` con todas las variables
- `public/uploads/products/` para imágenes locales
- `server.js` para Node.js en producción
- `lib/schema.sql` para crear la BD en MySQL

---

## Guía de despliegue VPS (para después del código)

Esta sección es referencia — ejecutar DESPUÉS de completar las tareas de código.

### 1. Contratar VPS Hostinger
- Plan: KVM 2 (2 CPU, 8GB RAM) o KVM 1 (1 CPU, 4GB RAM) es suficiente
- OS: Ubuntu 22.04 LTS
- Guardar: IP del servidor, usuario root, contraseña

### 2. Conectar al VPS
```bash
ssh root@TU_IP_VPS
```

### 3. Instalar dependencias del servidor
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar
node --version   # debe ser v20.x.x
npm --version

# Instalar MySQL 8.0
apt install -y mysql-server

# Instalar Nginx y Git
apt install -y nginx git

# Instalar PM2 globalmente
npm install -g pm2
```

### 4. Configurar MySQL
```bash
# Asegurar instalación MySQL
mysql_secure_installation
# Responder: Y, Y, Y, Y, Y

# Entrar a MySQL
mysql -u root -p

# Crear base de datos y usuario
CREATE DATABASE tonerprint_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tonerprint_user'@'localhost' IDENTIFIED BY 'TU_PASSWORD_SEGURO';
GRANT ALL PRIVILEGES ON tonerprint_db.* TO 'tonerprint_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Importar schema
mysql -u tonerprint_user -p tonerprint_db < /var/www/tonerprint/lib/schema.sql
```

### 5. Subir el proyecto al VPS
```bash
# Crear directorio
mkdir -p /var/www/tonerprint
cd /var/www/tonerprint

# Opción A: clonar desde GitHub
git clone https://github.com/TU_USUARIO/TU_REPO.git .

# Opción B: subir por SFTP (con FileZilla u otro cliente)
# Conectar: host=TU_IP, usuario=root, puerto=22
# Subir toda la carpeta del proyecto a /var/www/tonerprint
```

### 6. Configurar variables de entorno
```bash
cd /var/www/tonerprint
cp .env.example .env.local
nano .env.local
```

Llenar con:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tonerprint_db
DB_USER=tonerprint_user
DB_PASSWORD=TU_PASSWORD_SEGURO
JWT_SECRET=genera-uno-con: openssl rand -base64 64
NODE_ENV=production
PORT=3000
```

### 7. Instalar dependencias y hacer build
```bash
cd /var/www/tonerprint
npm install
npm run build
```

### 8. Crear directorio de uploads
```bash
mkdir -p /var/www/tonerprint/public/uploads/products
chmod 755 /var/www/tonerprint/public/uploads/products
```

### 9. Arrancar con PM2
```bash
cd /var/www/tonerprint
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # ejecutar el comando que PM2 muestre
```

Verificar: `pm2 status` — debe mostrar `tonerprint` en `online`.

### 10. Configurar Nginx como proxy reverso
```bash
nano /etc/nginx/sites-available/tonerprint
```

Pegar:
```nginx
server {
    listen 80;
    server_name TU_DOMINIO.com www.TU_DOMINIO.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
ln -s /etc/nginx/sites-available/tonerprint /etc/nginx/sites-enabled/
nginx -t        # verificar configuración
systemctl reload nginx
```

### 11. SSL gratuito con Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d TU_DOMINIO.com -d www.TU_DOMINIO.com
# Seguir instrucciones — ingresa email, acepta términos
```

### 12. Seed inicial de datos
Abrir en navegador: `https://TU_DOMINIO.com/api/seed` con método POST (solo funciona en dev — para producción usar phpMyAdmin o MySQL CLI con el schema.sql).

O conectarse a MySQL y ejecutar el seed manualmente.

### Credenciales por defecto (del seed)
```
Admin: admin@tonerprint.com / admin123
User:  usuario@tonerprint.com / user123
```

**IMPORTANTE: Cambiar estas contraseñas en producción desde el panel admin.**
