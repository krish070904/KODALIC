import type { Metadata } from "next";
import WebsiteDevelopmentClient from "./WebsiteDevelopmentClient";

export const metadata: Metadata = {
  title: "Website Development | Kodalic",
  description:
    "Business, corporate, startup and e-commerce websites built around business goals, performance and growth.",
  alternates: {
    canonical: "/website-development",
  },
};

export default function WebsiteDevelopmentPage() {
  return <WebsiteDevelopmentClient />;
}