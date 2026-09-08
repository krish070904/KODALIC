import type { Metadata } from "next";
import BusinessAutomationClient from "./BusinessAutomationClient";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Business Automation | Kodalic",
  description:
    "Workflow, CRM, lead, marketing, process and API/integration automation that saves time, reduces errors and gives you real-time visibility into your business.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/automation",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function BusinessAutomationPage() {
  return <BusinessAutomationClient />;
}