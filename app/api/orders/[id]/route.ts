import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orders = await query<any[]>('SELECT * FROM orders WHERE id = ?', [id]);
    if (!orders.length) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });

    const items = await query<any[]>(
      'SELECT * FROM order_items WHERE order_id = ?',
      [id]
    );

    return NextResponse.json({ ...orders[0], items });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener pedido' }, { status: 500 });
  }
}
