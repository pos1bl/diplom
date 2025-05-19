import { Role } from "@models/IUser";
import SessionsService from "@services/SessionsService";
import UserService from "@services/UserService";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const specialistsQueryOptions = (filters: any) => {
  return queryOptions({
    queryKey: ['specialists', filters],
    queryFn: () => UserService.fetchSpecialists(filters),
    placeholderData: keepPreviousData
  });
};

export const specialistQueryOptions = (id: string, userId: string) => {
  return queryOptions({
    queryKey: ['specialist', id, userId],
    queryFn: () => UserService.fetchSpecialist(id, userId),
    placeholderData: keepPreviousData
  });
};

export const sessionQueryOptions = (role: Role, id: string) => {
  return queryOptions({
    queryKey: ['session', role, id],
    queryFn: () => SessionsService.fetchSession(role, id),
    placeholderData: keepPreviousData
  });
};
