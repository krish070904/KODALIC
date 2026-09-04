import type { Metadata } from "next";
import SoftwareDevelopmentClient from "./SoftwareDevelopmentClient";

export const metadata: Metadata = {
  title: "Software Development | Kodalic",
  description:
    "Custom software solutions that solve real problems, streamline operations and create new opportunities for growth.",
  alternates: {
    canonical: "/software-development",
  },
};

export default function SoftwareDevelopmentPage() {
  return <SoftwareDevelopmentClient />;
}