import { ISpecialist } from "@models/ISpecialist";

export interface IFetchSpecialistsResponse {
  specialists: ISpecialist[];
  totalCount: number;
}
