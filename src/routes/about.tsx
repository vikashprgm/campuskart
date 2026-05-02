import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
return <div className='flex flex-col gap-6 items-center justify-center pt-10'>
     <div>
     Bleep Blop Boop, Tung Tung Tung Sahur!
     </div>
      <Link to='/'>
      <Button>
        Homepage
      </Button>
      </Link>
  </div>
}
