import { CardImage } from '#/components/ProductPage/item-card'
import { AppSidebar } from '#/components/ProductPage/ProductSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import { data } from '#/data/data'
import Header from '#/components/header'
export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})


function RouteComponent() {
  return <div>
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
      <Header/>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-3 gap-x-2 pt-3 p-2'>
        {
          data.map((e)=><CardImage {...e}/>)
        }
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
}
