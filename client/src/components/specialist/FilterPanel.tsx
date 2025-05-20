import useDebounce from '@hooks/useDebounce';
import useFilters from '@hooks/useFilters';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from 'react';
import { StyledFilter } from '@components/styled/user/appointemts';
import { ContainedButton } from '@components/shared/ContainedButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/GMT");

export const FilterPanel = () => {
  const { filters, setFilters, resetFilters } = useFilters('/_authenticated/specialist');
  const [currentFilters, setCurrentFilters] = useState<Partial<any>>(filters);
  const debouncedFilters = useDebounce(currentFilters, 500);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setFilters(debouncedFilters);
    }
  }, [debouncedFilters]);

  const handleDateChange = (fieldName: string, field: any) => {
    const date = dayjs.utc(field).startOf("day")
    const newValue = !date || !date.isValid() ? undefined : date.toDate();
  
    return setCurrentFilters((prevFilters) => ({ ...prevFilters, [fieldName]: newValue }));
  };
  
  return (
    <Box sx={{ borderRadius: "8px", border: "solid 1px #F5F1FA", display: "flex", flexWrap: "wrap" }}>
      <StyledFilter>
        <DatePicker
          label="Початкова дата"
          value={currentFilters.startDate ? dayjs.utc(currentFilters.startDate).startOf('day') : null}
          onChange={(newValue) => handleDateChange("startDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <DatePicker
          label="Кінцева дата"
          value={currentFilters.endDate ? dayjs.utc(currentFilters.endDate).endOf('day') : null}
          onChange={(newValue) => handleDateChange("endDate", newValue)}
        />
      </StyledFilter>

      <StyledFilter>
        <ContainedButton
        onClick={() => {
          if (resetFilters) {
            setCurrentFilters({});
            setTimeout(() => {
              resetFilters();
            }, 0);
          }
        }}
      >
        Очистити фільтр
      </ContainedButton>
      </StyledFilter>
    </Box>
  )
};
