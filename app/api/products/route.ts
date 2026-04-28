import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const all = searchParams.get('all'); // admin: include inactive

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params: unknown[] = [];

    if (!all) {
      sql += ' AND active = TRUE';
    }
    if (brand) { sql += ' AND brand = ?'; params.push(brand); }
    if (type)  { sql += ' AND type = ?';  params.push(type); }
    if (search) {
      sql += ' AND (name LIKE ? OR brand LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const products = await query(sql, params);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, brand, type, price, old_price, stock, description, specs, image_url, emoji, badge, active } = body;

    if (!name || !brand || !type || !price) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO products (name, brand, type, price, old_price, stock, description, specs, image_url, emoji, badge, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, brand, type,
        price,
        old_price || null,
        stock ?? 0,
        description || '',
        specs ? JSON.stringify(specs) : null,
        image_url || null,
        emoji || '🖨️',
        badge || null,
        active !== false ? 1 : 0,
      ]
    );

    const newProduct = await query('SELECT * FROM products WHERE id = ?', [(result as any).insertId]);
    return NextResponse.json((newProduct as any[])[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
