export const TabNameValues = ['main', 'client', 'history'] as const;

export type TabNames = (typeof TabNameValues)[number];
