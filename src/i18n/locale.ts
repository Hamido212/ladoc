import { cookies } from 'next/headers';

const COOKIE_NAME = 'LADOC_LOCALE';
const DEFAULT_LOCALE = 'de';

export async function getUserLocale(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: string) {
  'use server';
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}
