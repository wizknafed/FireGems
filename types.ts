
export type Page = 'login' | 'dashboard';

export type AdminDecision = 'success' | 'reject';

export interface Package {
  id: string;
  amount: string;
  label: string;
  bonus: string;
  price: string;
}

export interface ProcessingState {
  status: 'idle' | 'input_uid' | 'processing' | 'result';
  uid: string;
  selectedPackage: Package | null;
  error?: string;
}
