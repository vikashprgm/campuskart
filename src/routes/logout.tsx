import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useEffect } from 'react'
import { logoutFn } from '../utils/auth'

export const Route = createFileRoute('/logout')({
  component: LogoutPage,
})

function LogoutPage() {
  const logout = useServerFn(logoutFn)

  useEffect(() => {
    logout()
  }, [])

  return <p className="p-8 text-muted-foreground">Signing out…</p>
}