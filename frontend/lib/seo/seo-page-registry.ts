export type SeoPageDefinition = {
  entityType: "page";
  entityId: string;
  path: string;
  name: string;
  defaultTitle?: string;
  defaultDescription?: string;
};

export const SEO_PAGE_REGISTRY: SeoPageDefinition[] = [
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000001",
    path: "/",
    name: "Home",
    defaultTitle: "Kodalic — Engineering What Businesses Become Next",
    defaultDescription:
      "Kodalic builds intelligent technology solutions — websites, AI, automation, and digital products — that help businesses evolve, automate, and compete in a digital-first world.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000002",
    path: "/about",
    name: "About",
    defaultTitle: "About Kodalic | Technology Solutions Company in Mumbai",
    defaultDescription:
      "Learn about Kodalic, a technology solutions company founded in 2019 in Mumbai, helping businesses with websites, software, automation, AI and digital growth.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000003",
    path: "/ai-solutions",
    name: "AI Solutions",
    defaultTitle: "AI Solutions | Kodalic",
    defaultDescription:
      "Custom AI solutions, intelligent workflows and automation designed for real business impact.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000004",
    path: "/automation",
    name: "Business Automation",
    defaultTitle: "Business Automation | Kodalic",
    defaultDescription:
      "Workflow, CRM, lead, marketing, process and API/integration automation that saves time, reduces errors and gives you real-time visibility into your business.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000005",
    path: "/website-development",
    name: "Website Development",
    defaultTitle: "Website Development | Kodalic",
    defaultDescription:
      "Business, corporate, startup and e-commerce websites built around business goals, performance and growth.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000006",
    path: "/software-development",
    name: "Software Development",
    defaultTitle: "Software Development | Kodalic",
    defaultDescription:
      "Custom software solutions that solve real problems, streamline operations and create new opportunities for growth.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000007",
    path: "/digital-marketing",
    name: "Digital Marketing",
    defaultTitle: "Digital Growth Services | Kodalic",
    defaultDescription:
      "Data-driven digital marketing strategies that attract, engage and convert — SEO, digital marketing, social media and analytics built for sustainable business growth.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000008",
    path: "/blog",
    name: "Blog",
    defaultTitle: "Blog",
    defaultDescription:
      "Insights on web development, AI, automation, and digital products from Kodalic.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000009",
    path: "/case-studies",
    name: "Case Studies",
    defaultTitle: "Case Studies",
    defaultDescription:
      "Explore Kodalic projects and the stories behind their design, development, and delivery.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000010",
    path: "/privacy",
    name: "Privacy Policy",
    defaultTitle: "Privacy Policy",
    defaultDescription:
      "Read Kodalic's Privacy Policy — how we collect, use, and protect your personal data in accordance with applicable Indian law.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000011",
    path: "/terms",
    name: "Terms",
    defaultTitle: "Terms & Conditions",
    defaultDescription:
      "Read Kodalic's Terms & Conditions governing website use and service delivery.",
  },
  {
    entityType: "page",
    entityId: "00000000-0000-4000-8000-000000000012",
    path: "/cookies",
    name: "Cookies",
    defaultTitle: "Cookie Policy",
    defaultDescription:
      "Read Kodalic's Cookie Policy — how we use cookies and similar technologies and how you can manage them.",
  },
];

export function getSeoPageByPath(
  path: string
): SeoPageDefinition | undefined {
  return SEO_PAGE_REGISTRY.find((page) => page.path === path);
}

export function getSeoPageByEntityId(
  entityId: string
): SeoPageDefinition | undefined {
  return SEO_PAGE_REGISTRY.find((page) => page.entityId === entityId);
}