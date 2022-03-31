import { Box } from "@chakra-ui/react";
import { Appointment } from "@frontend/models/appointment";
import { Calendar, Culture, DateLocalizer, DateRange, Formats, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { transformToEvent } from "@frontend/functions/transform-to-calendar-event";
import { useMemo } from "react";

const localizer = momentLocalizer(moment);
export default function AppointmentCalendar({ appointmentList }: { appointmentList: Appointment[] }) {
    const today = new Date();
    const formats = {
        eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: any) =>
            `${localizer.format(start, "HH:mm", culture)} – ${localizer.format(end, "HH:mm", culture)}`,
        timeGutterFormat: (date: Date, culture: any) => localizer.format(date, "HH:mm", culture),
    };

    return (
        <Box mt={10} mr={16}>
            <Calendar
                localizer={localizer}
                events={transformToEvent(appointmentList)}
                defaultView="week"
                formats={formats}
                defaultDate={today}
                style={{ height: "650px", width: "1050px" }}
                min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30)}
                max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 30)}
            />
        </Box>
    );
}
