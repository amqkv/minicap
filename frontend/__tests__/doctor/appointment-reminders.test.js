import { shallow } from "enzyme";
import AppointmentReminders from "@frontend/components/doctor/appointment-reminders";
import { Box, Text, Flex, Center } from "@chakra-ui/react";
import { APPOINTMENT_STATUS, SECTION } from "@frontend/models/appointment";
import { Scrollbars } from "react-custom-scrollbars-2";
import moment from "moment";

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
        status: APPOINTMENT_STATUS.CONFIRMED,
    };
    const MOCK_APPOINTMENT_TOMORROW = {
        ...MOCK_APPOINTMENT,
        date: moment().add(1, "days").format("YYYY-MM-DD"),
        status: APPOINTMENT_STATUS.DECLINED,
    };
    const MOCK_APPOINTMENT_YESTERDAY = {
        ...MOCK_APPOINTMENT,
        date: moment().add(-1, "days").format("YYYY-MM-DD"),
        status: APPOINTMENT_STATUS.PENDING,
    };
    const MOCK_APPOINTMENT_TODAY = {
        ...MOCK_APPOINTMENT,
        date: moment().format("YYYY-MM-DD"),
    };
    const testAppointmentList = [
        MOCK_APPOINTMENT,
        MOCK_APPOINTMENT_TODAY,
        MOCK_APPOINTMENT_TOMORROW,
        MOCK_APPOINTMENT_YESTERDAY,
    ];
    const testDimensions = ["100px", "100px", "100px", "100px"];
    let wrapper = shallow(
        <AppointmentReminders
            appointmentList={testAppointmentList}
            section={SECTION.UPCOMING}
            dimensions={testDimensions}
        />
    );
    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(5);
    });
    it("Renders all the Scrollbars components", () => {
        expect(wrapper.find(Scrollbars)).toHaveLength(1);
    });
    it("Renders all the Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(12);
    });
    it("Renders all the Flex components", () => {
        wrapper = shallow(
            <AppointmentReminders
                appointmentList={testAppointmentList}
                section={SECTION.PAST}
                dimensions={testDimensions}
            />
        );
        expect(wrapper.find(Flex)).toHaveLength(8);
    });
    it("Renders all the Center components (when appointment list is empty)", () => {
        wrapper = shallow(
            <AppointmentReminders appointmentList={[]} section={SECTION.PAST} dimensions={testDimensions} />
        );
        expect(wrapper.find(Center)).toHaveLength(1);
    });
});
