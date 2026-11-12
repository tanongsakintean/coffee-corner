export function FilterButton({
  category,
  selected,
  onSelect,
}: {
  category: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`filter-button min-h-11 rounded-full border px-3 text-label-md font-semibold sm:px-4 ${selected ? "border-coffee bg-coffee text-white" : "border-line bg-paper text-on-surface-variant"}`}
      type="button"
      data-category={category}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {category === "All" ? "ทั้งหมด" : category}
    </button>
  );
}
