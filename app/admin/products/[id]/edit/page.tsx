import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const products = await query<any[]>('SELECT * FROM products WHERE id = ?', [params.id]).catch(() => []);
  if (!products.length) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink transition-colors">
          <ChevronLeft className="w-4 h-4" /> Productos
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-black text-gray-900 truncate">{products[0].name}</h1>
      </div>
      <ProductForm product={products[0]} isEdit />
    </div>
  );
}
