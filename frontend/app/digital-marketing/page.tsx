import type { Metadata } from "next";
import DigitalGrowthClient from "./digital-growth-client";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Digital Growth Services | Kodalic",
  description:
    "Data-driven digital marketing strategies that attract, engage and convert — SEO, digital marketing, social media and analytics built for sustainable business growth.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/digital-marketing",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function DigitalGrowthPage() {
  return <DigitalGrowthClient />;
}