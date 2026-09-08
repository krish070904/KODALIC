import type { Metadata } from "next";
import LegalDocument from "../components/LegalDocument";
import { LEGAL_DOCUMENTS } from "../data/legalDocuments";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Cookie Policy",
  description:
    "Read Kodalic's Cookie Policy — how we use cookies and similar technologies and how you can manage them.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/cookies",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function CookiesPage() {
  return <LegalDocument document={LEGAL_DOCUMENTS.cookies} />;
}