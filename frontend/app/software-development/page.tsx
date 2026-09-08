import type { Metadata } from "next";
import SoftwareDevelopmentClient from "./SoftwareDevelopmentClient";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Software Development | Kodalic",
  description:
    "Custom software solutions that solve real problems, streamline operations and create new opportunities for growth.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/software-development",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

export default function SoftwareDevelopmentPage() {
  return <SoftwareDevelopmentClient />;
}