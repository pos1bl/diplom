export interface IGiftPayload {
  to: string;
  from: string;
  email: string;
  priceId: string;
  amount: number;
  expirationDate: string;
  userId: string;
}
