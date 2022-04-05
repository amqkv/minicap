import moment from "moment";

export interface Appointment {
    doctorId?: number;
    appointmentId: number;
    patientId: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    date: string;
    time: string;
    status: string;
}

export interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export const APPOINTMENT_STATUS = {
    CONFIRMED: "confirmed",
    PENDING: "pending",
    DECLINED: "declined",
};

export const APPOINTMENT_TIMESLOTS = [
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00",
];

export const SECTION = {
    UPCOMING: "UPCOMING",
    PAST: "PAST",
};

export const APPOINTMENT_DETAILS = {
    year: 0,
    month: 0,
    day: 0,
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
};

export const DEFAULT_APPOINTMENT = { patientId: 0, date: "", time: "" };

export const MOCK_APPOINTMENT = {
    appointmentId: 0,
    patientId: 0,
    firstName: "Mock",
    lastName: "Patient",
    age: 0,
    gender: "Female",
    date: "2022-01-01",
    time: "09:00 - 09:30",
    status: APPOINTMENT_STATUS.CONFIRMED,
};
export const MOCK_APPOINTMENT_TOMORROW = {
    ...MOCK_APPOINTMENT,
    date: moment().add(1, "days").format("YYYY-MM-DD"),
    status: APPOINTMENT_STATUS.DECLINED,
};
export const MOCK_APPOINTMENT_YESTERDAY = {
    ...MOCK_APPOINTMENT,
    date: moment().add(-1, "days").format("YYYY-MM-DD"),
    status: APPOINTMENT_STATUS.PENDING,
};
export const MOCK_APPOINTMENT_TODAY = {
    ...MOCK_APPOINTMENT,
    date: moment().format("YYYY-MM-DD"),
};
