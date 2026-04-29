import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { useAppSession } from './session'
import { getSupabaseServerClient } from './supabase'
import z from 'zod'

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(authSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error || !authData.user?.email) {
      return { error: true, message: error?.message ?? 'Invalid credentials' }
    }

    const session = await useAppSession()
    await session.update({ email: authData.user.email })

    return { success: true }
  })

export const signupFn = createServerFn({ method: 'POST' })
  .inputValidator(authSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (error || !authData.user?.email) {
      return { error: true, message: error?.message ?? 'Signup failed' }
    }

    const session = await useAppSession()
    await session.update({ email: authData.user.email })

    return { success: true }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  await supabase.auth.signOut()

  const session = await useAppSession()
  await session.clear()

  throw redirect({ to: '/' })
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  if (!session.data.email) return null
  return { email: session.data.email }
})


//Get google auth consent Screen
export const getGoogleOAuthUrlFn = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()

  const siteUrl =
    process.env.SITE_URL ??
    process.env.VITE_SITE_URL ??
    'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
      queryParams: { prompt: 'select_account' },
    },
  })

  if (error || !data.url) {
    return { error: true, url: null, message: error?.message ?? 'OAuth init failed' }
  }

  return { error: false, url: data.url, message: null }
})

//Exchange OAuth code for a supabase session,
export const handleOAuthCallbackFn = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ code: z.string() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(data.code)

    if (error || !authData.session?.user?.email) {
      throw redirect({ to: '/login', search: { error: 'oauth_failed' } })
    }

    const session = await useAppSession()
    await session.update({ email: authData.session.user.email })

    throw redirect({ to: '/' })
  })