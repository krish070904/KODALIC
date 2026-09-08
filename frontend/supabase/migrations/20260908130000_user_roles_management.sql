-- ============================================================
-- KODALIC WEBSITE
-- Migration: Users & Roles Management
-- ============================================================

-- 1. Insert permissions for managing users and roles
INSERT INTO public.permissions (key)
VALUES 
    ('users.view'),
    ('users.manage')
ON CONFLICT (key) DO NOTHING;

-- 2. Grant permissions to Admin only
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM public.roles r
CROSS JOIN public.permissions p
WHERE r.name = 'Admin'
  AND p.key IN ('users.view', 'users.manage')
ON CONFLICT DO NOTHING;

-- 3. Function to list all users with their assigned role and metadata
CREATE OR REPLACE FUNCTION public.get_admin_users_list()
RETURNS TABLE (
    id UUID,
    email TEXT,
    name TEXT,
    status TEXT,
    role_id UUID,
    role_name TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE PLPGSQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
    IF NOT public.has_permission('users.view') THEN
        RAISE EXCEPTION 'Permission denied: users.view required';
    END IF;

    RETURN QUERY
    SELECT
        u.id,
        u.email,
        u.name,
        u.status,
        r.id AS role_id,
        COALESCE(r.name, 'No Role') AS role_name,
        u.created_at,
        u.updated_at
    FROM public.users u
    LEFT JOIN public.user_roles ur ON ur.user_id = u.id
    LEFT JOIN public.roles r ON r.id = ur.role_id
    ORDER BY u.created_at ASC;
END;
$$;

-- 4. Function to list available roles
CREATE OR REPLACE FUNCTION public.get_available_roles()
RETURNS TABLE (
    id UUID,
    name TEXT
)
LANGUAGE PLPGSQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
    IF NOT public.has_permission('users.view') THEN
        RAISE EXCEPTION 'Permission denied';
    END IF;

    RETURN QUERY
    SELECT r.id, r.name
    FROM public.roles r
    ORDER BY 
        CASE 
            WHEN r.name = 'Admin' THEN 1
            WHEN r.name = 'Manager' THEN 2
            WHEN r.name = 'Developer' THEN 3
            ELSE 4
        END;
END;
$$;

-- 5. Function to update a user's role (Admin only)
CREATE OR REPLACE FUNCTION public.update_user_role(
    p_target_user_id UUID,
    p_new_role_id UUID
)
RETURNS VOID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_admin_role_id UUID;
    v_admin_count INT;
    v_current_role_id UUID;
BEGIN
    IF NOT public.has_permission('users.manage') THEN
        RAISE EXCEPTION 'Permission denied: users.manage required';
    END IF;

    -- Retrieve Admin role ID
    SELECT id INTO v_admin_role_id FROM public.roles WHERE name = 'Admin' LIMIT 1;

    -- Check current role of target user
    SELECT role_id INTO v_current_role_id FROM public.user_roles WHERE user_id = p_target_user_id LIMIT 1;

    -- Prevent demoting the last Admin
    IF v_current_role_id = v_admin_role_id AND p_new_role_id <> v_admin_role_id THEN
        SELECT COUNT(*) INTO v_admin_count FROM public.user_roles WHERE role_id = v_admin_role_id;
        IF v_admin_count <= 1 THEN
            RAISE EXCEPTION 'Cannot change role: There must be at least one active Admin.';
        END IF;
    END IF;

    -- Delete existing role mapping
    DELETE FROM public.user_roles WHERE user_id = p_target_user_id;

    -- Insert new role mapping
    IF p_new_role_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role_id)
        VALUES (p_target_user_id, p_new_role_id);
    END IF;

    -- Update updated_at timestamp on users table
    UPDATE public.users SET updated_at = NOW() WHERE id = p_target_user_id;
END;
$$;

-- 6. Permissions and Execution Grants
REVOKE ALL ON FUNCTION public.get_admin_users_list() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_admin_users_list() TO authenticated;

REVOKE ALL ON FUNCTION public.get_available_roles() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_available_roles() TO authenticated;

REVOKE ALL ON FUNCTION public.update_user_role(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_user_role(UUID, UUID) TO authenticated;
