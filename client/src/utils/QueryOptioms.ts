import UserService from "@services/UserService";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const specialistQueryOptions = (filters: any) => {
  return queryOptions({
    queryKey: ['specialists', filters],
    queryFn: () => UserService.fetchSpecialists(filters),
    placeholderData: keepPreviousData
  });
};
