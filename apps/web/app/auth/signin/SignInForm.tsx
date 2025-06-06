'use client';

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import { signIn } from '@/lib/auth'
import Link from 'next/link'
import React, { useActionState } from 'react'

const SignInForm = () => {

    const [state, action] = useActionState(signIn, undefined);

    return (
        <form action={action}>
            <div className='flex flex-col gap-2 w-64'>
                {state?.message && <p className='text-sm text-red-500'>{state.message}</p>}
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' name='email' placeholder='johdoe@example.com' type='email' />
                </div>
                {state?.error?.email && <p className='text-sm text-red-500'>{state.error.email}</p>}

                <div>
                    <Label htmlFor='password'>Mot de passe</Label>
                    <Input id='password' name='password' placeholder='password' type='password' />
                </div>
                {state?.error?.password && <p className='text-sm text-red-500'>{state.error.password}</p>}

                <Link className='text-sm underline' href={'#'}>
                    Mot de passe oublié.
                </Link>

                <div className='flex justify-between text-sm'>
                    <p>Vous n'avez pas de compte ?</p>
                    <Link className='text-sm underline' href={'/auth/signup'}>
                        S'inscrire
                    </Link>
                </div>

                <SubmitButton>Se connecter</SubmitButton>
            </div>
        </form>
    )
}

export default SignInForm
