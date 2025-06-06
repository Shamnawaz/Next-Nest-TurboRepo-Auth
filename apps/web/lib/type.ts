import { z } from "zod";

export type FormState = {
    error?: {
        name?: string[];
        email?: string[];
        password?: string[];
    },
    message?: string;
} | undefined

export const signupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
        .trim(),
    email: z.string().email({ message: "Adresse email invalide" }).trim(),
    password: z
        .string()
        .min(8, { message: "Doit contenir au moins 8 caractères." })
        .regex(/[a-zA-Z]/, { message: "Doit contenir au moins une lettre." })
        .regex(/[0-9]/, { message: "Contient au moins un chiffre" })
        .regex(/[^a-zA-Z0-9]/, { message: "Contient au moins un caractère spécial" })
        .trim()
});

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string().min(1, { message: "Le champ mot de passe ne doit pas être vide" }),
});