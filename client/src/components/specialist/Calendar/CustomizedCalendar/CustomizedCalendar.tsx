import { EventProps, Views } from "react-big-calendar";
import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import moment from "moment";
import Calendar from "../Calendar";
import { useSessionStore } from "@hooks/useStore";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import BlockoutEvent from "./BlockutEvent";
import { AppointmentEvent } from "./AppointmentEvent";
import { dateWithoutTimezone, EventItem, VIEW_OPTIONS } from "@utils/specialist/Calendar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ContainedButton } from "@components/shared/ContainedButton";
import { OutlinedButton } from "@components/shared/OutlinedButton";
import "./index.css";

type Keys = keyof typeof Views;
const PRIMARY_COLOR = "#AC98D1";
const SECONDARY_COLOR  = "#6A1B9A";

export default function CustomizedCalendar() {
  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const { sessions } = useSessionStore();
  const navigate = useNavigate();

  const onPrevClick = useCallback(async () => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).subtract(1, "w").toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(async () => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "w").toDate());
    }
  }, [view, date]);


  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment.utc(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("DD.MM")} - ${to.format("DD.MM")}`;
    }
  }, [view, date]);

  const components: any = {
    event: ({ event }: EventProps<EventItem>) => {
      const data = event?.data;
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
          />
        );

      if (data?.blockout) {
        return <BlockoutEvent blockout={data?.blockout} />;
      }

      return null;
    },
  };

  const onTodayClick = useCallback(async () => {
    setDate(moment().toDate());
  }, []);

  const events = sessions.map(s => {
    const m = moment(s.scheduledAt)
    return ({
    data: {
      appointment: s
    },
    start: new Date(dateWithoutTimezone(m.toDate())),
    end:  new Date (dateWithoutTimezone(m.clone().add(50, "minutes").toDate())),
    resource: s,
  })});

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" gap={2} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <ContainedButton sx={{ mb: 2 }} onClick={onTodayClick}>Перейти до сьогодні</ContainedButton>
          <Box display="flex">
            <IconButton
              aria-label="Попередній"
              onClick={onPrevClick}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box
              display="flex"
              borderRadius={2}
              pl={4}
              pr={4}
              bgcolor={PRIMARY_COLOR}
              color="white"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5">{dateText}</Typography>
            </Box>
            <IconButton
              aria-label="Наступний"
              onClick={onNextClick}
            >
              <ArrowForwardIcon  />
            </IconButton>
          </Box>

        <ButtonGroup
          variant="outlined" 
          sx={{ gap: 0 }}
        >
          {VIEW_OPTIONS.map(({ id, label }) => (
            <OutlinedButton
              key={id}
              onClick={() => setView(id)}
              sx={{
                padding: '6px 10px',
                '&:hover': {
                    backgroundColor: SECONDARY_COLOR,
                    color: 'white',
                  },
                ...(id === view && {
                  backgroundColor: PRIMARY_COLOR,
                  color: 'white',
                }),
              }}
            >
              {label}
            </OutlinedButton>
          ))}
        </ButtonGroup>
      </Box>
        <Calendar
          events={events}
          defaultDate={moment().toDate()}
          defaultView={Views.WEEK}
          min={moment().startOf('day').add(6, "hours").toDate()}
          max={moment().startOf('day').add(23, "hours").toDate()}
          components={components}
          toolbar={false}
          date={date}
          view={view}
          onView={setView}
          onNavigate={setDate}
          onSelectEvent={event => {
            navigate({
              to: "/specialist/appointment/$appointmentId",
              params: { appointmentId: event.resource._id },
            });
          }}
        />
    </Box>
  );
}
