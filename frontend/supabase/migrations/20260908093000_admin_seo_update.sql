-- ============================================================
-- KODALIC WEBSITE
-- Migration: Admin SEO Metadata Update
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_admin_seo_metadata(
    p_entity_type TEXT,
    p_entity_id UUID,
    p_title TEXT,
    p_description TEXT,
    p_canonical TEXT,
    p_og_media_id UUID,
    p_indexable BOOLEAN
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_id UUID;
BEGIN

    IF NOT public.has_permission('seo.update') THEN
        RAISE EXCEPTION 'Permission denied';
    END IF;

    IF trim(COALESCE(p_entity_type, '')) = '' THEN
        RAISE EXCEPTION 'Entity type is required';
    END IF;

    IF p_entity_id IS NULL THEN
        RAISE EXCEPTION 'Entity ID is required';
    END IF;

    IF p_og_media_id IS NOT NULL
       AND NOT EXISTS (
           SELECT 1
           FROM public.media
           WHERE id = p_og_media_id
       )
    THEN
        RAISE EXCEPTION 'Open Graph media not found';
    END IF;

    INSERT INTO public.seo_metadata (
        entity_type,
        entity_id,
        title,
        description,
        canonical,
        og_media_id,
        indexable
    )
    VALUES (
        trim(p_entity_type),
        p_entity_id,
        NULLIF(trim(COALESCE(p_title, '')), ''),
        NULLIF(trim(COALESCE(p_description, '')), ''),
        NULLIF(trim(COALESCE(p_canonical, '')), ''),
        p_og_media_id,
        COALESCE(p_indexable, true)
    )
    ON CONFLICT (entity_type, entity_id)
    DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        canonical = EXCLUDED.canonical,
        og_media_id = EXCLUDED.og_media_id,
        indexable = EXCLUDED.indexable,
        updated_at = NOW()
    RETURNING id INTO v_id;

    RETURN v_id;

END;
$$;


-- ============================================================
-- Function security
-- ============================================================

REVOKE ALL
ON FUNCTION public.update_admin_seo_metadata(
    TEXT,
    UUID,
    TEXT,
    TEXT,
    TEXT,
    UUID,
    BOOLEAN
)
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.update_admin_seo_metadata(
    TEXT,
    UUID,
    TEXT,
    TEXT,
    TEXT,
    UUID,
    BOOLEAN
)
TO authenticated;