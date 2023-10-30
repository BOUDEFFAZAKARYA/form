import { SiteHeader } from '@/components/layouts/SiteHeader'
import React, { ReactNode } from 'react'
import { currentUser } from "@clerk/nextjs"

async function layout( {children}: {children : ReactNode}) {
  const user = await currentUser()

  return (
    <div className="relative flex flex-col min-h-screen">
    <SiteHeader user={user} />
    <main className="flex-1">{children}</main>
  </div>
  )
}

export default layout