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
