import { query } from '@/lib/db';
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

async function getStats() {
  try {
    const [orders] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as total, SUM(total) as revenue FROM orders'),
    ]);
    const [products] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as total, SUM(stock) as total_stock FROM products WHERE active=1'),
    ]);
    const [users]    = [await query<any[]>('SELECT COUNT(*) as total FROM users')];
    const lowStock   = await query<any[]>('SELECT * FROM products WHERE stock < 10 AND active=1 ORDER BY stock ASC LIMIT 5');
    const recentOrders = await query<any[]>('SELECT * FROM orders ORDER BY created_at DESC LIMIT 8');
    const pendingCount = await query<any[]>("SELECT COUNT(*) as total FROM orders WHERE status='pending'");
    const monthRevenue = await query<any[]>(
      "SELECT SUM(total) as revenue FROM orders WHERE MONTH(created_at)=MONTH(NOW()) AND YEAR(created_at)=YEAR(NOW())"
    );

    return {
      totalOrders: (orders as any)[0]?.total || 0,
      totalRevenue: (orders as any)[0]?.revenue || 0,
      totalProducts: (products as any)[0]?.total || 0,
      totalUsers: (users as any)[0]?.total || 0,
      lowStock: lowStock as any[],
      recentOrders: recentOrders as any[],
      pendingOrders: (pendingCount as any)[0]?.total || 0,
      monthRevenue: (monthRevenue as any)[0]?.revenue || 0,
    };
  } catch {
    return { totalOrders:0, totalRevenue:0, totalProducts:0, totalUsers:0, lowStock:[], recentOrders:[], pendingOrders:0, monthRevenue:0 };
  }
}

const statusColors: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-orange-100 text-orange-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};
const statusLabels: Record<string, string> = {
  pending:'Pendiente', confirmed:'Confirmado', processing:'Procesando',
  shipped:'Enviado', delivered:'Entregado', cancelled:'Cancelado',
};

export default async function AdminDashboard() {
  const s = await getStats();

  const stats = [
    { label: 'Pedidos totales',    value: s.totalOrders,  sub: `${s.pendingOrders} pendientes`, icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Ingresos del mes',   value: `RD$${Number(s.monthRevenue).toLocaleString()}`, sub: `Total: RD$${Number(s.totalRevenue).toLocaleString()}`, icon: TrendingUp, color: 'bg-pink' },
    { label: 'Productos activos',  value: s.totalProducts, sub: `${s.lowStock.length} con bajo stock`, icon: Package, color: 'bg-emerald-500' },
    { label: 'Usuarios',           value: s.totalUsers,   sub: 'Registrados', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Resumen de TonerPrint</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink" /> Pedidos recientes
            </h2>
            <a href="/admin/orders" className="text-xs text-pink font-semibold hover:underline">Ver todos →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left font-semibold">Pedido</th>
                  <th className="px-5 py-3 text-left font-semibold">Cliente</th>
                  <th className="px-5 py-3 text-left font-semibold">Total</th>
                  <th className="px-5 py-3 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {s.recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-10 text-center text-gray-400 text-sm">Sin pedidos aún</td></tr>
                ) : s.recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <a href={`/admin/orders/${order.id}`} className="font-bold text-gray-900 hover:text-pink transition-colors">
                        {order.order_number}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{order.customer_name}</td>
                    <td className="px-5 py-3 font-bold text-gray-900">RD${Number(order.total).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Bajo stock
            </h2>
            <a href="/admin/products" className="text-xs text-pink font-semibold hover:underline">Gestionar →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {s.lowStock.length === 0 ? (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">Todo el stock está bien ✓</div>
            ) : s.lowStock.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                  {p.emoji || '🖨️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.brand.toUpperCase()}</p>
                </div>
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  {p.stock === 0 ? 'Agotado' : `${p.stock} uds`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
