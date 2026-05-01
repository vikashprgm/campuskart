import { UploadPage } from '#/components/Upload'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <UploadPage/>
  )
}
