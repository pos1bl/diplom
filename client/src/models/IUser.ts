export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  role: string;
}

export enum Role {
  USER = 'user',
  SPECIALIST = 'specialist'
}
