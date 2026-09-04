import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "About Kodalic | Technology Solutions Company in Mumbai",
  description:
    "Learn about Kodalic, a technology solutions company founded in 2019 in Mumbai, helping businesses with websites, software, automation, AI and digital growth.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Kodalic | Technology Solutions Company in Mumbai",
    description:
      "Learn about Kodalic, a technology solutions company founded in 2019 in Mumbai, helping businesses with websites, software, automation, AI and digital growth.",
    url: "/about",
    type: "website",
  },
};

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
