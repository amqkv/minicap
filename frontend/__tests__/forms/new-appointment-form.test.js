import { shallow } from "enzyme";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";
import { Box, Select, Flex, Center, Heading, FormLabel, Button } from "@chakra-ui/react";
import {
    MOCK_APPOINTMENT,
    MOCK_APPOINTMENT_TODAY,
    MOCK_APPOINTMENT_TOMORROW,
    MOCK_APPOINTMENT_YESTERDAY,
} from "@frontend/models/appointment";

describe("<NewAppointmentForm/>", () => {
    const testAppointmentList = [
        MOCK_APPOINTMENT,
        MOCK_APPOINTMENT_TODAY,
        MOCK_APPOINTMENT_TOMORROW,
        MOCK_APPOINTMENT_YESTERDAY,
    ];
    const testDoctorUserId = 1202;
    const testPatientInfo = {
        patientId: 599,
        firstName: "Test",
        lastName: "Patient",
        age: 0,
        gender: "Male",
    };
    const testPatientList = [testPatientInfo];
    const wrapper = shallow(
        <NewAppointmentForm
            appointmentList={testAppointmentList}
            userId={testDoctorUserId}
            patientList={testPatientList}
        />
    );
    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(2);
    });
    it("Renders all the Heading components", () => {
        expect(wrapper.find(Heading)).toHaveLength(1);
    });
    it("Renders all the Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(3);
    });
    it("Renders all the Select components", () => {
        expect(wrapper.find(Select)).toHaveLength(2);
    });
    it("Renders all the FormLabel components", () => {
        expect(wrapper.find(FormLabel)).toHaveLength(3);
    });
    it("Renders all the Button components", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
