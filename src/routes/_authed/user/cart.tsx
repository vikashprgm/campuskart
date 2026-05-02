import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/user/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex flex-col items-center pt-5 gap-5'>
    This Feature is still in progress ☺️ Please give us time 
    <Link to='/'>
      <Button>
        Homepage
      </Button>
      </Link>
    </div>
}
