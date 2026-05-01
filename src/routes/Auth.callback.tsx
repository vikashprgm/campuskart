import { createFileRoute, redirect } from '@tanstack/react-router'
import { handleOAuthCallbackFn } from '../utils/auth'
import { z } from 'zod'

/*
 * landing page after Google redirects back
 * query param is validated, passed to the server function that
 * exchanges it for a Supabase session,
 */
export const Route = createFileRoute('/Auth/callback')({
  validateSearch: z.object({
    code: z.string().optional(),
    error: z.string().optional(),
    error_description: z.string().optional(),
  }).parse,

  beforeLoad: async ({ search }) => {
    if (search.error) {
      throw redirect({ to: '/login' })
    }

    if (!search.code) {
      throw redirect({ to: '/login' })
    }

    await handleOAuthCallbackFn({ data: { code: search.code } })
  },

  component: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground animate-pulse">Completing sign-in…</p>
    </div>
  ),
})