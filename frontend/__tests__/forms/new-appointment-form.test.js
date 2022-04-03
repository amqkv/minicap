import { shallow } from "enzyme";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";
import { Box, Select, Flex, Heading, FormLabel, Button, Input } from "@chakra-ui/react";
import {
    MOCK_APPOINTMENT,
    MOCK_APPOINTMENT_TODAY,
    MOCK_APPOINTMENT_TOMORROW,
    MOCK_APPOINTMENT_YESTERDAY,
} from "@frontend/models/appointment";
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

describe("<NewAppointmentForm/>", () => {
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

describe("onChange function calls", () => {
    const wrapper = shallow(
        <NewAppointmentForm
            appointmentList={testAppointmentList}
            userId={testDoctorUserId}
            patientList={testPatientList}
        />
    );
    const select = wrapper.find(Select);
    const input = wrapper.find(Input);
    it("Calls selectPatient() on input change", () => {
        select.at(0).simulate("change", { target: { value: "Patient Name" } });
        wrapper.update();
    });
    it("Calls selectTime() on input change", () => {
        select.at(1).simulate("change", { target: { value: "10:00 - 10:30" } });
        wrapper.update();
    });
    it("Calls pickDate() on input change", () => {
        input.simulate("change", { target: { value: "2022-01-01" } });
        wrapper.update();
    });
});

describe("onSubmit", () => {
    const wrapper = shallow(
        <NewAppointmentForm
            appointmentList={testAppointmentList}
            userId={testDoctorUserId}
            patientList={testPatientList}
        />
    );
    const select = wrapper.find(Select);
    it("Should call scheduleAppointment()", () => {
        wrapper.find(Button).simulate("click");
        select.at(1).simulate("change", { target: { value: "09:00 - 09:30" } });
        wrapper.update();
        wrapper.find(Button).simulate("click");
    });
});
