import type { Metadata } from "next";
import BusinessAutomationClient from "./BusinessAutomationClient";

export const metadata: Metadata = {
  title: "Business Automation | Kodalic",
  description:
    "Workflow, CRM, lead, marketing, process and API/integration automation that saves time, reduces errors and gives you real-time visibility into your business.",
  alternates: {
    canonical: "/business-automation",
  },
};

export default function BusinessAutomationPage() {
  return <BusinessAutomationClient />;
}