import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export const metadata = { title: 'CRM — TonerPrint Admin' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/login');

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar user={session} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        {/* Admin footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} TonerPrint — Panel Administrativo
          </p>
          <p className="text-gray-300 text-xs">
            v1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}
