import { requirePermission } from "../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../lib/auth/require-aal2";
import { getAdminUser } from "../../../lib/auth/get-admin-user";
import { getAdminUsersList, getAvailableRoles } from "../../../lib/auth/get-admin-users-list";
import UsersManager from "./UsersManager";

export default async function AdminUsersPage() {
  await requirePermission("users.view");
  await requireAAL2();

  const currentUser = await getAdminUser();
  const [users, roles] = await Promise.all([
    getAdminUsersList(),
    getAvailableRoles(),
  ]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
            Administration & Security
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            User Roles & Permissions
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
            Manage your organization's team members and configure role-based access control (Admin, Manager, Developer).
          </p>
        </div>

        {/* Client Management Interface */}
        <UsersManager
          initialUsers={users}
          roles={roles}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
}
