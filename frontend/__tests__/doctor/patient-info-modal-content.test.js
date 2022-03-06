import { shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-details-to-provide-form";
import PatientStatus from "@frontend/components/doctor/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Text, Divider, Heading, Flex, Button } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        });
});

afterAll(() => {
    global.fetch = unmockedFetch;
});

describe("<PatientInfoModal/>", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                AccountId: 109,
            },
        },
    });
    const wrapper = shallow(<PatientInfoModalContent patient={DEFAULT_PATIENT} />);

    // Default patient but with a value of true for isPrioritized
    let prioritizedPatient = DEFAULT_PATIENT;
    prioritizedPatient.isPrioritized = true;

    it("Renders all Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(11);
    });
    it("Renders all Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(4);
    });
    it("Renders all Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all Heading components", () => {
        expect(wrapper.find(Heading)).toHaveLength(2);
    });
    it("Renders all PatientStatus components", () => {
        expect(wrapper.find(PatientStatus)).toHaveLength(1);
    });
    it("Renders all the Button components", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it("Renders all PatientDetailsToProvideForm  components", () => {
        expect(wrapper.find(PatientDetailsToProvideForm)).toHaveLength(1);
    });
    it("Renders all Divider components", () => {
        expect(wrapper.find(Divider)).toHaveLength(2);
    });
    it("Renders the last Heading containing the lastUpdated value with 0 decimals if it's > 1", () => {
        const patient = { ...DEFAULT_PATIENT };
        patient.status[0].lastUpdated = 10;
        let w = shallow(<PatientInfoModalContent patient={patient} />);
        expect(w.find(Heading)).toHaveLength(2);
    });
    it("Verifies that no priority icon is rendered if patient is not flagged", () => {
        expect(wrapper.find(WarningTwoIcon)).toHaveLength(0);
    });
    it("Renders high priority icon if patient is flagged", () => {
        let w = shallow(<PatientInfoModalContent patient={prioritizedPatient} />);
        expect(w.find(WarningTwoIcon)).toHaveLength(1);
    });
    it("Calls modify priority button when priority flag is off", async () => {
        const component = shallow(<PatientInfoModalContent patient={DEFAULT_PATIENT} />);
        await component.find(Button).at(0).simulate("click");
    });
    it("Calls modify priority button when priority flag is on", async () => {
        const component = shallow(<PatientInfoModalContent patient={prioritizedPatient} />);
        await component.find(Button).at(0).simulate("click");
    });
});
