import { AppSidebar } from '#/components/ProductPage/ProductSidebar'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { createFileRoute, useRouteContext,  } from '@tanstack/react-router'
import Header from '#/components/header'
import { MainSection } from '#/components/MainSection'
import { getallpostsFn } from '#/utils/db'
import { useState } from 'react'
import { type Filters } from '#/data/types'
export const Route = createFileRoute('/_authed/products')({
  loader : ()=> getallpostsFn(),
  component: RouteComponent,
})

function RouteComponent() {
  const userdata= useRouteContext({from : '__root__'});
  const posts = Route.useLoaderData();

  const [filters,setFilters] = useState<Filters>({
    categories : [],
    price : []
  })
  
  const filtered = posts.filter((item) => {
    const categoryMatch = filters.categories.length === 0
      || filters.categories.includes(item.category);

    const priceMatch = filters.price.length === 0
      || (filters.price.includes('free') && item.price === 0)
      || (filters.price.includes('priced') && item.price !== 0);

    return categoryMatch && priceMatch;
  });
  
  return <div>
    <SidebarProvider>
      <AppSidebar filters={filters} setFilters={setFilters}/>
      <SidebarInset>
        <Header sidebarToggle={true} userdata={userdata.user}/>
        <MainSection items={filtered}/>
      </SidebarInset>
    </SidebarProvider>
  </div>
}
