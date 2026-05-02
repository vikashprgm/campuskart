import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '../components/Login'
import { getSessionData } from '../utils/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const user = await getSessionData()
    if (user) throw redirect({ to: '/products' })
  },
  component: LoginPage,
})

function LoginPage() {
  return <Login />
}