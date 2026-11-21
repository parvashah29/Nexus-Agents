// Gemini API key resolution.
//
// Priority:
//   1. A key the user pasted into the app (stored only in this browser's localStorage)
//   2. GEMINI_API_KEY from .env, injected at build/dev time by vite.config.ts
//
// Do NOT ship a build with a key in .env to a public site — it is embedded in the JS bundle.
// For public hosting, leave .env empty and let each visitor bring their own key.
const STORAGE_KEY = 'nexus_gemini_api_key';

export const getApiKey = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch {
    // localStorage unavailable (private mode etc.) — fall through to the env key
  }
  return (process.env.API_KEY || '').trim();
};

export const setApiKey = (key: string): void => {
  try {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } catch {
    /* ignore */
  }
};

export const clearApiKey = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

export const hasStoredKey = (): boolean => {
  try {
    return !!localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
};

export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

/** Turn raw Gemini SDK errors into something a user can act on. */
export const friendlyError = (err: any): string => {
  const raw = String(err?.message || err);
  if (err instanceof ApiKeyError) return err.message;
  if (/leaked/i.test(raw)) return 'Google disabled this API key because it was exposed publicly. Create a new key at https://aistudio.google.com/apikey and add it via the 🔑 button.';
  if (/API key not valid|API_KEY_INVALID|PERMISSION_DENIED|"code":\s*40[13]/i.test(raw)) return 'The Gemini API key was rejected. Check it via the 🔑 button.';
  if (/RESOURCE_EXHAUSTED|"code":\s*429|quota/i.test(raw)) return 'Gemini rate limit or quota reached. Wait a minute and try again.';
  if (/NOT_FOUND|"code":\s*404/i.test(raw)) return 'The configured Gemini model is not available for this key.';
  return raw;
};
