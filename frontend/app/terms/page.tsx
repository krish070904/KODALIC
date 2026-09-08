import type { Metadata } from "next";
import LegalDocument from "../components/LegalDocument";
import { LEGAL_DOCUMENTS } from "../data/legalDocuments";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Terms & Conditions",
  description:
    "Read Kodalic's Terms & Conditions governing website use and service delivery.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/terms",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function TermsPage() {
  return <LegalDocument document={LEGAL_DOCUMENTS.terms} />;
}