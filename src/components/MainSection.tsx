import { CardImage } from './ProductPage/item-card'
import { Link } from '@tanstack/react-router'
import { type Item } from '#/data/types'
import { PackageOpen } from 'lucide-react'
import PostAdButton from './shadcn-studio/button/button-53'

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

      <div className="fixed bottom-7 right-6">
        <Link to="/upload">
        <PostAdButton/>
        </Link>
      </div>
    </div>
  )
}