import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSessionData } from '../utils/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    const user = await getSessionData()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    return { user }
  },
  component: () => <Outlet />,
})