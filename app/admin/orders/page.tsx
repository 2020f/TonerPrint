import { query } from '@/lib/db';
import OrdersTable from '@/components/admin/OrdersTable';

export default async function AdminOrdersPage() {
  const orders = await query<any[]>(
    `SELECT o.*, (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id=o.id) as items_count
     FROM orders o ORDER BY o.created_at DESC`
  ).catch(() => []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Pedidos</h1>
        <p className="text-sm text-gray-500 mt-0.5">{orders.length} pedidos en total</p>
      </div>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
