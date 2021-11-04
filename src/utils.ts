export const uniqueId = (prefix?: string): string =>
  `${prefix || ''}${Date.now().toString()}`;
