import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    Hello "/"!
    <Link to='/products'>
      <Button>
        See Products
      </Button>
    </Link>
  </div>
}
