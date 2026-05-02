import { useRouter, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { loginFn } from '@/utils/auth'
import { Auth } from './Auth'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Field,
  FieldError,
} from "@/components/ui/field"

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.07-6.07C34.46 3.05 29.53 1 24 1 14.62 1 6.63 6.55 2.96 14.47l7.05 5.48C11.82 13.76 17.44 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9.01h12.68c-.55 2.94-2.2 5.44-4.68 7.12l7.19 5.59C43.4 37.5 46.52 31.46 46.52 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.01 28.74A14.6 14.6 0 0 1 9.5 24c0-1.65.28-3.25.77-4.74L3.22 13.78A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.57 10.76l7.44-6.02z"
      />
      <path
        fill="#34A853"
        d="M24 47c5.53 0 10.17-1.83 13.56-4.97l-7.19-5.59c-1.99 1.34-4.55 2.12-6.37 2.12-6.56 0-12.18-4.26-14-9.95l-7.44 6.02C6.63 41.45 14.62 47 24 47z"
      />
    </svg>
  )
}

export function Login() {
  const router = useRouter()
  const login = useServerFn(loginFn)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const result = await login({ data: value })

      if(!result) return
      if (result?.error) {
        setServerError(result.message ?? 'Something went wrong')
        return
      }
  
      await router.invalidate()
      if (result.redirectTo === '/onboarding') {
        router.navigate({ to: '/onboarding', search: { email: result.email } })
      } else {
        router.navigate({ to: '/products' })
      }
    },
  })

  return (
    <Auth
      title="Welcome back"
      subtitle="Sign in to your account"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {/* Google OAuth */}
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => router.navigate({ to: '/Auth/google' })}
        >
          <GoogleIcon />
          Continue with Google
        </Button>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      {/*  Email / Password Login */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) =>
              !value ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Enter a valid email' : undefined,
          }}
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            
            return(
            <div className="space-y-1.5">
                <div className=''>
                  <Field data-invalid={isInvalid}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid} />
                  </Field>
                  {isInvalid && (<FieldError errors={field.state.meta.errors.map(e => ({ message: e as string }))} />)}
                </div>             
            </div>
          )}}/>

        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) =>
              !value ? 'Password is required' : value.length < 6 ? 'At least 6 characters' : undefined,
          }}
          children={(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return(
            <div className="space-y-1.5">
              <Field data-invalid={invalid}>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgotpass"
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                    Forgot password?
                  </Link>
                </div>
              </Field>
                <div>
                  <Field>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid = {invalid}
                      />
                    {invalid && <FieldError errors={field.state.meta.errors.map(e => ({ message: e as string }))} />}
                  </Field>
                  </div>                
            </div>
          )}
        }/>

        {serverError && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}


        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Auth>
  )
}