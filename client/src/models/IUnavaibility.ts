import { ISpecialist } from "./ISpecialist";
import { IUser } from "./IUser";

export enum UNAVAIBILITY_TYPES {
  VACATION = 'vacation',
  DAYOFF = 'dayOff',
  SICK = 'sick',
  OTHER = 'other',
}

export interface IUnavaibility {
  _id: string;
  specialist: ISpecialist & { user: IUser };
  type: UNAVAIBILITY_TYPES;
  note: string;
  start: string;
  end: string;
}
