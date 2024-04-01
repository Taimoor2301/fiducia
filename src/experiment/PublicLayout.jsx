import React from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from '../pages/portfolio/components/Navbar'
import Footer from '../pages/portfolio/components/footer'

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

PublicLayout.getLayout = page => <BlankLayout>{page}</BlankLayout>
PublicLayout.guestGuard = true
