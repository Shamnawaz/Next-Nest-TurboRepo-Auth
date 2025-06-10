# 🛡️ Next-Nest-TurboRepo-Auth

Ce projet est un système d'authentification complet construit avec **Next.js (frontend)**, **NestJS (backend)**, le tout orchestré avec **TurboRepo** pour une gestion monorepo efficace. Il intègre l’authentification via mot de passe et Google OAuth 2.0, une gestion sécurisée des tokens JWT (access/refresh), le contrôle d'accès basé sur les rôles (RBAC) et une configuration PostgreSQL avec Prisma.

---

## 🚀 Fonctionnalités

### 🔧 Backend - NestJS

- ✅ Inscription (Sign Up)
- ✅ Connexion avec nom d'utilisateur et mot de passe
- ✅ Authentification Google OAuth 2.0
- ✅ Base de données PostgreSQL avec Prisma
- 🔐 Sécurisation des routes API avec JWT
- 🔄 Rafraîchissement des tokens (Refresh Tokens)
- 🛑 Révocation des tokens (Revoke Tokens)
- 🔐 Contrôle d'accès basé sur les rôles (RBAC)
- 🌐 Gestion des routes publiques
- ⚙️ Configuration avancée NestJS

### 🎯 Frontend - Next.js

- 📝 Formulaire d'inscription (Sign Up Form)
- 🔑 Formulaire de connexion (Sign In Form)
- 🧠 Gestion de formulaire avec `useActionState`
- 📦 Sessions persistantes
- ♻️ Mise à jour des sessions
- 🔐 Protection des pages
- 🛡️ Middleware pour l'authentification
- 🔐 Contrôle d'accès basé sur les rôles (RBAC)

---

## 🧱 Stack Technique

- **Monorepo** : [TurboRepo](https://turbo.build/)
- **Backend** : [NestJS](https://nestjs.com/)
- **Frontend** : [Next.js 15](https://nextjs.org/)
- **ORM** : [Prisma](https://www.prisma.io/)
- **Validation** : [Zod](https://zod.dev/)
- **Auth** : JWT (signé, vérifié et géré avec **JOSE**), Refresh Token, Google OAuth 2.0
- **Base de données** : PostgreSQL
- **UI State** : `useActionState`

---

## 📁 Structure du projet

```plaintext
apps/
├── web/    # Frontend Next.js
└── api/    # Backend NestJS

packages/
├── config/ # Configuration partagée
└── ui/     # Composants UI réutilisables
```

---

## 🔐 Authentification

- **JWT Access Token** signé, vérifié et géré côté frontend (Next.js) avec la librairie **JOSE**
- **Gestion des sessions JWT** sécurisées dans des cookies `httpOnly` via server actions et middlewares Next.js
- **Refresh Token** sécurisé pour maintenir la session
- **OAuth 2.0** via Google
- **RBAC** (Role-Based Access Control) implémenté côté backend NestJS

---

## 🔍 Validation des Formulaires

La validation côté client est assurée avec la librairie **Zod**, permettant une validation **typée**, **fiable** et **réutilisable**.

- Valider les champs lors de l'inscription et de la connexion (nom, email, mot de passe)

- Générer des messages d'erreur précis pour chaque champ

- Structurer et typer les erreurs de manière claire

- Garantir la cohérence des données avant l'envoi au backend

---

## 🚦 Sécurité

- Cookies sécurisés (`httpOnly`, `Secure`)
- Middleware de protection des routes côté frontend
- Guards et decorators NestJS pour sécuriser les endpoints backend

---

## 🏁 Démarrage rapide

### Prérequis

- Node.js 18+
- PostgreSQL
- npm

### Installation

```bash
git clone https://github.com/Shamnawaz/Next-Nest-TurboRepo-Auth
cd Next-Nest-TurboRepo-Auth
npm install
npm run dev
```
