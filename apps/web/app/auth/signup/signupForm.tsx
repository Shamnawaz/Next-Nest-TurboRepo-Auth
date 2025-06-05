import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import React from 'react'

const SignUpForm = () => {
  return (
    <form className='py-5'>
        <div className='flex flex-col gap-2'>
            <div>
                <Label htmlFor='name'>Nom</Label>
                <Input id='name' name='name' placeholder='John doe'/>
            </div>

            <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' placeholder='Johndoe@example.com'/>
            </div>

            <div>
                <Label htmlFor='password'>Mot de passe</Label>
                <Input id='password' name='password' placeholder='password'/>
            </div>
            <SubmitButton>S'inscrire</SubmitButton>
        </div>
    </form>
  )
}

export default SignUpForm
