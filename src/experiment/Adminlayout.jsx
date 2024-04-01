import { useRouter } from 'next/router'
import React from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'
import NotAuthorized from '../pages/401'

export default function AdminLayout({ children }) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return router.replace('/login')

  return user.role === 'admin' ? (
    <>{children}</>
  ) : (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}
