import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import Navbar from "../components/Navbar";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "About Kodalic | Technology Solutions Company in Mumbai",
  description:
    "Learn about Kodalic, a technology solutions company founded in 2019 in Mumbai, helping businesses with websites, software, automation, AI and digital growth.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/about",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Kodalic",
  url: "https://www.kodalic.com/about",
  description:
    "Learn about Kodalic, a technology solutions company founded in 2019 in Mumbai, helping businesses with websites, software, automation, AI and digital growth.",
  mainEntity: {
    "@type": "Organization",
    name: "Kodalic",
    url: "https://www.kodalic.com",
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <Navbar />
      <AboutPageClient />
    </>
  );
}