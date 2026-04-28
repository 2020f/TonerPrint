'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  Printer, LogOut, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',  href: '/admin',           icon: LayoutDashboard },
  { label: 'Productos',  href: '/admin/products',  icon: Package },
  { label: 'Pedidos',    href: '/admin/orders',    icon: ShoppingCart },
  { label: 'Usuarios',   href: '/admin/users',     icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <aside className="w-60 bg-[#0D0D0D] min-h-screen flex flex-col shrink-0 sticky top-0 h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-pink rounded-lg flex items-center justify-center shrink-0">
            <Printer className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-black text-sm tracking-tight">
              Toner<span className="text-pink">Print</span>
            </div>
            <div className="text-white/30 text-xs">Panel Admin</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? 'bg-pink text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/6'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/8 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/6 transition-all"
          target="_blank"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>Ver tienda</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
