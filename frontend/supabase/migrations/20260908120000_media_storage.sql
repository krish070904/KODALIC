-- ============================================================
-- KODALIC WEBSITE
-- Migration: General Media Storage
-- ============================================================

INSERT INTO storage.buckets (
    id,
    name,
    public
)
VALUES (
    'media',
    'media',
    false
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- MEDIA STORAGE POLICIES
-- ============================================================

CREATE POLICY "media storage upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'media'
    AND public.storage_has_permission('media.create')
);

CREATE POLICY "media storage view"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'media'
    AND public.storage_has_permission('media.view')
);

CREATE POLICY "media storage update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'media'
    AND public.storage_has_permission('media.update')
)
WITH CHECK (
    bucket_id = 'media'
    AND public.storage_has_permission('media.update')
);

CREATE POLICY "media storage delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'media'
    AND public.storage_has_permission('media.delete')
);