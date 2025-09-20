export const TabNameValues = [
  'main',
  'client',
  'history',
  'variables',
] as const;

export type TabNames = (typeof TabNameValues)[number];
