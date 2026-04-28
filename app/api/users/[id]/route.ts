import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const users = await query<any[]>(
      'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?',
      [id]
    );
    if (!users.length) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    return NextResponse.json(users[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, email, password, role, phone, address } = await request.json();

    if (password) {
      const hash = await hashPassword(password);
      await query(
        'UPDATE users SET name=?, email=?, password_hash=?, role=?, phone=?, address=? WHERE id=?',
        [name, email, hash, role, phone || null, address || null, id]
      );
    } else {
      await query(
        'UPDATE users SET name=?, email=?, role=?, phone=?, address=? WHERE id=?',
        [name, email, role, phone || null, address || null, id]
      );
    }

    const users = await query<any[]>(
      'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = ?',
      [id]
    );
    return NextResponse.json(users[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
