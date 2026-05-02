import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feedback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex flex-col gap-6 items-center justify-center pt-10'>
     <div>
     All feedback to vikash.prgm@gmail.com or  8318757633
     </div>
      <Link to='/'>
      <Button>
        Homepage
      </Button>
      </Link>
  </div>
}
