import { Label } from "./ui/label";
import { type Category } from "#/data/types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "electronics", label: "Electronics" },
  { value: "accessories", label: "Accessories" },
  { value: "fashion", label: "Fashion" },
  { value: "decor", label: "Decor" },
  { value: "sports", label: "Sports" },
  { value: "books", label: "Books" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
];

export function CategorySelector({
  value,
  onChange,
  error,
}: {
  value: Category | "";
  onChange: (val: Category) => void;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>Category <span className="text-destructive">*</span></Label>
      <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = value === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : error
                  ? "border-destructive bg-destructive/5 text-destructive hover:bg-destructive/10"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
              aria-pressed={isSelected}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
