import type { Metadata } from "next";
import WebsiteDevelopmentClient from "./WebsiteDevelopmentClient";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Website Development | Kodalic",
  description:
    "Business, corporate, startup and e-commerce websites built around business goals, performance and growth.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/website-development",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function WebsiteDevelopmentPage() {
  return <WebsiteDevelopmentClient />;
}