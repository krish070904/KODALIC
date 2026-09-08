import { createClient } from "../supabase/server";

export type AdminUserRecord = {
  id: string;
  email: string;
  name: string;
  status: string;
  role_id: string | null;
  role_name: string;
  created_at: string;
  updated_at: string;
};

export type RoleOption = {
  id: string;
  name: string;
};

export async function getAdminUsersList(): Promise<AdminUserRecord[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_admin_users_list");

  if (error) {
    console.error("Failed to load admin users list:", error);
    throw new Error("Failed to load admin users list");
  }

  return (data ?? []) as AdminUserRecord[];
}

export async function getAvailableRoles(): Promise<RoleOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_available_roles");

  if (error) {
    console.error("Failed to load available roles:", error);
    throw new Error("Failed to load available roles");
  }

  return (data ?? []) as RoleOption[];
}
