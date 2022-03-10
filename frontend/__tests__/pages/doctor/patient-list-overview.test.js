import { mount, shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientListOverview from "@frontend/pages/doctor/patient-list-overview";
import PatientInfoModal from "@frontend/components/modal/modal";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, SimpleGrid, Heading, RadioGroup, Text, Center, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import React from "react";
import PatientInfoModalSwiper from "@frontend/components/doctor/patient-info-modal-swiper";

jest.mock("next-auth/react");

jest.mock("@frontend/components/doctor/patient-info-modal-swiper", () => {
    return {
        __esModule: true,
        default: () => {
            return <div></div>;
        },
    };
});
const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
global.window = { location: { pathname: "/" } };
describe("Rendering <PatientListOverview/> if user is a doctor", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                Role: USER_ROLES.doctor,
            },
        },
    });
    const component = shallow(<PatientListOverview patientList={patientList} />);
    it("Renders all the Box components", () => {
        expect(component.find(Box)).toHaveLength(5);
    });
    it("Renders all the Text components", () => {
        expect(component.find(Text)).toHaveLength(1);
    });
    it("Renders all the Heading components", () => {
        expect(component.find(Heading)).toHaveLength(1);
    });
    it("Renders all the SimpleGrid components", () => {
        expect(component.find(SimpleGrid)).toHaveLength(1);
    });
    it("Renders all the PatientInfoCard components", () => {
        expect(component.find(PatientInfoCard)).toHaveLength(2);
    });
    it("Renders all the PatientInfoModal components", () => {
        expect(component.find(PatientInfoModal)).toHaveLength(1);
    });
    it("Renders all the PatientInfoModalContent components", () => {
        expect(component.find(PatientInfoModalContent)).toHaveLength(1);
    });
    it("Calls handleClick when a patient card is clicked", () => {
        component.find(Box).at(0).simulate("click");
        expect(component.find(Box)).toHaveLength(5);
    });
});

describe("Box onClick", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                Role: USER_ROLES.doctor,
            },
        },
    });
    const component = shallow(<PatientListOverview patientList={patientList} />);
    it("Calls onOpen", () => {
        component.find(Box).at(4).simulate("click");
    });
});

describe("Filtering", () => {
    const wrapper = shallow(<PatientListOverview patientList={patientList} />);
    it("Filters the patients onClick", () => {
        wrapper.find(RadioGroup).simulate("change", { target: { value: "flag" } });
        expect(wrapper.find(Text)).toHaveLength(2);
        expect(wrapper.find(Center)).toHaveLength(1);
    });
});
