import { Appointment, APPOINTMENT_DETAILS, CalendarEvent } from "@frontend/models/appointment";

export function transformToEvent(appointmentList: Appointment[]) {
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
            title: `${appointment.firstName} ${appointment.lastName} (${appointment.age}${appointment.gender.substring(
                0,
                1
            )})`,
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
    console.log(events);
    return events;
}
