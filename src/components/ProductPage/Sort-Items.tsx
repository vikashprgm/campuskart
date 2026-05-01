import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { type Filters } from "#/data/types"
import { type Category } from "#/data/types"

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const CATEGORIES: { id: string; label: string; value: Category }[] = [
  { id: "elec",    label: "Electronics",              value: "electronics" },
  { id: "access",  label: "Laptop/Mobile Accessories", value: "accessories" },
  { id: "fashion", label: "Men/Women's Fashion",       value: "fashion" },
  { id: "decor",   label: "Room Decor",                value: "decor" },
  { id: "book",    label: "Books/Stationary",          value: "books" },
  { id: "sports",  label: "Sports",                    value: "sports" },
  { id: "health",  label: "Beauty/Health",             value: "health" },
  { id: "other",   label: "Other",                     value: "other" },
]

export function FilterComponent({filters, setFilters} : Props) {
  function toggleCategory(value: Category) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value],
    }));
  }

  function togglePrice(value: 'free' | 'priced') {
    setFilters((prev) => ({
      ...prev,
      price: prev.price.includes(value)
        ? prev.price.filter((p) => p !== value)
        : [...prev.price, value],
    }));
  }
  return (
    <div className="gap-4 p-2">
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="group w-full">
            Categories
            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <FieldSet>
            <FieldGroup className="gap-3">
              {CATEGORIES.map(({ id, label, value }) => (
                <Field key={id} orientation="horizontal">
                  <Checkbox
                    id={`cat-${id}`}
                    checked={filters.categories.includes(value)}
                    onCheckedChange={() => toggleCategory(value)}
                  />
                  <FieldLabel htmlFor={`cat-${id}`}>{label}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="group w-full">
            Price
            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <FieldSet>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <Checkbox
                  id="price-free"
                  checked={filters.price.includes('free')}
                  onCheckedChange={() => togglePrice('free')}
                />
                <FieldLabel htmlFor="price-free">Free</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="price-priced"
                  checked={filters.price.includes('priced')}
                  onCheckedChange={() => togglePrice('priced')}
                />
                <FieldLabel htmlFor="price-priced">Priced</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
