import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'

const AppBar = () => {
  return (
    <div className='p-2 flex gap-3 bg-gradient-to-br from-blue-400 to-cyan-400 text-white'>
      <Link href={'/'}>Accueil</Link>
      <Link href={'/dashboard'}>Dashboard</Link>
      <SignInButton />
    </div>
  )
}

export default AppBar
