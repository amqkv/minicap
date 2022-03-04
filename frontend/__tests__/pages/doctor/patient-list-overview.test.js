import { mount, shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientListOverview from "@frontend/pages/doctor/patient-list-overview";
import PatientInfoModal from "@frontend/components/modal/modal";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import React from "react";

jest.mock("next-auth/react");

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
        expect(component.find(Box)).toHaveLength(3);
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
        component.find(Box).at(1).simulate("click");
    });
});
