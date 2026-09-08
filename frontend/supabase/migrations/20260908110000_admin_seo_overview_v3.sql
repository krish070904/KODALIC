-- ============================================================
-- KODALIC WEBSITE
-- Migration: Admin SEO Overview
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_admin_seo_overview()
RETURNS JSONB
LANGUAGE PLPGSQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
    v_total_pages BIGINT;
    v_total_metadata BIGINT;
    v_indexable BIGINT;
    v_non_indexable BIGINT;
    v_missing_metadata BIGINT;
    v_og_images BIGINT;
    v_health_score INTEGER;
BEGIN

    IF NOT public.has_permission('seo.view') THEN
        RAISE EXCEPTION 'Permission denied';
    END IF;

    /*
     * These IDs mirror frontend/lib/seo/seo-page-registry.ts.
     */
    WITH registered_pages(entity_id) AS (
        VALUES
            ('00000000-0000-4000-8000-000000000001'::UUID),
            ('00000000-0000-4000-8000-000000000002'::UUID),
            ('00000000-0000-4000-8000-000000000003'::UUID),
            ('00000000-0000-4000-8000-000000000004'::UUID),
            ('00000000-0000-4000-8000-000000000005'::UUID),
            ('00000000-0000-4000-8000-000000000006'::UUID),
            ('00000000-0000-4000-8000-000000000007'::UUID),
            ('00000000-0000-4000-8000-000000000008'::UUID),
            ('00000000-0000-4000-8000-000000000009'::UUID),
            ('00000000-0000-4000-8000-000000000010'::UUID),
            ('00000000-0000-4000-8000-000000000011'::UUID),
            ('00000000-0000-4000-8000-000000000012'::UUID)
    )
    SELECT COUNT(*)
    INTO v_total_pages
    FROM registered_pages;

    /*
     * Only SEO records belonging to registered pages are counted.
     */
    WITH registered_pages(entity_id) AS (
        VALUES
            ('00000000-0000-4000-8000-000000000001'::UUID),
            ('00000000-0000-4000-8000-000000000002'::UUID),
            ('00000000-0000-4000-8000-000000000003'::UUID),
            ('00000000-0000-4000-8000-000000000004'::UUID),
            ('00000000-0000-4000-8000-000000000005'::UUID),
            ('00000000-0000-4000-8000-000000000006'::UUID),
            ('00000000-0000-4000-8000-000000000007'::UUID),
            ('00000000-0000-4000-8000-000000000008'::UUID),
            ('00000000-0000-4000-8000-000000000009'::UUID),
            ('00000000-0000-4000-8000-000000000010'::UUID),
            ('00000000-0000-4000-8000-000000000011'::UUID),
            ('00000000-0000-4000-8000-000000000012'::UUID)
    )
    SELECT COUNT(*)
    INTO v_total_metadata
    FROM registered_pages p
    INNER JOIN public.seo_metadata s
        ON s.entity_type = 'page'
       AND s.entity_id = p.entity_id;

    /*
     * Indexability is calculated across all registered pages.
     * Pages without an Admin SEO record use their public default
     * and are therefore treated as indexable.
     */
    WITH registered_pages(entity_id) AS (
        VALUES
            ('00000000-0000-4000-8000-000000000001'::UUID),
            ('00000000-0000-4000-8000-000000000002'::UUID),
            ('00000000-0000-4000-8000-000000000003'::UUID),
            ('00000000-0000-4000-8000-000000000004'::UUID),
            ('00000000-0000-4000-8000-000000000005'::UUID),
            ('00000000-0000-4000-8000-000000000006'::UUID),
            ('00000000-0000-4000-8000-000000000007'::UUID),
            ('00000000-0000-4000-8000-000000000008'::UUID),
            ('00000000-0000-4000-8000-000000000009'::UUID),
            ('00000000-0000-4000-8000-000000000010'::UUID),
            ('00000000-0000-4000-8000-000000000011'::UUID),
            ('00000000-0000-4000-8000-000000000012'::UUID)
    )
    SELECT
        COUNT(*) FILTER (
            WHERE COALESCE(s.indexable, true) = true
        ),
        COUNT(*) FILTER (
            WHERE COALESCE(s.indexable, true) = false
        )
    INTO
        v_indexable,
        v_non_indexable
    FROM registered_pages p
    LEFT JOIN public.seo_metadata s
        ON s.entity_type = 'page'
       AND s.entity_id = p.entity_id;

    /*
     * A page is missing metadata only when it has no usable
     * title or description after considering its registered
     * public metadata defaults.
     *
     * The currently registered pages all have verified defaults
     * except where intentionally omitted. Those pages are treated
     * as missing if no Admin SEO record exists.
     */
    WITH registered_pages(entity_id, has_default_metadata) AS (
        VALUES
            ('00000000-0000-4000-8000-000000000001'::UUID, true),
            ('00000000-0000-4000-8000-000000000002'::UUID, true),
            ('00000000-0000-4000-8000-000000000003'::UUID, true),
            ('00000000-0000-4000-8000-000000000004'::UUID, true),
            ('00000000-0000-4000-8000-000000000005'::UUID, true),
            ('00000000-0000-4000-8000-000000000006'::UUID, true),
            ('00000000-0000-4000-8000-000000000007'::UUID, true),
            ('00000000-0000-4000-8000-000000000008'::UUID, true),
            ('00000000-0000-4000-8000-000000000009'::UUID, true),
('00000000-0000-4000-8000-000000000010'::UUID, true),
('00000000-0000-4000-8000-000000000011'::UUID, true),
('00000000-0000-4000-8000-000000000012'::UUID, true)
    )
    SELECT COUNT(*)
    INTO v_missing_metadata
    FROM registered_pages p
    LEFT JOIN public.seo_metadata s
        ON s.entity_type = 'page'
       AND s.entity_id = p.entity_id
    WHERE
        (
            s.id IS NULL
            AND p.has_default_metadata = false
        )
        OR
        (
            s.id IS NOT NULL
            AND (
                NULLIF(trim(COALESCE(s.title, '')), '') IS NULL
                OR NULLIF(trim(COALESCE(s.description, '')), '') IS NULL
            )
        );

    /*
     * Open Graph images are counted from explicitly configured
     * Admin SEO records.
     */
    WITH registered_pages(entity_id) AS (
        VALUES
            ('00000000-0000-4000-8000-000000000001'::UUID),
            ('00000000-0000-4000-8000-000000000002'::UUID),
            ('00000000-0000-4000-8000-000000000003'::UUID),
            ('00000000-0000-4000-8000-000000000004'::UUID),
            ('00000000-0000-4000-8000-000000000005'::UUID),
            ('00000000-0000-4000-8000-000000000006'::UUID),
            ('00000000-0000-4000-8000-000000000007'::UUID),
            ('00000000-0000-4000-8000-000000000008'::UUID),
            ('00000000-0000-4000-8000-000000000009'::UUID),
            ('00000000-0000-4000-8000-000000000010'::UUID),
            ('00000000-0000-4000-8000-000000000011'::UUID),
            ('00000000-0000-4000-8000-000000000012'::UUID)
    )
    SELECT COUNT(*)
    INTO v_og_images
    FROM registered_pages p
    INNER JOIN public.seo_metadata s
        ON s.entity_type = 'page'
       AND s.entity_id = p.entity_id
    WHERE s.og_media_id IS NOT NULL;

    /*
     * Health score:
     * - 50% metadata completeness
     * - 30% indexability
     * - 20% Open Graph coverage
     *
     * Defaults are considered part of the public SEO state.
     * Open Graph coverage only counts explicit media configuration.
     */
    v_health_score := ROUND(
        (
            (
                (v_total_pages - v_missing_metadata)::NUMERIC
                / NULLIF(v_total_pages, 0)
            ) * 50
        )
        +
        (
            (v_indexable::NUMERIC / NULLIF(v_total_pages, 0)) * 30
        )
        +
        (
            (v_og_images::NUMERIC / NULLIF(v_total_pages, 0)) * 20
        )
    )::INTEGER;

    RETURN jsonb_build_object(
        'total_metadata', v_total_metadata,
        'indexable_pages', v_indexable,
        'non_indexable_pages', v_non_indexable,
        'missing_metadata', v_missing_metadata,
        'og_images', v_og_images,
        'health_score', COALESCE(v_health_score, 0)
    );

END;
$$;


-- ============================================================
-- Function security
-- ============================================================

REVOKE ALL
ON FUNCTION public.get_admin_seo_overview()
FROM PUBLIC;

GRANT EXECUTE
ON FUNCTION public.get_admin_seo_overview()
TO authenticated;