import type { Metadata } from "next";
import LegalDocument from "../components/LegalDocument";
import { LEGAL_DOCUMENTS } from "../data/legalDocuments";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Privacy Policy",
  description:
    "Read Kodalic's Privacy Policy — how we collect, use, and protect your personal data in accordance with applicable Indian law.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/privacy",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function PrivacyPage() {
  return <LegalDocument document={LEGAL_DOCUMENTS.privacy} />;
}