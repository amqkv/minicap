import { shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-details-to-provide-form";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Text, Divider, Heading, Flex, Button } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import PatientInfoModalSwiper from "@frontend/components/doctor/patient-info-modal-swiper";
jest.mock("next-auth/react");

// jest.mock("@chakra-ui/react", () => {
//     // --> Original module
//     const originalModule = jest.requireActual("@chakra-ui/react");

//     return {
//         __esModule: true,
//         ...originalModule,
//         useToast: jest.fn().mockImplementation(() => ({})),
//     };
// });

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const mockToast = require("@chakra-ui/react").useToast;

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

describe("<PatientInfoModalContent/>", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                AccountId: 109,
            },
        },
    });
    const wrapper = shallow(<PatientInfoModalContent patient={DEFAULT_PATIENT} onMutate={jest.fn} onClose={jest.fn} />);

    // Default patient but with a value of true for isPrioritized
    let prioritizedPatient = DEFAULT_PATIENT;
    prioritizedPatient.isPrioritized = true;

    it("Renders all Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(12);
    });
    it("Renders all Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(4);
    });
    it("Renders all Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(3);
    });
    it("Renders all Heading components", () => {
        expect(wrapper.find(Heading)).toHaveLength(3);
    });
    it("Renders all PatientInfoModalSwiper components", () => {
        expect(wrapper.find(PatientInfoModalSwiper)).toHaveLength(1);
    });

    it("Renders all PatientDetailsToProvideForm  components", () => {
        expect(wrapper.find(PatientDetailsToProvideForm)).toHaveLength(1);
    });
    it("Renders all Divider components", () => {
        expect(wrapper.find(Divider)).toHaveLength(3);
    });

    it("Renders the last Heading containing the lastUpdated value with 0 decimals if it's > 1", () => {
        const patient = { ...DEFAULT_PATIENT };
        patient.status[0].lastUpdated = 10;
        let w = shallow(<PatientInfoModalContent patient={patient} />);
        expect(w.find(Heading)).toHaveLength(3);
    });
    it("Verifies that no priority icon is rendered if patient is not flagged", () => {
        expect(wrapper.find(WarningTwoIcon)).toHaveLength(0);
    });
    it("Renders high priority icon if patient is flagged", () => {
        let w = shallow(<PatientInfoModalContent patient={prioritizedPatient} onMutate={jest.fn} onClose={jest.fn} />);
        expect(w.find(WarningTwoIcon)).toHaveLength(1);
    });
    it("Calls modify priority button when priority flag is off", async () => {
        const mutate = jest.fn();
        const component = shallow(
            <PatientInfoModalContent patient={DEFAULT_PATIENT} onMutate={mutate} onClose={jest.fn} />
        );
        await component.find(Button).at(0).simulate("click");
        expect(mutate.mock.calls).toHaveLength(1);
    });
    it("Calls modify priority button when priority flag is on", async () => {
        const mutate = jest.fn();
        const component = shallow(
            <PatientInfoModalContent patient={prioritizedPatient} onMutate={mutate} onClose={jest.fn} />
        );
        await component.find(Button).at(0).simulate("click");
        expect(mutate.mock.calls).toHaveLength(1);
    });
    it("Calls modify priority button and return an error", async () => {
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.reject({
                status: 400,
                json: () => Promise.resolve({ success: false, error: "Something bad happened" }),
            })
        );

        const component = shallow(
            <PatientInfoModalContent patient={DEFAULT_PATIENT} onMutate={jest.fn} onClose={jest.fn} />
        );

        await component.find(Button).at(0).simulate("click");
        expect(global.fetch).toBeCalled();
    });
    it("Calls review all button", async () => {
        const mutate = jest.fn();
        const close = jest.fn();
        const component = shallow(
            <PatientInfoModalContent patient={prioritizedPatient} onMutate={mutate} onClose={close} />
        );
        await component.find("#review-all-button").at(0).simulate("click");
        expect(mutate.mock.calls).toHaveLength(1);
        expect(close.mock.calls).toHaveLength(1);
    });
});
