import { createFileRoute, redirect } from '@tanstack/react-router'
import { getGoogleOAuthUrlFn } from '../utils/auth'

//redirects to google's consent screen.

export const Route = createFileRoute('/Auth/google')({
  beforeLoad: async () => {
    const result = await getGoogleOAuthUrlFn()
 
    if (result.error || !result.url) {
      throw redirect({ to: '/login' })
    }

    throw redirect({ href: result.url })
  },
  component: () => null,
})