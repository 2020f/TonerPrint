'use client';

import { Bell, Search } from 'lucide-react';
import type { TokenPayload } from '@/lib/auth';

export default function AdminTopBar({ user }: { user: TokenPayload }) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1 flex items-center gap-3 max-w-xs">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            placeholder="Buscar…"
            className="w-full pl-9 pr-3 py-1.5 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink/20 focus:bg-white border border-transparent focus:border-pink/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-4 h-4 text-gray-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-pink/60 flex items-center justify-center text-white text-xs font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-gray-800">{user.name}</div>
            <div className="text-xs text-pink font-semibold capitalize">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
