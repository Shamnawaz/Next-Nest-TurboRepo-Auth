'use client';

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import { signUp } from '@/lib/auth'
import React, { useActionState } from 'react'

const SignUpForm = () => {

    const [state, action] = useActionState(signUp, undefined)

    return (
        <form action={action} className='py-5'>
            <div className='flex flex-col gap-2'>
                {state?.message && <p className='text-sm text-red-500'>{state.message}</p>}
                <div>
                    <Label htmlFor='name'>Nom</Label>
                    <Input id='name' name='name' placeholder='John doe'/>
                </div>
                {state?.error?.name && <p className='text-sm text-red-500'>{state.error.name}</p>}

                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' name='email' placeholder='Johndoe@example.com'/>
                </div>
                {state?.error?.email && <p className='text-sm text-red-500'>{state.error.email}</p>}

                <div>
                    <Label htmlFor='password'>Mot de passe</Label>
                    <Input id='password' name='password' placeholder='password'/>
                </div>
                {state?.error?.password && 
                    <div className='text-sm text-red-500'>
                        <p className='font-bold uppercase'>Le mot de passe :</p>
                        <ul>
                            {state.error.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                }

                <SubmitButton>S'inscrire</SubmitButton>
            </div>
        </form>
    )
}

export default SignUpForm
