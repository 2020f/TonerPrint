'use client';

import { Bell, Search, Settings } from 'lucide-react';
import type { TokenPayload } from '@/lib/auth';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Productos',
  '/admin/products/new': 'Nuevo Producto',
  '/admin/orders': 'Pedidos',
  '/admin/users': 'Usuarios',
};

export default function AdminTopBar({ user }: { user: TokenPayload }) {
  const pathname = usePathname();
  const title = Object.entries(pageTitles).find(([key]) => pathname === key)?.[1]
    ?? (pathname.includes('/products/') ? 'Editar Producto'
      : pathname.includes('/orders/') ? 'Detalle de Pedido'
      : 'Admin');

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-30 shadow-sm">
      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-gray-800 font-bold text-base leading-none">{title}</h1>
        <p className="text-gray-400 text-xs mt-0.5">TonerPrint CRM</p>
      </div>

      {/* Search */}
      <div className="hidden sm:flex items-center relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          placeholder="Buscar…"
          className="pl-9 pr-3 py-1.5 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink/20 focus:bg-white border border-transparent focus:border-pink/30 transition-all w-48"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* User */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-pink2 flex items-center justify-center text-white text-xs font-black shadow-md shadow-pink/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block leading-none">
            <div className="text-xs font-bold text-gray-800">{user.name}</div>
            <div className="text-[10px] text-pink font-semibold capitalize">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
