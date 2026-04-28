import mysql, { type Connection } from 'mysql2/promise';
import bcryptjs from 'bcryptjs';

const seedProducts = [
  { name: 'Tóner HP 85A Negro CE285A', brand: 'hp', type: 'toner', price: 1850, old_price: 2200, stock: 45, description: 'Tóner original HP 85A para LaserJet P1102, P1102w, M1132, M1212nf. Impresión profesional con rendimiento de hasta 1,600 páginas.', specs: [['Modelo','CE285A'],['Rendimiento','1,600 págs.'],['Color','Negro'],['Compatible','HP P1102, M1212']], emoji: '🖨️', badge: 'sale' },
  { name: 'Tinta Epson T664 Pack 4 Colores', brand: 'epson', type: 'tinta', price: 890, old_price: null, stock: 120, description: 'Pack original Epson T664 para L100, L200, L300, L355, L550. Alta calidad y durabilidad en cada impresión a color.', specs: [['Modelo','T664120-BCS'],['Contenido','70ml c/u'],['Colores','C, M, Y, K'],['Páginas','~4,500 (negro)']], emoji: '🎨', badge: 'hot' },
  { name: 'Impresora Canon PIXMA MG2510', brand: 'canon', type: 'impresora', price: 4500, old_price: 5200, stock: 15, description: 'Impresora multifunción Canon PIXMA MG2510 para uso doméstico y oficinas pequeñas. Imprime, copia y escanea.', specs: [['Tipo','Inyección de tinta'],['Resolución','4800×600 dpi'],['Velocidad','8 ppm (negro)'],['Conectividad','USB']], emoji: '🖨️', badge: 'sale' },
  { name: 'Tóner Brother TN-760 Negro', brand: 'brother', type: 'toner', price: 2100, old_price: null, stock: 30, description: 'Tóner original Brother TN-760 alta capacidad para DCP-L2550DW, HL-L2350DW, MFC-L2710DW. Impresión nítida.', specs: [['Modelo','TN-760'],['Rendimiento','3,000 págs.'],['Color','Negro'],['Compatible','HL-L2350DW, MFC-L2710DW']], emoji: '💼', badge: 'new' },
  { name: 'Tinta HP 664 Negra F6V29AL', brand: 'hp', type: 'tinta', price: 420, old_price: 520, stock: 200, description: 'Cartucho original HP 664 negro para DeskJet 1115, 2135, 3635, 3835. Calidad HP garantizada en cada impresión.', specs: [['Modelo','F6V29AL'],['Contenido','2ml'],['Páginas','~120 págs.'],['Compatible','HP DeskJet 664']], emoji: '🖊️', badge: 'sale' },
  { name: 'Impresora Epson EcoTank L3150', brand: 'epson', type: 'impresora', price: 8900, old_price: 10500, stock: 8, description: 'Multifunción Epson EcoTank L3150 con WiFi y sistema de tinta integrado. Ahorra hasta 90% en costos de impresión.', specs: [['Tipo','EcoTank (tinta)'],['Resolución','5760×1440 dpi'],['WiFi','Sí'],['Funciones','Imprimir, Copiar, Escanear']], emoji: '🖨️', badge: 'sale' },
  { name: 'Tóner HP 26A CF226A Negro', brand: 'hp', type: 'toner', price: 2750, old_price: null, stock: 22, description: 'Tóner original HP 26A para LaserJet Pro M402, MFP M426. Impresión profesional en blanco y negro de alta calidad.', specs: [['Modelo','CF226A'],['Rendimiento','3,100 págs.'],['Color','Negro'],['Compatible','HP M402, M426']], emoji: '🖨️', badge: null },
  { name: 'Impresora HP LaserJet M15w WiFi', brand: 'hp', type: 'impresora', price: 5800, old_price: 6500, stock: 12, description: 'Impresora HP LaserJet Pro M15w inalámbrica ultra compacta. Ideal para hogar y oficina pequeña con impresión WiFi.', specs: [['Tipo','Láser monocromática'],['Velocidad','19 ppm'],['WiFi','Sí'],['Memoria','8MB']], emoji: '🖨️', badge: 'sale' },
  { name: 'Tinta Canon PG-745 Negra', brand: 'canon', type: 'tinta', price: 650, old_price: 780, stock: 85, description: 'Cartucho original Canon PG-745 para PIXMA MG2470, MG2570, MG2970, MX497, IP2870. Texto nítido y duradero.', specs: [['Modelo','PG-745'],['Contenido','9ml'],['Páginas','~180 págs.'],['Color','Negro']], emoji: '🎯', badge: 'sale' },
  { name: 'Drum Brother DR-730', brand: 'brother', type: 'accesorio', price: 1900, old_price: null, stock: 18, description: 'Unidad de tambor original Brother DR-730. Máximo rendimiento para impresoras HL-L2350DW, DCP-L2550DW, MFC-L2710DW.', specs: [['Modelo','DR-730'],['Rendimiento','12,000 págs.'],['Compatible','Brother L2300 Series'],['Tipo','Unidad de drum']], emoji: '⚙️', badge: 'new' },
  { name: 'Cable USB 2.0 para Impresora 1.8m', brand: 'hp', type: 'accesorio', price: 180, old_price: null, stock: 300, description: 'Cable USB tipo A-B de 1.8 m para impresoras. Compatible con HP, Epson, Canon y Brother. Cobre de alta pureza.', specs: [['Longitud','1.8 metros'],['Tipo','USB-A a USB-B'],['Velocidad','USB 2.0'],['Material','Cobre puro']], emoji: '🔌', badge: null },
  { name: 'Tóner Canon 104 Negro ImageClass', brand: 'canon', type: 'toner', price: 1600, old_price: 1950, stock: 35, description: 'Tóner original Canon 104 para ImageClass MF4010, MF4012, MF4150, MF4270. Alta calidad.', specs: [['Modelo','FX-9/FX-10/104'],['Rendimiento','2,000 págs.'],['Color','Negro'],['Series','ImageClass MF4000']], emoji: '🖨️', badge: 'sale' },
];

export async function initDatabase() {
  let conn: Connection | null = null;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'tonerprint_db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: false,
      connectTimeout: 10000,
    });

    console.log('[TonerPrint] Inicializando base de datos...');

    // ── Tablas ──────────────────────────────────────────────────────
    await conn.execute(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin','user') DEFAULT 'user',
      phone VARCHAR(50),
      address TEXT,
      avatar VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      brand ENUM('hp','epson','canon','brother') NOT NULL,
      type ENUM('toner','tinta','impresora','accesorio') NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      old_price DECIMAL(10,2) NULL,
      stock INT DEFAULT 0,
      description TEXT,
      specs JSON,
      image_url VARCHAR(500),
      emoji VARCHAR(10) DEFAULT '🖨️',
      badge ENUM('sale','hot','new') NULL,
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_number VARCHAR(30) UNIQUE NOT NULL,
      user_id INT NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50),
      customer_address TEXT NOT NULL,
      payment_method ENUM('card','transfer','delivery') NOT NULL,
      status ENUM('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
      subtotal DECIMAL(10,2) NOT NULL,
      shipping DECIMAL(10,2) DEFAULT 0,
      total DECIMAL(10,2) NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )`);

    await conn.execute(`CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      product_price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )`);

    // ── Seed usuarios (solo si no existen) ──────────────────────────
    const [existingUsers] = await conn.execute<any[]>('SELECT COUNT(*) as cnt FROM users');
    if (existingUsers[0].cnt === 0) {
      const adminHash = await bcryptjs.hash('admin123', 12);
      const userHash  = await bcryptjs.hash('user123', 12);
      await conn.execute(
        'INSERT IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Administrador TonerPrint', 'admin@tonerprint.com', adminHash, 'admin']
      );
      await conn.execute(
        'INSERT IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Cliente Demo', 'usuario@tonerprint.com', userHash, 'user']
      );
      console.log('[TonerPrint] Usuarios admin y demo creados.');
    }

    // ── Seed productos (solo si no existen) ─────────────────────────
    const [existingProducts] = await conn.execute<any[]>('SELECT COUNT(*) as cnt FROM products');
    if (existingProducts[0].cnt === 0) {
      for (const p of seedProducts) {
        await conn.execute(
          `INSERT INTO products (name, brand, type, price, old_price, stock, description, specs, emoji, badge)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.name, p.brand, p.type, p.price, p.old_price, p.stock, p.description, JSON.stringify(p.specs), p.emoji, p.badge]
        );
      }
      console.log(`[TonerPrint] ${seedProducts.length} productos insertados.`);
    }

    console.log('[TonerPrint] Base de datos lista ✓');
  } catch (err: any) {
    console.error('[TonerPrint] Error inicializando BD:', err.message);
    // No relanzamos el error — el servidor arranca igual aunque la BD falle
  } finally {
    if (conn) await conn.end().catch(() => {});
  }
}
