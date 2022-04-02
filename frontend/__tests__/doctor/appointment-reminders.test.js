import { shallow } from "enzyme";
import AppointmentReminders from "@frontend/components/doctor/appointment-reminders";
import { Box, Text, Flex, Center } from "@chakra-ui/react";
import {
    MOCK_APPOINTMENT,
    MOCK_APPOINTMENT_TODAY,
    MOCK_APPOINTMENT_TOMORROW,
    MOCK_APPOINTMENT_YESTERDAY,
    SECTION,
} from "@frontend/models/appointment";
import { Scrollbars } from "react-custom-scrollbars-2";

describe("<AppointmentReminders/>", () => {
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
