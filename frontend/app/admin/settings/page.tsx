import { requirePermission } from "../../../lib/auth/require-permission";
import { getAdminUser } from "../../../lib/auth/get-admin-user";
import SettingsManager from "./SettingsManager";

export default async function SettingsPage() {
  await requirePermission("admin.access");

  const adminUser = await getAdminUser();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Settings & Preferences
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
            Manage your interface appearance, dark/light theme, and administrative preferences.
          </p>
        </div>

        <SettingsManager user={adminUser} />
      </div>
    </div>
  );
}
