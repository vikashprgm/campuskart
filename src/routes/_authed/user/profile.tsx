import { Button } from '#/components/ui/button'
import { getuserpostsFn } from '#/utils/db'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { type Posts } from '#/data/types'
import { UserPostCard } from '#/components/UserPage/card'
export const Route = createFileRoute('/_authed/user/profile')({
  loader : ()=> getuserpostsFn(),
  component: RouteComponent,
})

function RouteComponent() {
  const posts = Route.useLoaderData();
  return <div className='flex flex-col items-center pt-5 gap-5'>
    <div className='font-semibold text-lg'>
      Your Posts
    </div>
    {
      posts?.map((e)=>(<UserPostCard {...e} key={e.created_at}/>))
    }
    
    <Link to='/products'>
      <Button>
        Homepage
      </Button>
      </Link>
    </div>
}
