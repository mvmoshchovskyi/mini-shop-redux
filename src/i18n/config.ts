export type Language = 'uk' | 'en';

export const DEFAULT_LANGUAGE: Language = 'uk';

export const LANGUAGE_STORAGE_KEY = 'mini-shop-language';

export const SUPPORTED_LANGUAGES: Array<{
  value: Language;
  label: string;
}> = [
  { value: 'uk', label: 'УКР' },
  { value: 'en', label: 'EN' },
];
