"use client";

type MediaSortValue = "newest" | "oldest" | "name-asc" | "name-desc";

type MediaSortProps = {
  value: MediaSortValue;
  onChange: (value: MediaSortValue) => void;
};

export default function MediaSort({
  value,
  onChange,
}: MediaSortProps) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value as MediaSortValue)
      }
      className="rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
      aria-label="Sort media"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="name-asc">Filename A–Z</option>
      <option value="name-desc">Filename Z–A</option>
    </select>
  );
}