"use client";

import { useState } from "react";
import { AdminUserRecord, RoleOption } from "../../../lib/auth/get-admin-users-list";
import { updateUserRoleAction } from "./actions";
import {
  Shield,
  ShieldCheck,
  Code,
  User,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
  Loader2,
  Search,
  Lock,
} from "lucide-react";

type UsersManagerProps = {
  initialUsers: AdminUserRecord[];
  roles: RoleOption[];
  currentUserId: string;
};

function getRoleBadge(roleName: string) {
  switch (roleName) {
    case "Admin":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </span>
      );
    case "Manager":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <Shield className="h-3.5 w-3.5" />
          Manager
        </span>
      );
    case "Developer":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <Code className="h-3.5 w-3.5" />
          Developer
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-white/60">
          <User className="h-3.5 w-3.5" />
          {roleName || "No Role"}
        </span>
      );
  }
}

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function UsersManager({
  initialUsers,
  roles,
  currentUserId,
}: UsersManagerProps) {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");

  // Confirmation modal state
  const [pendingChange, setPendingChange] = useState<{
    user: AdminUserRecord;
    newRoleId: string;
    newRoleName: string;
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRoleFilter === "All" || u.role_name === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleSelectChange = (
    user: AdminUserRecord,
    newRoleId: string
  ) => {
    if (newRoleId === user.role_id) return;
    const targetRole = roles.find((r) => r.id === newRoleId);
    if (!targetRole) return;

    setPendingChange({
      user,
      newRoleId,
      newRoleName: targetRole.name,
    });
  };

  const handleConfirmRoleChange = async () => {
    if (!pendingChange) return;

    setSaving(true);
    setToastMessage(null);

    const { user, newRoleId, newRoleName } = pendingChange;

    const result = await updateUserRoleAction(user.id, newRoleId);

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, role_id: newRoleId, role_name: newRoleName }
            : u
        )
      );

      setToastMessage({
        type: "success",
        text: `Role for ${user.name} successfully changed to ${newRoleName}.`,
      });

      setPendingChange(null);
    } else {
      setToastMessage({
        type: "error",
        text: result.error || "Failed to update role.",
      });
    }

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="alert"
          className={`flex items-center justify-between gap-3 rounded-2xl p-4 text-xs sm:text-sm font-medium transition-all ${
            toastMessage.type === "success"
              ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
              : "border border-rose-500/25 bg-rose-500/10 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            <span>{toastMessage.text}</span>
          </div>

          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Admin", "Manager", "Developer"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRoleFilter(r)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition border whitespace-nowrap ${
                selectedRoleFilter === r
                  ? "border-[#7c5dff] bg-[#5b3df5] text-white shadow-sm"
                  : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
        <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Authorized Team Members
            </h2>
            <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
              Change and assign access roles. Only Admins can modify permissions.
            </p>
          </div>

          <span className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-white/60">
            {filteredUsers.length} {filteredUsers.length === 1 ? "User" : "Users"}
          </span>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center p-6 text-center">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                No users found
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-white/35">
                Try adjusting your search query or role filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 dark:text-white/35 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 dark:text-white/35 uppercase tracking-wider">
                    Current Role
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 dark:text-white/35 uppercase tracking-wider">
                    Assigned Role Action
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 dark:text-white/35 uppercase tracking-wider">
                    Joined Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {filteredUsers.map((u) => {
                  const isCurrentLoggedUser = u.id === currentUserId;

                  return (
                    <tr
                      key={u.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                    >
                      {/* Member Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#5b3df5] to-[#7c5dff] text-xs font-bold text-white uppercase shadow-sm">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {u.name}
                              </p>
                              {isCurrentLoggedUser && (
                                <span className="rounded-full bg-slate-100 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-white/70">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-white/40">
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Current Role Badge */}
                      <td className="px-6 py-4">{getRoleBadge(u.role_name)}</td>

                      {/* Role Selector */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={u.role_id || ""}
                            onChange={(e) =>
                              handleRoleSelectChange(u, e.target.value)
                            }
                            className="rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white outline-none focus:border-[#7c5dff] focus:ring-2 focus:ring-[#7c5dff]/20 transition cursor-pointer"
                          >
                            {roles.map((r) => (
                              <option
                                key={r.id}
                                value={r.id}
                                className="bg-white dark:bg-[#111528] text-slate-900 dark:text-white"
                              >
                                Change to: {r.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Date Joined */}
                      <td className="px-6 py-4 text-xs text-slate-500 dark:text-white/40">
                        {formatDate(u.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Role Confirmation Modal */}
      {pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0e1326] p-6 sm:p-7 shadow-2xl transition-all">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Confirm Role Change
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-white/50">
                    Security Authorization Check
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPendingChange(null)}
                disabled={saving}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                Are you sure you want to change the access level for{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {pendingChange.user.name}
                </span>{" "}
                ({pendingChange.user.email})?
              </p>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-white/40">
                    From
                  </p>
                  <p className="mt-1 font-semibold text-xs sm:text-sm text-slate-700 dark:text-white/80">
                    {pendingChange.user.role_name}
                  </p>
                </div>

                <span className="text-slate-400 dark:text-white/30 text-lg">
                  →
                </span>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-white/40">
                    To New Role
                  </p>
                  <p className="mt-1 font-bold text-xs sm:text-sm text-[#5b3df5] dark:text-[#a78bfa]">
                    {pendingChange.newRoleName}
                  </p>
                </div>
              </div>

              {pendingChange.newRoleName === "Admin" && (
                <div className="flex items-start gap-2.5 rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-xs text-purple-800 dark:text-purple-300">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    Granting <strong>Admin</strong> privileges grants full operational and user management permissions.
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 dark:border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setPendingChange(null)}
                disabled={saving}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmRoleChange}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5b3df5] hover:bg-[#4c2ee3] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#5b3df5]/25 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Updating Role...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirm & Update Role</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
