import { useRouter } from 'next/router'
import React from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'
import NotAuthorized from '../pages/401'

export default function RestaurantLayout({ children }) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return router.replace('/login')

  return user.role === 'restaurant' ? (
    <>{children}</>
  ) : (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}
