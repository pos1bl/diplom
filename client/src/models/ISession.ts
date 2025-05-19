import { Dayjs } from "dayjs";
import { ISpecialist } from "./ISpecialist";
import { IUser } from "./IUser";
import { IGift } from "./IGift";

export enum SESSION_STATUSES {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show',
}

export enum SESSION_TYPES {
  FREE = 'free',
  GIFT = 'gift',
  PAID = 'paid',
}

export interface ISession {
  _id: string;
  status: SESSION_STATUSES;
  notes: string;
  type: SESSION_TYPES;
  scheduledAt: string;
  userId: string;
  specialistId: string;
  isMoved: boolean;

  specialist?: ISpecialist & { user: Pick<IUser, 'name'> };
  user?: string;
  gift?: IGift;
}

export interface ISessionPayload {
  selectedDate: Dayjs;
  selectedSlot: string;
  priceId: string;
  specialistId: string;
}

export type IFreeSessionPayload = Omit<ISessionPayload, "priceId">
export type IGiftSessionPayload = Omit<ISessionPayload, "priceId"> & { giftId: string }
export type IMoveSessionPayload = Pick<ISessionPayload, "selectedDate" | "selectedSlot">
