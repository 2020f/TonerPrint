import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rows = await query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows.length) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener producto' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, brand, type, price, old_price, stock, description, specs, image_url, emoji, badge, active } = body;

    await query(
      `UPDATE products SET
        name=?, brand=?, type=?, price=?, old_price=?, stock=?,
        description=?, specs=?, image_url=?, emoji=?, badge=?, active=?
       WHERE id=?`,
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
        id,
      ]
    );

    const rows = await query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
