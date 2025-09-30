import React from 'react'
import { Logo } from './_components/logo'

function AuthLayout({ children}:{
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center gap-y-4'>
         <Logo />
        {children}
       
    </div>
  )
}

export default AuthLayout
