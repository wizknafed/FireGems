
export interface DiamondPackage {
  id: number;
  amount: string;
  price: string;
  bonus: string;
  image: string;
}

export interface AppState {
  isLoggedIn: boolean;
  user: string | null;
  isAdmin: boolean;
  topupSuccessful: boolean;
}

export enum View {
  HOME = 'home',
  ADMIN = 'admin'
}
