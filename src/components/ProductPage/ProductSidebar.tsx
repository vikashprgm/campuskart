import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { FilterComponent } from "./Sort-Items"
import type { Filters } from "#/data/types";

type props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
export function AppSidebar({filters, setFilters} : props) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
          <FilterComponent  filters={filters} setFilters={setFilters} />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}