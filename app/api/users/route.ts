import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const users = await query<any[]>(
      `SELECT u.id, u.name, u.email, u.role, u.phone, u.address, u.created_at,
        (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as orders_count
       FROM users u ORDER BY u.created_at DESC`
    );
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, phone, address } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const existing = await query<any[]>('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 });
    }

    const password_hash = await hashPassword(password);
    const result = await query<any>(
      'INSERT INTO users (name, email, password_hash, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password_hash, role || 'user', phone || null, address || null]
    );

    const users = await query<any[]>(
      'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?',
      [result.insertId]
    );
    return NextResponse.json(users[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
