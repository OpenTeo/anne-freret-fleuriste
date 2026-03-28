# Configuration Supabase

## 1. Créer un compte Supabase

1. Va sur [supabase.com](https://supabase.com)
2. Crée un compte gratuit (email + mot de passe ou GitHub)
3. Clique sur "New Project"
4. Remplis :
   - **Name** : `anne-freret-fleuriste`
   - **Database Password** : (note-le bien, tu en auras besoin)
   - **Region** : `Europe (Paris)` ou `Europe (Frankfurt)`
   - **Pricing Plan** : Free (50k lignes, 500MB, suffisant pour démarrer)
5. Clique "Create new project" (prend 2-3 minutes)

## 2. Exécuter le schéma SQL

1. Dans ton projet Supabase, va dans **SQL Editor** (menu gauche)
2. Clique "New query"
3. Copie-colle TOUT le contenu de `supabase-schema.sql`
4. Clique "Run" (bouton vert en bas à droite)
5. Tu devrais voir : `Success. No rows returned`

## 3. Récupérer les clés API

1. Va dans **Settings** → **API** (menu gauche)
2. Tu verras deux sections :
   - **Project URL** : `https://XXXXXXXX.supabase.co`
   - **API Keys** :
     - `anon` `public` (clé publique)

3. Copie ces deux valeurs

## 4. Ajouter les variables d'environnement

### En local (`/Users/money/.openclaw/workspace/PROJECTS/ANNE_FRERET/code/.env.local`)

Ajoute ces deux lignes :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXX
```

### Sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Ouvre ton projet `anne-freret-fleuriste`
3. Va dans **Settings** → **Environment Variables**
4. Ajoute deux nouvelles variables :
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://XXXXXXXX.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...` (la clé anon)
5. Clique "Save"
6. **Redéploie** : Va dans **Deployments** → Clique sur les 3 points du dernier deploy → "Redeploy"

## 5. Tester

1. Fais une commande test sur le site
2. Vérifie dans Supabase :
   - Va dans **Table Editor** (menu gauche)
   - Clique sur `orders` → tu devrais voir ta commande
   - Clique sur `order_items` → tu devrais voir les articles

## 6. Consulter les commandes

### En tant qu'admin
- Va sur `/admin` → Onglet "Commandes"
- Les commandes Supabase s'affichent automatiquement

### En tant que client
- Connecte-toi avec l'email de la commande
- Va sur "/compte/commandes"
- Tu verras toutes tes commandes

## Sécurité RLS (Row Level Security)

Le schéma SQL a déjà activé RLS avec des politiques permissives pour simplifier :
- **INSERT** : Autorisé pour tous (webhook Stripe)
- **SELECT** : Autorisé pour tous (affichage public)
- **UPDATE** : Autorisé pour tous (admin)

⚠️ **Pour la production** : Tu devrais restreindre l'accès UPDATE/DELETE à un rôle admin spécifique. Pour l'instant, c'est OK pour lancer le site.

## Troubleshooting

### Erreur "Missing Supabase environment variables"
- Vérifie que `.env.local` contient bien les deux variables
- Redémarre le serveur Next.js : `npm run dev`

### Erreur "relation does not exist"
- Tu n'as pas exécuté `supabase-schema.sql`
- Retourne à l'étape 2

### Commandes n'apparaissent pas dans `/compte/commandes`
- Vérifie que l'email de commande = email de connexion
- Ouvre la console navigateur (F12) → onglet Network → regarde la réponse de `/api/orders?email=...`

### Webhook Stripe ne sauvegarde pas
- Vérifie les logs Vercel : **Deployments** → dernier deploy → **Functions** → `/api/webhook`
- Cherche "Erreur insertion commande" dans les logs
