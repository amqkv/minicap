import { Box } from "@chakra-ui/react";
import { Appointment, APPOINTMENT_DETAILS, CalendarEvent } from "@frontend/models/appointment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
export default function AppointmentCalendar({ appointmentList }: { appointmentList: Appointment[] }) {
    const today = new Date();
    const formats = {
        eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: any) =>
            `${localizer.format(start, "HH:mm", culture)} – ${localizer.format(end, "HH:mm", culture)}`,
        timeGutterFormat: (date: Date, culture: any) => localizer.format(date, "HH:mm", culture),
    };
    function transformToEvents() {
        const events: CalendarEvent[] = [];
        let appointmentDate = [];
        let startTime = "";
        let endTime = "";
        let appointmentDetails = APPOINTMENT_DETAILS;
        appointmentList.map(appointment => {
            appointmentDate = appointment.date.split("-");
            startTime = appointment.time.substring(0, appointment.time.indexOf(" "));
            endTime = appointment.time.substring(appointment.time.indexOf(" ") + 3);

            appointmentDetails = {
                ...appointmentDetails,
                year: parseInt(appointmentDate[0]),
                month: parseInt(appointmentDate[1]),
                day: parseInt(appointmentDate[2]),
                startHour: parseInt(startTime.substring(0, startTime.indexOf(":"))),
                startMinute: parseInt(startTime.substring(startTime.indexOf(":") + 1)),
                endHour: parseInt(endTime.substring(0, endTime.indexOf(":"))),
                endMinute: parseInt(endTime.substring(endTime.indexOf(":") + 1)),
            };
            events.push({
                id: appointment.appointmentId,
                title: `${appointment.firstName} ${appointment.lastName} (${
                    appointment.age
                }${appointment.gender.substring(0, 1)})`,
                start: new Date(
                    appointmentDetails.year,
                    appointmentDetails.month - 1,
                    appointmentDetails.day,
                    appointmentDetails.startHour,
                    appointmentDetails.startMinute
                ),
                end: new Date(
                    appointmentDetails.year,
                    appointmentDetails.month - 1,
                    appointmentDetails.day,
                    appointmentDetails.endHour,
                    appointmentDetails.endMinute
                ),
            });
        });
        return events;
    }
    return (
        <Box mt={10} mr={16}>
            <Calendar
                localizer={localizer}
                events={transformToEvents()}
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
