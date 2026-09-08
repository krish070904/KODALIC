import type { Metadata } from "next";
import AiSolutionsClient from "./AiSolutionsClient";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "AI Solutions | Kodalic",
  description:
    "Custom AI solutions, intelligent workflows and automation designed for real business impact.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/ai-solutions",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function AiSolutionsPage() {
  return <AiSolutionsClient />;
}