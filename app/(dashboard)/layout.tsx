import React, { ReactNode } from 'react'

function layout( {children}: {children : ReactNode}) {
  return (
    <div  className='flex flex-col min-h-screen min-w-full bg-background'>{children}</div>
  )
}

export default layout