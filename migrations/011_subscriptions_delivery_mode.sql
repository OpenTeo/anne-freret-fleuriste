-- Ajouter le mode de livraison aux abonnements
-- Permet de créer les colis Sendcloud pour les abonnés Chronopost
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS delivery_mode VARCHAR(20) DEFAULT 'local';
