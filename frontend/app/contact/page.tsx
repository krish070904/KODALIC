import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { buildPublicMetadata } from "../../lib/seo/build-public-metadata";

const DEFAULT_METADATA = {
  title: "Contact Kodalic | Get in Touch with Our Team",
  description:
    "Contact Kodalic for websites, software development, AI solutions, automation, and digital marketing. Tell us about your project and we'll respond within one business day.",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPublicMetadata({
    path: "/contact",
    defaultTitle: DEFAULT_METADATA.title,
    defaultDescription: DEFAULT_METADATA.description,
  });
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Kodalic",
  url: "https://www.kodalic.com/contact",
  description:
    "Contact Kodalic for software, websites, AI solutions, and digital growth.",
  mainEntity: {
    "@type": "Organization",
    name: "Kodalic",
    url: "https://www.kodalic.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "info@kodalic.com",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <ContactPageClient />
    </>
  );
}
