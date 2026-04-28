import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken, comparePassword, COOKIE_NAME } from '@/lib/auth';

interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  phone: string | null;
  address: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const users = await query<UserRow[]>(
      'SELECT id, name, email, password_hash, role, phone, address FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (!users.length) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const user = users[0];
    const valid = await comparePassword(password, user.password_hash);

    if (!valid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const token = await signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
