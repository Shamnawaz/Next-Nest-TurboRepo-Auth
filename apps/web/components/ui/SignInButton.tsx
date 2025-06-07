import { getSession } from '@/lib/session'
import Link from 'next/link';
import React from 'react'

// Fonction asynchrone afin de récupérer la session
const SignInButton = async () => {

    const session = await getSession();

    return (
        <div className='flex items-center gap-2 ml-auto'>
            {!session || !session.user ? (
                <>
                    <Link href={'/auth/signin'}>Se Connecter</Link>
                    <Link href={'/auth/signup'}>S'inscrire</Link>
                </>
            ):
            (
                <>
                    <p>{session.user.name}</p>
                    <Link href={'/api/auth/signout'}>Se Déconnecter</Link>
                </>
            )}
        </div>
    )
}

export default SignInButton
