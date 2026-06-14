
export const STORAGE_LIMITS = {
  free: 20 * 1024 * 1024,      // 20 MB
  pro: 500 * 1024 * 1024,     // 500 MB
  business: 1024 * 1024 * 1024 // 1 GB
};

export const BONUS_PER_REFERRAL_POINTS = 100;

export const REDEEMABLE_ITEMS = [
  {
    key: 'unlimited_pages',
    name: 'Unlimited Pages',
    description: 'Remove page creation limits from your account.',
    cost: 500,
    type: 'feature',
    value: true
  },
  {
    key: 'single_page_unlock',
    name: 'Extra Page Slot',
    description: 'Unlock one additional page slot.',
    cost: 200,
    type: 'slot',
    value: 1
  },
  {
    key: 'pdf_generator_access',
    name: 'PDF Generator Pro',
    description: 'Unlock the advanced PDF generation tool.',
    cost: 300,
    type: 'feature',
    value: true
  }
];

export type UserPlan = keyof typeof STORAGE_LIMITS;
