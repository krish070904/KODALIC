import type { Metadata } from "next";
import AiSolutionsClient from "./AiSolutionsClient";

export const metadata: Metadata = {
  title: "AI Solutions | Kodalic",
  description:
    "Custom AI solutions, intelligent workflows and automation designed for real business impact.",
  alternates: {
    canonical: "/ai-solutions",
  },
};

export default function AiSolutionsPage() {
  return <AiSolutionsClient />;
}