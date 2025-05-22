import moment from "moment";
import 'moment/locale/uk';

import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Views,
} from "react-big-calendar";

moment.locale('uk')  
const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      views={[Views.DAY, Views.WEEK]}
    />
  );
}