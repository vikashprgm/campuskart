import { CardImage } from './ProductPage/item-card'
import { type Item } from '#/data/types'
import { PackageOpen } from 'lucide-react'
export function MainSection ({items} : {items: Item[] } ){
  return(
    <div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground gap-2">
          <PackageOpen size={48} strokeWidth={1.5} />
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3 pt-3 p-2">
          {items.map((e) => <CardImage key={e.created_at} {...e} />)}
        </div>
      )}
    </div>
  )
}