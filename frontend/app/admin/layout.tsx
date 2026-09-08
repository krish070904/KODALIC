import type { Metadata } from "next";
import { getAdminUser, AdminUser } from "../../lib/auth/get-admin-user";
import { getAdminNavigation, AllowedNavItem } from "../../lib/auth/get-admin-navigation";
import AdminShell from "../../components/admin/admin-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let adminUser: AdminUser | null = null;
  let navigation: AllowedNavItem[] = [];

  try {
    adminUser = await getAdminUser();
    navigation = await getAdminNavigation();
  } catch {
    // User is unauthenticated (e.g. login, MFA setup, unauthorized page)
  }

  return (
    <AdminShell adminUser={adminUser} navigation={navigation}>
      {children}
    </AdminShell>
  );
}
