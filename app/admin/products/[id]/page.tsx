import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const products = await query<any[]>(
    'SELECT * FROM products WHERE id = ?',
    [id]
  ).catch(() => []);

  if (!products.length) notFound();

  const product = products[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Productos
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-black text-gray-900">Editar producto</h1>
      </div>
      <ProductForm product={product} isEdit />
    </div>
  );
}
