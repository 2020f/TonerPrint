import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
    }

    await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    const orders = await query<any[]>('SELECT * FROM orders WHERE id = ?', [id]);
    return NextResponse.json(orders[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar estado' }, { status: 500 });
  }
}
