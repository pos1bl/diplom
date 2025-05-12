import { IUser } from "./IUser";

type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

interface AvailabilitySlot {
  dayOfWeek: DayOfWeek;
  from: string;
  to: string;
}

export interface ISpecialist {
  dateOfBirth: string;
  gender: Gender;
  bio: string;
  yearsOfExperience: Number;
  mainAreas: string[];
  secondaryAreas: string[];
  excludedAreas: string[];
  methods: string[];
  languages: string[];
  availability: AvailabilitySlot[];
  avatarUrl: string;
  userId: string;

  user?: Pick<IUser, 'name'>
}
