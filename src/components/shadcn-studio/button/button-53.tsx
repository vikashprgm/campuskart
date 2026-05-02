import { PrimaryGrowButton } from '#/components/ui/grow-button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

const PostAdButton = () => {
  return(
  <PrimaryGrowButton onClick={()=>{
     toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 1000)
              ),
            {
              loading: "Wait, page is loading...",
              error: "Error",
            }
          )}}
  >
    <Plus/>
    Post an Ad
  </PrimaryGrowButton>
  )
}

export default PostAdButton
