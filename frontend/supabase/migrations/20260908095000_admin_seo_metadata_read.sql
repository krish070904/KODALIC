-- ============================================================
-- KODALIC WEBSITE
-- Migration: Admin SEO Metadata Read
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_admin_seo_metadata()
RETURNS TABLE (
    id UUID,
    entity_type TEXT,
    entity_id UUID,
    title TEXT,
    description TEXT,
    canonical TEXT,
    og_media_id UUID,
    indexable BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE PLPGSQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN

    IF NOT public.has_permission('seo.view') THEN
        RAISE EXCEPTION 'Permission denied';
    END IF;

    RETURN QUERY
    SELECT
        sm.id,
        sm.entity_type,
        sm.entity_id,
        sm.title,
        sm.description,
        sm.canonical,
        sm.og_media_id,
        sm.indexable,
        sm.created_at,
        sm.updated_at
    FROM public.seo_metadata sm
    ORDER BY
        sm.entity_type ASC,
        sm.created_at ASC;

END;
$$;


-- ============================================================
-- Function security
-- ============================================================

REVOKE ALL
ON FUNCTION public.get_admin_seo_metadata()
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.get_admin_seo_metadata()
TO authenticated;