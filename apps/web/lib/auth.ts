'use server';

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, signupFormSchema } from "./type";

export async function signUp(state: FormState , formData: FormData): Promise<FormState> {

    // {
    //   success: true,   si les données sont valides
    //   data: ...        les données validées
    // }
    // {
    //     success: false,
    //     error: ...     les erreurs de validation
    // }
    const validationFields = signupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validationFields.success) {
        return {
            // Exemple résultat du flatten(). la fonction transforme les erreurs zod complexes en un format plus exploitable
            // {
            // fieldErrors: {
            //     name: ['Le nom est requis'],
            //     email: ['Email invalide'],
            //     password: ['Le mot de passe doit faire au moins 6 caractères']
            // },
            // formErrors: []
            // }
            error: validationFields.error.flatten().fieldErrors // Extrait les erreurs de manière structurée pour chaque champ : name, email et password
        }
    }

    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationFields.data)
    })

    if(res.ok) {
        redirect('/auth/signin');
    }
    else {
        return {
            // ConflictException
            message: res.status === 409 ? 'L\'utilisateur est déjà inscrit !' : res.statusText
        }
    }
}