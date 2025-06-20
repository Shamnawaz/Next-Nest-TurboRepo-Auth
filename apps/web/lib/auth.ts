'use server';

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, loginFormSchema, signupFormSchema } from "./type";
import { createSession, updateTokens } from "./session";

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
    });

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
        };
    }

    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationFields.data)
    });

    if(res.ok) {
        redirect('/auth/signin');
    }
    else {
        return {
            // ConflictException
            message: res.status === 409 ? 'L\'utilisateur est déjà inscrit !' : res.statusText
        };
    }
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
    const validationFields = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if(!validationFields.success) {
        return { error: validationFields.error.flatten().fieldErrors };
    }

    const res = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validationFields.data)
    });

    if(res.ok) {
        const result = await res.json();
        // TODO Créer une session pour les user authentifié
        await createSession({
            user: {
                id: result.id,
                name: result.name,
                role: result.role,
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
        redirect('/');
        
    } else {
        return {
            message: res.status === 401 ? 'Mot de passe inccorrect' : res.statusText
        };
    }
}

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh: oldRefreshToken
            })
        })

        if(!res.ok) throw new Error('Failed to Refresh Token')

        const {accessToken, refreshToken} = await res.json();
        // Mettre à jour la session avec de nouveaux tokens + remplacer par le nom de domaine en prod
        const updateRes = await fetch('http://localhost:3000/api/auth/update', {
            method: 'POST',
            body: JSON.stringify({
                accessToken,
                refreshToken
            })
        });

        if(!updateRes.ok) throw new Error('Failed to update Tokens');

        return accessToken;

    } catch (error) {
        console.error('Refresh Token Failed', error);
        return null;
    }
}