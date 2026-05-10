export type DeliveryMode = 'local' | 'chronopost';

const BUSINESS_TIMEZONE = 'Europe/Paris';
const LOCAL_CUTOFF_HOUR = 12;

type ZonedNow = {
  date: string;
  hour: number;
};

function getZonedParts(referenceDate: Date = new Date()): Record<string, string> {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return formatter.formatToParts(referenceDate).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});
}

export function getBusinessNow(referenceDate: Date = new Date()): ZonedNow {
  const parts = getZonedParts(referenceDate);

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
  };
}

function addDays(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function getWeekday(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).getUTCDay();
}

export function isChronopostDeliveryDate(dateStr: string): boolean {
  const weekday = getWeekday(dateStr);
  return weekday >= 2 && weekday <= 5;
}

export function getEarliestDeliveryDate(mode: DeliveryMode, referenceDate: Date = new Date()): string {
  const now = getBusinessNow(referenceDate);

  if (mode === 'local') {
    return now.hour < LOCAL_CUTOFF_HOUR ? now.date : addDays(now.date, 1);
  }

  let candidate = addDays(now.date, 1);
  while (!isChronopostDeliveryDate(candidate)) {
    candidate = addDays(candidate, 1);
  }

  return candidate;
}

export function isSelectableDeliveryDate(mode: DeliveryMode, dateStr: string, referenceDate: Date = new Date()): boolean {
  if (!dateStr) return false;

  const earliest = getEarliestDeliveryDate(mode, referenceDate);
  if (dateStr < earliest) return false;

  if (mode === 'chronopost') {
    return isChronopostDeliveryDate(dateStr);
  }

  return true;
}

export function getDeliveryModeLabel(mode: DeliveryMode): string {
  if (mode === 'local') {
    return 'Livraison locale 7j/7';
  }

  return 'Chronopost 24h ouvrées';
}

export function getDeliveryModeDetails(mode: DeliveryMode): string {
  if (mode === 'local') {
    return 'Livraison locale 7j/7. Le jour même pour toute commande passée avant 12h.';
  }

  return 'Expédition du lundi au jeudi. Livraison indicative en 24h ouvrées, hors week-end et aléas transporteur.';
}
