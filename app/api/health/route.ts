import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const conn = await mysql.createConnection({
      host:           process.env.DB_HOST || '127.0.0.1',
      port:           Number(process.env.DB_PORT) || 3306,
      database:       process.env.DB_NAME,
      user:           process.env.DB_USER,
      password:       process.env.DB_PASSWORD,
      connectTimeout: 8000,
    });

    // Check tables
    const [tables] = await conn.execute<any[]>("SHOW TABLES");
    const tableNames = tables.map((t: any) => Object.values(t)[0]);

    // Check users
    let users = 0;
    let products = 0;
    if (tableNames.includes('users')) {
      const [u] = await conn.execute<any[]>('SELECT COUNT(*) as cnt FROM users');
      users = u[0].cnt;
    }
    if (tableNames.includes('products')) {
      const [p] = await conn.execute<any[]>('SELECT COUNT(*) as cnt FROM products');
      products = p[0].cnt;
    }

    await conn.end();
    return NextResponse.json({ status: 'OK', tables: tableNames, users, products });
  } catch (err: any) {
    return NextResponse.json({ status: 'ERROR', error: err.message, code: err.code }, { status: 500 });
  }
}

// Allow running init manually in production via POST
export async function POST() {
  const { initDatabase } = await import('@/lib/init-db');
  await initDatabase();
  return NextResponse.json({ ok: true, message: 'Init ejecutado' });
}
