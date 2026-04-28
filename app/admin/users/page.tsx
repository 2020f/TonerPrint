import { query } from '@/lib/db';
import UsersTable from '@/components/admin/UsersTable';

export default async function AdminUsersPage() {
  const users = await query<any[]>(
    `SELECT u.id, u.name, u.email, u.role, u.phone, u.address, u.created_at,
       (SELECT COUNT(*) FROM orders o WHERE o.user_id=u.id) as orders_count
     FROM users u ORDER BY u.created_at DESC`
  ).catch(() => []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Usuarios</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} usuarios registrados</p>
      </div>
      <UsersTable initialUsers={users} />
    </div>
  );
}
