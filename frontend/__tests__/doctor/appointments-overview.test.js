import { shallow } from "enzyme";
import AppointmentsOverview from "@frontend/pages/doctor/appointments-overview";
import AppointmentCalendar from "@frontend/components/doctor/appointment-calendar";
import AppointmentReminders from "@frontend/components/doctor/appointment-reminders";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import PatientInfoModal from "@frontend/components/modal/modal";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";
import { MinusIcon } from "@chakra-ui/icons";
import { BsCalendarPlus } from "react-icons/bs";
import {
    MOCK_APPOINTMENT,
    MOCK_APPOINTMENT_TODAY,
    MOCK_APPOINTMENT_TOMORROW,
    MOCK_APPOINTMENT_YESTERDAY,
} from "@frontend/models/appointment";

const testPatientInfo = {
    patientId: 599,
    firstName: "Test",
    lastName: "Patient",
    age: 0,
    gender: "Male",
};
const testAppointmentList = [
    MOCK_APPOINTMENT,
    MOCK_APPOINTMENT_TODAY,
    MOCK_APPOINTMENT_TOMORROW,
    MOCK_APPOINTMENT_YESTERDAY,
];
describe("<PatientChartsOverview/>", () => {
    const wrapper = shallow(
        <AppointmentsOverview appointmentList={testAppointmentList} patientList={[testPatientInfo]} userId={1202} />
    );
    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(9);
    });
    it("Renders all the Heading components", () => {
        expect(wrapper.find(Heading)).toHaveLength(3);
    });
    it("Renders all the Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all the AppointmentCalendar components", () => {
        expect(wrapper.find(AppointmentCalendar)).toHaveLength(1);
    });
    it("Renders all the Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(3);
    });
    it("Renders all the MinusIcon components", () => {
        expect(wrapper.find(MinusIcon)).toHaveLength(3);
    });
    it("Renders all the Button components", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it("Renders all the BsCalendarPlus components", () => {
        expect(wrapper.find(BsCalendarPlus)).toHaveLength(1);
    });
    it("Renders all the AppointmentReminders components", () => {
        expect(wrapper.find(AppointmentReminders)).toHaveLength(2);
    });
    it("Renders all the PatientInfoModal components", () => {
        expect(wrapper.find(PatientInfoModal)).toHaveLength(1);
    });
    it("Renders all the NewAppointmentForm components", () => {
        expect(wrapper.find(NewAppointmentForm)).toHaveLength(1);
    });
});
