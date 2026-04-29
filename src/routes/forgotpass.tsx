import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forgotpass')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forgotpass"!</div>
}
