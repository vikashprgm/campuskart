import { createFileRoute, redirect } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { z } from 'zod'
import { getCurrentUserFn, completeOnboardingFn } from '../utils/auth'
import { Auth } from '../components/Auth'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'

export const Route = createFileRoute('/onboarding')({
  validateSearch: z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().optional(),
  }).parse,

  beforeLoad: async () => {
    const user = await getCurrentUserFn()
    if (!user) throw redirect({ to: '/login' })
  },

  component: OnboardingPage,
})

function OnboardingPage() {
  const { name, avatar, email } = Route.useSearch()
  const completeOnboarding = useServerFn(completeOnboardingFn)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: name ?? '',
      year: '' as '1' | '2' | '3' | '4' | '',
      contact: '',
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const result = await completeOnboarding({
        data: {
          name: value.name,
          year: value.year as '1' | '2' | '3' | '4',
          contact: value.contact,
        },
      })
      if (result?.error) setServerError(result.message ?? 'Something went wrong')
    },
  })

  return (
    <Auth title="Complete your profile" subtitle="Just a few more details">
      <div className="flex flex-col items-center gap-2 mb-6">
        {avatar && <img src={avatar} className="w-14 h-14 rounded-full" alt="" />}
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} className="space-y-4">

        <form.Field name="name" validators={{
          onBlur: ({ value }) => !value ? 'Name is required' : undefined,
        }}>
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="year" validators={{
          onBlur: ({ value }) => !value ? 'Select your year' : undefined,
        }}>
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="year">Year of study</Label>
              <select
                id="year"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as '1'|'2'|'3'|'4')}
                onBlur={field.handleBlur}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="" disabled>Select year…</option>
                <option value="1">1st year</option>
                <option value="2">2nd year</option>
                <option value="3">3rd year</option>
                <option value="4">4th year</option>
              </select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="contact" validators={{
          onBlur: ({ value }) =>
            !value ? 'WhatsApp number is required'
            : !/^\+?[0-9]{10,13}$/.test(value) ? 'Enter a valid number'
            : undefined,
        }}>
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="contact">WhatsApp number</Label>
              <Input
                id="contact"
                placeholder="9876543210"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-destructive">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {serverError && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Get started'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Auth>
  )
}