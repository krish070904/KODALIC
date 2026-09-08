DROP POLICY IF EXISTS "Public can read indexable SEO metadata"
ON public.seo_metadata;

CREATE POLICY "Public can read SEO metadata"
ON public.seo_metadata
FOR SELECT
TO anon, authenticated
USING (true);