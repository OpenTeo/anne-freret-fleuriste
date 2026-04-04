/**
 * Wrapper autour de fetch qui ajoute automatiquement le header X-User-Id
 * pour l'authentification API côté serveur.
 */
export function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('af-current-user') : null;
  let userId: string | null = null;

  if (stored) {
    try {
      const user = JSON.parse(stored);
      userId = user.id || null;
    } catch {
      // ignore
    }
  }

  const headers = new Headers(options.headers);
  if (userId) {
    headers.set('x-user-id', userId);
  }

  return fetch(url, { ...options, headers });
}
