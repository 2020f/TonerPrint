'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  LogOut, ChevronRight, ExternalLink,
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
    <aside className="w-60 bg-[#0D0D0D] min-h-screen flex flex-col shrink-0 sticky top-0 h-screen border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/8 flex flex-col items-center gap-1">
        <Link href="/admin">
          <div style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8)) drop-shadow(0 0 14px rgba(255,255,255,0.5))' }}>
            <Image
              src="/logo.png"
              alt="TonerPrint"
              width={160}
              height={60}
              className="w-36 h-auto object-contain"
              priority
            />
          </div>
        </Link>
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">
          Panel Administrativo
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest px-3 pt-2 pb-1">
          Menú principal
        </p>
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? 'bg-pink text-white shadow-lg shadow-pink/20'
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

      {/* Footer */}
      <div className="p-3 border-t border-white/8 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/6 transition-all"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
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
