export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  role: string;
  name: string;
}

export enum Role {
  USER = 'user',
  SPECIALIST = 'specialist'
}
