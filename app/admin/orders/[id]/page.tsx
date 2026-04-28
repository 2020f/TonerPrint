import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import OrderStatusUpdater from '@/components/admin/OrderStatusUpdater';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-orange-100 text-orange-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};
const STATUS_LABELS: Record<string, string> = {
  pending:'Pendiente', confirmed:'Confirmado', processing:'Procesando',
  shipped:'Enviado', delivered:'Entregado', cancelled:'Cancelado',
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orders = await query<any[]>('SELECT * FROM orders WHERE id = ?', [id]).catch(() => []);
  if (!orders.length) notFound();

  const order = orders[0];
  const items = await query<any[]>('SELECT * FROM order_items WHERE order_id = ?', [id]).catch(() => []);

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink transition-colors">
          <ChevronLeft className="w-4 h-4" /> Pedidos
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-black text-gray-900">{order.order_number}</h1>
        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
          {STATUS_LABELS[order.status] || order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: items + summary */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Productos del pedido</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left font-semibold">Producto</th>
                  <th className="px-5 py-3 text-right font-semibold">Precio unit.</th>
                  <th className="px-5 py-3 text-right font-semibold">Cant.</th>
                  <th className="px-5 py-3 text-right font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t border-gray-50">
                    <td className="px-5 py-3.5 font-medium text-gray-800">{item.product_name}</td>
                    <td className="px-5 py-3.5 text-right text-gray-600">RD${Number(item.product_price).toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-lg">{item.quantity}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-gray-900">
                      RD${(Number(item.product_price) * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>RD${Number(order.subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-semibold">{Number(order.shipping) === 0 ? 'GRATIS' : `RD$${Number(order.shipping).toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-pink">RD${Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Notas del pedido</h3>
              <p className="text-gray-600 text-sm">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right: customer + status */}
        <div className="space-y-5">
          {/* Customer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Cliente</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-pink/60 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {order.customer_name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{order.customer_name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{order.customer_email}</span>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{order.customer_phone}</span>
                </div>
              )}
              <div className="flex items-start gap-2 text-xs text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>{order.customer_address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{({'card':'Tarjeta', 'transfer':'Transferencia', 'delivery':'Contra entrega'} as Record<string,string>)[order.payment_method] || order.payment_method}</span>
              </div>
            </div>
          </div>

          {/* Status updater */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Actualizar estado</h2>
            <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
          </div>

          {/* Order info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Información</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Fecha</span>
                <span className="font-semibold text-gray-700">
                  {new Date(order.created_at).toLocaleDateString('es-DO', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Número</span>
                <span className="font-bold text-gray-900">{order.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Items</span>
                <span className="font-semibold text-gray-700">{items.length} producto(s)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
