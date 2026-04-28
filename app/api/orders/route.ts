import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = String(Math.floor(Math.random() * 90000) + 10000);
  return `TP-${date}-${rand}`;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let sql = `
      SELECT o.*,
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as items_count
      FROM orders o
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (session?.role !== 'admin') {
      if (!session) return NextResponse.json([], { status: 200 });
      sql += ' AND o.user_id = ?';
      params.push(session.id);
    }

    if (status) { sql += ' AND o.status = ?'; params.push(status); }
    if (search) {
      sql += ' AND (o.order_number LIKE ? OR o.customer_name LIKE ? OR o.customer_email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY o.created_at DESC';

    const orders = await query(sql, params);
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener pedidos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name, customer_email, customer_phone,
      customer_address, payment_method, items, notes,
    } = body;

    if (!customer_name || !customer_email || !customer_address || !payment_method || !items?.length) {
      return NextResponse.json({ error: 'Faltan datos del pedido' }, { status: 400 });
    }

    const session = await getSession();
    const order_number = generateOrderNumber();

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const result = await query<any>(
      `INSERT INTO orders (order_number, user_id, customer_name, customer_email, customer_phone,
        customer_address, payment_method, subtotal, shipping, total, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order_number,
        session?.id || null,
        customer_name, customer_email,
        customer_phone || null,
        customer_address,
        payment_method,
        subtotal, shipping, total,
        notes || null,
      ]
    );

    const orderId = result.insertId;

    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.price, item.quantity]
      );
      // Reduce stock
      await query('UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?', [item.quantity, item.id]);
    }

    const order = await query<any[]>('SELECT * FROM orders WHERE id = ?', [orderId]);
    return NextResponse.json(order[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear pedido' }, { status: 500 });
  }
}
