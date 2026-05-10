-- Correction du CHECK CONSTRAINT sur subscriptions.status
-- Le code webhook utilise 'unpaid' pour les échecs de paiement Stripe
-- mais l'ancien constraint ne l'autorisait pas → UPDATE échouait silencieusement
ALTER TABLE subscriptions
DROP CONSTRAINT IF EXISTS subscriptions_status_check;

ALTER TABLE subscriptions
ADD CONSTRAINT subscriptions_status_check
CHECK (status IN ('active', 'paused', 'cancelled', 'unpaid'));
