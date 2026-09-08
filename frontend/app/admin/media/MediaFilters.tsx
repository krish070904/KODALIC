"use client";

type MediaFilter = "all" | "images" | "pdfs";

type MediaFiltersProps = {
  value: MediaFilter;
  onChange: (value: MediaFilter) => void;
};

export default function MediaFilters({
  value,
  onChange,
}: MediaFiltersProps) {
  const filters: { label: string; value: MediaFilter }[] = [
    { label: "All", value: "all" },
    { label: "Images", value: "images" },
    { label: "PDFs", value: "pdfs" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = value === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-opacity ${
              active ? "bg-foreground text-background" : "hover:opacity-70"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}