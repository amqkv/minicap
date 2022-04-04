import { shallow } from "enzyme";
import { Calendar } from "react-big-calendar";
import AppointmentCalendar from "@frontend/components/doctor/appointment-calendar";
import { Box } from "@chakra-ui/react";

describe("<AppointmentCalendar/>", () => {
    const MOCK_APPOINTMENT = {
        appointmentId: 0,
        patientId: 0,
        firstName: "Mock",
        lastName: "Patient",
        age: 0,
        gender: "Female",
        date: "2022-01-01",
        time: "10:00 - 10:30",
        status: "pending",
    };
    const testAppointmentList = [MOCK_APPOINTMENT, MOCK_APPOINTMENT];
    const wrapper = shallow(<AppointmentCalendar appointmentList={testAppointmentList} />);
    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Renders all the Calendar components", () => {
        expect(wrapper.find(Calendar)).toHaveLength(1);
    });
});
