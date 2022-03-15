import { shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientListOverview from "@frontend/pages/doctor/patient-list-overview";
import PatientInfoModal from "@frontend/components/modal/modal";
import { DEFAULT_PATIENT, FILTER_OPTIONS } from "@frontend/models/patient";
import { Box, SimpleGrid, Heading, RadioGroup, Text, Center, Input, Radio } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import React from "react";
import useSWR from "swr";

jest.mock("next-auth/react");

jest.mock("swr");

const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
global.window = { location: { pathname: "/" } };
describe("Rendering <DoctorDashboard/> if user is a doctor", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                Role: USER_ROLES.doctor,
            },
        },
    });

    useSWR.mockReturnValue({
        data: patientList,
        error: false,
        mutate: () => void 0,
    });

    const component = shallow(<PatientListOverview />);
    it("Renders all the Box components", () => {
        expect(component.find(Box)).toHaveLength(4);
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
    it("Renders all the PatientInfoModal components", () => {
        expect(component.find(PatientInfoModal)).toHaveLength(1);
    });
    it("Renders all the PatientInfoModalContent components", () => {
        expect(component.find(PatientInfoModalContent)).toHaveLength(1);
    });
});

describe("onChange functions", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                Role: USER_ROLES.doctor,
            },
        },
    });
    const component = shallow(<PatientListOverview patientList={patientList} />);
    it("onChange -> filterPatient + onSearch", () => {
        const mockEvent = {
            preventDefault: () => {},
            target: { value: "test" },
        };
        let radiogroup = component.find(RadioGroup);
        const tags = [
            FILTER_OPTIONS.TEMPERATURE,
            FILTER_OPTIONS.FLAG,
            FILTER_OPTIONS.NONE,
            FILTER_OPTIONS.REVIEWED,
            FILTER_OPTIONS.UNREVIEWED,
        ];
        tags.forEach(tag => {
            radiogroup.simulate("change", tag);
            component.update();
            component.find(Input).simulate("change", mockEvent);
            // @todo investigate function result expect statements
            // Where can the result of the filter be found? Can it be tested somehow?
        });
    });
});
