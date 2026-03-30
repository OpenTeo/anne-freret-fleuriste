#!/bin/bash
# Script pour mettre à jour les clés SendCloud dans Vercel

echo "Mise à jour des clés SendCloud dans Vercel Production..."

# Public Key
echo "63ca015e-b9cb-4751-b4ab-88c2cda8d09e" | vercel env rm SENDCLOUD_PUBLIC_KEY production -y 2>/dev/null
echo "63ca015e-b9cb-4751-b4ab-88c2cda8d09e" | vercel env add SENDCLOUD_PUBLIC_KEY production

# Secret Key
echo "87f7249922644207bb26fa1b7c05db21" | vercel env rm SENDCLOUD_SECRET_KEY production -y 2>/dev/null
echo "87f7249922644207bb26fa1b7c05db21" | vercel env add SENDCLOUD_SECRET_KEY production

echo "✅ Clés mises à jour ! Redéploiement nécessaire..."
vercel --prod

echo "✅ Déploiement terminé !"
