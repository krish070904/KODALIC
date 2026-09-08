"use server";

import { requirePermission } from "../../../lib/auth/require-permission";
import { createClient } from "../../../lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserRoleAction(
  targetUserId: string,
  newRoleId: string
) {
  await requirePermission("users.manage");

  if (!targetUserId || !newRoleId) {
    return {
      success: false,
      error: "User ID and Role ID are required.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("update_user_role", {
    p_target_user_id: targetUserId,
    p_new_role_id: newRoleId,
  });

  if (error) {
    console.error("Failed to update user role:", error);
    return {
      success: false,
      error: error.message || "Failed to update user role.",
    };
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin");

  return {
    success: true,
  };
}
