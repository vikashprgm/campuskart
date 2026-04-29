import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '../components/Login'
import { getCurrentUserFn } from '../utils/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()
    if (user) throw redirect({ to: '/' })
  },
  component: LoginPage,
})

function LoginPage() {
  return <Login />
}