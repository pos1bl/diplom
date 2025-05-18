import { Dayjs } from "dayjs";
import { ISpecialist } from "./ISpecialist";
import { IUser } from "./IUser";

export enum SESSION_STATUSES {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show',
}

type SessionStatus = SESSION_STATUSES;

export interface ISession {
  _id: string;
  jitsiRoom: string;
  status: SessionStatus;
  notes: string;
  isFree: boolean;
  scheduledAt: string;
  userId: string;
  specialistId: string;

  specialist?: Pick<ISpecialist, 'avatarUrl'>;
  user?: Pick<IUser, 'name'>;
}

export interface ISessionPayload {
  selectedDate: Dayjs;
  selectedSlot: string;
  priceId: string;
  specialistId: string;
}

export type IFreeSessionPayload = Omit<ISessionPayload, "priceId">
export type IGiftSessionPayload = Omit<ISessionPayload, "priceId"> & { giftId: string }
