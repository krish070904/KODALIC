import { redirect } from "next/navigation";
import { hasPermission } from "./permissions";
import { createClient } from "../supabase/server";

export async function requirePermission(
  permission: string
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const allowed = await hasPermission(permission);

  if (!allowed) {
    redirect("/admin/unauthorized");
  }
}