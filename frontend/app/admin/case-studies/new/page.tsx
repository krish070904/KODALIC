import Link from "next/link";

import { requirePermission } from "../../../../lib/auth/require-permission";
import CaseStudyCreateForm from "../../../../components/admin/case-study-create-form";

export default async function NewCaseStudyPage() {
  await requirePermission("case_studies.create");

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/case-studies"
          className="text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Case Studies
        </Link>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-white/35">
            Portfolio
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            New Case Study
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Create a production-ready case study for the Kodalic website.
          </p>
        </div>

        <div className="mt-8">
          <CaseStudyCreateForm />
        </div>
      </div>
    </div>
  );
}