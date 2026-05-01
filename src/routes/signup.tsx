import { createFileRoute, redirect } from '@tanstack/react-router'
import { Signup } from '../components/Signup'
import { getSessionData } from '../utils/auth'

export const Route = createFileRoute('/signup')({
  beforeLoad: async () => {
    const user = await getSessionData()
    if (user) throw redirect({ to: '/' })
  },
  component: SignupPage,
})

function SignupPage() {
  return <Signup />
}