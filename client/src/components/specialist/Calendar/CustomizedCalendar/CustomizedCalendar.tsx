import { EventProps, Views } from "react-big-calendar";
import { Box } from "@mui/material";
import moment from "moment";
import Calendar from "../Calendar";
import { useSessionStore } from "@hooks/useStore";
import { useNavigate } from "@tanstack/react-router";
import { cloneElement, JSX, useCallback, useMemo, useState } from "react";
import BlockoutEvent from "./BlockutEvent";
import { AppointmentEvent } from "./AppointmentEvent";
import { EventItem } from "@utils/specialist/Calendar";

type Keys = keyof typeof Views;
const PRIMARY_COLOR = "#6A1B9A";
const SECONDARY_COLOR  = "#246899";

export default function CustomizedCalendar() {
  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [contextMenuInfo, setContextMenuInfo] = useState<{
    xPosition: number;
    yPosition: number;
    selectedTime: string;
    resourceId: number;
  }>();

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d").toDate());
    } else {
      setDate(moment(date).subtract(1, "w").toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else {
      setDate(moment(date).add(1, "w").toDate());
    }
  }, [view, date]);

  const [zoom, setZoom] = useState([5]);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
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
    timeSlotWrapper: ({
      children,
      value,
      resource,
    }: {
      children: JSX.Element;
      value: string;
      resource: number;
    }) => {
      return cloneElement(children, {
        onContextMenu: (e: MouseEvent) => {
          e.preventDefault();
          setContextMenuInfo({
            xPosition: e.clientX,
            yPosition: e.clientY,
            selectedTime: value,
            resourceId: resource,
          });
        },
      });
    },
  };

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  const navigate = useNavigate();
  const { sessions } = useSessionStore();
  const events = sessions.map(s => ({
    title: typeof s.user !== 'string'  && s.user.name,
    start: new Date(s.scheduledAt),
    end:  moment(s.scheduledAt).add(50, "minutes").toDate(),
    resource: s,
  }));
  // return (
  //   <Box
  //     height="100%"
  //     sx={{
  //       overflow: "auto"
  //     }}
  //   >
  //     <Calendar
  //       events={events}
  //       defaultDate={moment().toDate()}
  //       defaultView={Views.WEEK}
  //       min={moment().startOf('day').add(6, "hours").toDate()}
  //       max={moment().startOf('day').add(23, "hours").toDate()}
  //       onSelectEvent={event => {
  //         navigate({
  //           to: "/specialist/appointment/$appointmentId",
  //           params: { appointmentId: event.resource._id },
  //         });
  //       }}
  //     />
  //   </Box>

  return (
    <Box height="100%" direction={"column"} width="100%" gap={2} p={2}>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Box p={2} width="300px">
          <Flex gap={4} alignItems="center">
            <ZoomOut size={20} />
            <RangeSlider
              value={zoom}
              onChange={(zoom) => {
                setZoom(zoom);
              }}
              min={5}
              max={20}
            >
              <RangeSliderTrack bg="lightgray">
                <RangeSliderFilledTrack bg={PRIMARY_COLOR} />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} bg={SECONDARY_COLOR} />
            </RangeSlider>
            <ZoomIn size={20} />
          </Flex>
        </Box>
        <Box
          css={css`
            input {
              border: 2px solid ${PRIMARY_COLOR};
              border-radius: 24px;
              padding: 6px;
              padding-left: 10px;
            }
            z-index: 4;
            position: relative;
          `}
        >
          <DatePicker
            selected={date}
            onChange={(date: Date) => setDate(date)}
          />
        </Box>
        <Flex gap={4}>
          <Button onClick={onTodayClick}>Today</Button>
          <Flex>
            <IconButton
              aria-label="Previous"
              icon={<ArrowLeft />}
              onClick={onPrevClick}
            />
            <Flex
              pl={4}
              pr={4}
              bg={PRIMARY_COLOR}
              color="white"
              alignItems={"center"}
              justifyContent="center"
              width={260}
            >
              <Text fontSize={"medium"}>{dateText}</Text>
            </Flex>
            <IconButton
              aria-label="Next"
              icon={<ArrowRight />}
              onClick={onNextClick}
            />
          </Flex>
        </Flex>

        <ButtonGroup gap={0} spacing={0} isAttached>
          {VIEW_OPTIONS.map(({ id, label }) => (
            <Button
              onClick={() => setView(id)}
              {...(id === view
                ? {
                    bg: PRIMARY_COLOR,
                    color: "white",
                    _hover: {
                      bg: SECONDARY_COLOR,
                      color: "white",
                    },
                  }
                : {})}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
      <Box
        flex={1}
        width="100%"
        overflow="auto"
        position={"relative"}
        css={css`
          /* Zoom CSS */
          .rbc-timeslot-group {
            min-height: ${zoom?.[0] * 24}px !important;
          }
          ${timeSlotLinesMap[STEP as TimeSlotMinutes]}
        `}
        onClick={(e) => {
          setContextMenuInfo(undefined);
        }}
      >
        <Box zIndex={10} pos="relative">
          <Menu isLazy isOpen={!!contextMenuInfo} onClose={() => {}}>
            {contextMenuInfo && (
              <MenuButton
                style={{
                  position: "fixed",
                  zIndex: 1000,
                  top: contextMenuInfo.yPosition,
                  left: contextMenuInfo.xPosition,
                }}
              ></MenuButton>
            )}
            <MenuList>
              <MenuItem
                onClick={() =>
                  alert(
                    `You have selected ${moment(
                      contextMenuInfo?.selectedTime
                    )?.format("DD/MM/YYYY hh:mm a")} for resource ${
                      RESOURCES.find(
                        (resource) =>
                          resource.id === contextMenuInfo?.resourceId
                      )?.title
                    }`
                  )
                }
              >
                New Appointment
              </MenuItem>
              <MenuItem>New Blockout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Calendar
          events={events}
          defaultDate={moment().toDate()}
          defaultView={Views.WEEK}
          min={moment().startOf('day').add(6, "hours").toDate()}
          max={moment().startOf('day').add(23, "hours").toDate()}
          resources={view === Views.DAY ? RESOURCES : undefined}
          // Custom Props

          // Components
          components={components}
          // Toolbar
          toolbar={false}
          date={date}
          view={view}
          onView={setView}
          onNavigate={setDate}
        />
      </Box>
    </Box>
  );
}