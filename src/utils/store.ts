const PREFIX = 'oppskrifteriet.no:';

type KEY = 'accessToken' | 'githubUser' | 'oppskrift';

export function setItem(
  key: KEY,
  payload: string | Record<PropertyKey, unknown>,
) {
  try {
    window.localStorage.setItem(
      `${PREFIX}${key}`,
      typeof payload === 'string' ? payload : JSON.stringify(payload),
    );
  } catch (reason: unknown) {
    console.error('failed to access localStorage: %s', reason);
  }
}

export function getItem(key: KEY) {
  let value: Record<PropertyKey, unknown> | string | null = null;
  try {
    value = window.localStorage.getItem(`${PREFIX}${key}`);
  } catch (reason: unknown) {
    console.error('failed to access localStorage: %s', reason);
  }
  if (value) {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        value = parsed;
      }
    } catch (reason: unknown) {
      console.error(
        'failed to parse value: %s, reason: %s, returning value',
        value,
        reason,
      );
    }
  }
  return value;
}
