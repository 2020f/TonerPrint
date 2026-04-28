import ProductForm from '@/components/admin/ProductForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink transition-colors">
          <ChevronLeft className="w-4 h-4" /> Productos
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-black text-gray-900">Nuevo producto</h1>
      </div>
      <ProductForm />
    </div>
  );
}
