import type { Metadata } from "next";
import DigitalGrowthClient from "./digital-growth-client";

export const metadata: Metadata = {
  title: "Digital Growth Services | Kodalic",
  description:
    "Data-driven digital marketing strategies that attract, engage and convert — SEO, digital marketing, social media and analytics built for sustainable business growth.",
  alternates: { canonical: "/digital-marketing" },
};

export default function DigitalGrowthPage() {
  return <DigitalGrowthClient />;
}