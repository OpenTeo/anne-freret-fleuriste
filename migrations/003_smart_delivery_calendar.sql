-- Migration 003: Smart Delivery Calendar
-- Calendrier intelligent pour abonnements

-- Fonction pour calculer la prochaine livraison selon fréquence
CREATE OR REPLACE FUNCTION calculate_next_delivery_smart(
  p_frequency VARCHAR(20),
  p_from_date DATE DEFAULT CURRENT_DATE
) RETURNS DATE AS $$
DECLARE
  v_dow INTEGER; -- day of week (1=lundi, 7=dimanche)
  v_day INTEGER;
BEGIN
  IF p_frequency = 'weekly' THEN
    -- Prochain lundi
    v_dow := EXTRACT(ISODOW FROM p_from_date)::INTEGER; -- 1=lundi, 7=dimanche
    IF v_dow = 1 THEN
      -- Déjà lundi, prendre le suivant
      RETURN p_from_date + INTERVAL '7 days';
    ELSE
      -- Calculer jours jusqu'au prochain lundi
      RETURN p_from_date + ((8 - v_dow) || ' days')::INTERVAL;
    END IF;
    
  ELSIF p_frequency = 'biweekly' THEN
    -- Prochain 1er ou 15 du mois
    v_day := EXTRACT(DAY FROM p_from_date)::INTEGER;
    
    IF v_day < 15 THEN
      -- On est avant le 15, livraison le 15 de ce mois
      RETURN DATE_TRUNC('month', p_from_date) + INTERVAL '14 days';
    ELSE
      -- On est après le 15, livraison le 1er du mois prochain
      RETURN DATE_TRUNC('month', p_from_date) + INTERVAL '1 month';
    END IF;
    
  ELSE -- monthly
    -- Prochain 1er du mois
    v_day := EXTRACT(DAY FROM p_from_date)::INTEGER;
    
    IF v_day = 1 THEN
      -- Déjà le 1er, prendre le mois prochain
      RETURN DATE_TRUNC('month', p_from_date) + INTERVAL '1 month';
    ELSE
      -- Aller au 1er du mois prochain
      RETURN DATE_TRUNC('month', p_from_date) + INTERVAL '1 month';
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Ajouter colonne stripe_subscription_id si pas déjà fait
ALTER TABLE subscriptions 
  ADD COLUMN IF NOT EXISTS stripe_price_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255);

-- Mettre à jour l'abonnement test avec la bonne date de livraison
UPDATE subscriptions
SET next_delivery_date = calculate_next_delivery_smart(frequency, CURRENT_DATE)
WHERE next_delivery_date IS NULL OR next_delivery_date < CURRENT_DATE;

-- Créer index sur stripe_subscription_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
