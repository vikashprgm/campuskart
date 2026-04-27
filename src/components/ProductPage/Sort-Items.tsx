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

export function FilterComponent() {
  return (
    <div className="gap-4 p-2">
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              Categories
              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
            </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-2">

          <FieldSet>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-elec"
                name="cat-checkbox-elec"
              />
              <FieldLabel
                htmlFor="cat-checkbox-elec"
              >
                Electronics
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-access"
                name="cat-checkbox-access"
              />
              <FieldLabel
                htmlFor="cat-checkbox-access"
              >
              Laptop/Mobile Accessories
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-fashion"
                name="cat-checkbox-fashion"
              />
              <FieldLabel
                htmlFor="cat-checkbox-fashion"
              >
                Men/Women's Fashion
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-decor"
                name="cat-checkbox-decor"
              />
              <FieldLabel
                htmlFor="cat-checkbox-decor"
              >
                Room Decor
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-book"
                name="cat-checkbox-book"
              />
              <FieldLabel
                htmlFor="cat-checkbox-book"
              >
                Books/Stationary
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-sports"
                name="cat-checkbox-sports"
              />
              <FieldLabel
                htmlFor="cat-checkbox-sports"
              >
                Sports
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-health"
                name="cat-checkbox-health"
              />
              <FieldLabel
                htmlFor="cat-checkbox-health"
              >
                Beauty/Health
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="cat-checkbox-other"
                name="cat-checkbox-other"
              />
              <FieldLabel
                htmlFor="cat-checkbox-other"
              >
                Other
              </FieldLabel>
            </Field>
          </FieldGroup>
          </FieldSet>
          </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              Condition
              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
            </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-2">

          <FieldSet>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox
                id="con-checkbox-new"
                name="con-checkbox-new"
              />
              <FieldLabel
                htmlFor="con-checkbox-new"
              >
                New
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="con-checkbox-used"
                name="con-checkbox-used"
              />
              <FieldLabel
                htmlFor="con-checkbox-used"
              >
                Used
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="con-checkbox-ob"
                name="con-checkbox-ob"
              />
              <FieldLabel
                htmlFor="con-checkbox-ob"
              >
                Open Box
              </FieldLabel>
            </Field>
            
          </FieldGroup>
          </FieldSet>
          </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen={true}>
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
                id="price-checkbox-free"
                name="price-checkbox-free"
              />
              <FieldLabel
                htmlFor="price-checkbox-free"
              >
                Free
              </FieldLabel>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="price-checkbox-priced"
                name="price-checkbox-priced"
              />
              <FieldLabel
                htmlFor="price-checkbox-priced"
              >
                Priced
              </FieldLabel>
            </Field>
          </FieldGroup>
          </FieldSet>
          </CollapsibleContent>
      </Collapsible>
  </div>
  )
}
