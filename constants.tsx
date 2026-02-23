
import { Package } from './types';

export const PACKAGES: Package[] = [
  { id: '10k', amount: '10,000', label: 'Starter Pack', bonus: '+500 Bonus', price: 'FREE' },
  { id: '25k', amount: '25,000', label: 'Pro Bundle', bonus: '+2,000 Bonus', price: 'FREE' },
  { id: '50k', amount: '50,000', label: 'Elite Crate', bonus: '+5,000 Bonus', price: 'FREE' },
  { id: '100k', amount: '100,000', label: 'Grand Master', bonus: '+15,000 Bonus', price: 'FREE' },
];

export const LOGIN_CREDENTIALS = {
  user: 'admin',
  pass: 'admin123'
};
