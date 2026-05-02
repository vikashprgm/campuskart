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
    await session.update({ email: authData.user.email, name: authData.user.user_metadata.full_name ?? undefined })

    //check if user table is filled by this user
    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('id', authData.user.id)
      .single()

    if (!profile) {
       return { success: true, redirectTo: '/onboarding', email: authData.user.email }
    }

    return { success: true, redirectTo: '/'}
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
    await session.update({ email: authData.user.email})

    return { success: true, redirectTo: '/onboarding', email: authData.user.email }

})

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  await supabase.auth.signOut()

  const session = await useAppSession()
  await session.clear()

  throw redirect({ to: '/' })
})

export const getSessionData = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  if (!session.data.email) return null
  return { email: session.data.email , name:session.data.name ?? null}
})


//Get google auth consent Screen
export const getGoogleOAuthUrlFn = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()

  const siteUrl =
    process.env.SITE_URL || process.env.VITE_SITE_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/Auth/callback`,
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
    
    await console.log(data,"data")
    
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(data.code)

    const name = authData.user?.user_metadata.full_name;
    const googleid = authData.user?.id;
    const avatar = authData.user?.user_metadata.avatar_url;
    const email =authData.user?.email;

      if (error || !authData.session?.user?.email || !name || !googleid || !avatar || !email) {
      throw redirect({ to: '/login', search: { error: 'oauth_failed' } })
    }
    //search if user's name is updated in DB
    const {data : existinguser} = await supabase
      .from('users')
      .select('id')
      .eq('id',googleid)
      .single()

    const session = await useAppSession()
    await session.update({ email: authData.user.email , name: authData.user.user_metadata.full_name })

    if(!existinguser) {
      throw redirect({
        to: '/onboarding',
        search: { name, avatar, email }
      })
    }

    throw redirect({ to: '/' })
  })

// inject rest info after Google OAuth
export const completeOnboardingFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    name: z.string().min(1),
    year: z.enum(['1', '2', '3', '4']),
    contact: z.string().min(1),
  }))
  .handler(async ({ data }) => {
    const session = await useAppSession()
    const email = session.data.email
    if (!email) throw redirect({ to: '/login' })

    const supabase = getSupabaseServerClient()

    const { data: authUser } = await supabase.auth.getUser()
    if (!authUser.user) throw redirect({ to: '/login' })
    
    // add userinfo to user table
    const { error: usertableError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        name: data.name,
        year: data.year,
        contact: data.contact
    })

    if (usertableError) return { error: true, message: usertableError.message }
    
    throw redirect({ to: '/products' })
  })