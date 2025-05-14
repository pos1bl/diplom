import { IUser } from "./IUser";

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface AvailabilitySlot {
  dayOfWeek: DayOfWeek;
  from: string;
  to: string;
}

export interface ISpecialist {
  dateOfBirth: string;
  gender: Gender;
  bio: string;
  yearsOfExperience: number;
  mainAreas: string[];
  secondaryAreas: string[];
  excludedAreas: string[];
  methods: string[];
  specialNeeds: string[];
  availability: AvailabilitySlot[];
  avatarUrl: string;
  userId: string;

  user?: Pick<IUser, 'name'>
}
