import { query } from '@/lib/db';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductsTable from '@/components/admin/ProductsTable';

export default async function AdminProductsPage() {
  const products = await query<any[]>(
    'SELECT * FROM products ORDER BY created_at DESC'
  ).catch(() => []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Productos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} productos en total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-pink hover:bg-pink/90 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo producto
        </Link>
      </div>

      <ProductsTable initialProducts={products} />
    </div>
  );
}
