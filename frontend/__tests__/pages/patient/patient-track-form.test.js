import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";
import { Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, CloseButton, Box } from "@chakra-ui/react";
import PositivePatientsTrackerForm from "@frontend/pages/patient/patient-track-form";
import { shallow } from "enzyme";
import TrackContacts from "@frontend/functions/track-contacts";
import { trackPersonSuccess, trackPersonFailure } from "@frontend/utils/popups";

jest.mock("next-auth/react");
jest.mock("@frontend/functions/track-contacts");

// toast
// jest.mock("@chakra-ui/react", () => {
//     // --> Original module
//     const originalModule = jest.requireActual("@chakra-ui/react");

//     const fakeToast = { toast: jest.fn() };

//     return {
//         __esModule: true,
//         ...originalModule,
//         useToast: jest.fn().mockImplementation(() => {
//             return fakeToast;
//         }),
//     };
// });

describe("patient tracking form page", () => {
    it("doesn't allow access if the user isn't a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        const wrapper = shallow(<PositivePatientsTrackerForm hasCovid={true} />);

        expect(wrapper.find("p")).toHaveLength(1);
    });

    it("renders properly if the user is a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<PositivePatientsTrackerForm hasCovid={true} />);
        expect(wrapper.find(Accordion)).toHaveLength(1);
        expect(wrapper.find(AccordionItem)).toHaveLength(1);
        expect(wrapper.find(AccordionButton)).toHaveLength(1);
        expect(wrapper.find(AccordionPanel)).toHaveLength(1);
        expect(wrapper.find(TrackPatientForm)).toHaveLength(1);
        expect(wrapper.find(CloseButton)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
    it("renders properly if the user is a patient and clicks on the add user button", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        // wrapper - enzyme
        const wrapper = shallow(<PositivePatientsTrackerForm hasCovid={true} />);
        wrapper.find(Button).at(0).simulate("click");
        wrapper.update();
        expect(wrapper.find(Accordion)).toHaveLength(1);
        expect(wrapper.find(AccordionItem)).toHaveLength(2);
        expect(wrapper.find(AccordionButton)).toHaveLength(2);
        expect(wrapper.find(AccordionPanel)).toHaveLength(2);
        expect(wrapper.find(TrackPatientForm)).toHaveLength(2);
        expect(wrapper.find(CloseButton)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
    it("renders properly if the user is a patient and clicks on the X button to remove a user", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        // wrapper - enzyme
        const wrapper = shallow(<PositivePatientsTrackerForm hasCovid={true} />);
        wrapper.find(CloseButton).at(0).simulate("click");
        wrapper.update();
        expect(wrapper.find(Accordion)).toHaveLength(1);
        expect(wrapper.find(AccordionItem)).toHaveLength(0);
        expect(wrapper.find(AccordionButton)).toHaveLength(0);
        expect(wrapper.find(AccordionPanel)).toHaveLength(0);
        expect(wrapper.find(TrackPatientForm)).toHaveLength(0);
        expect(wrapper.find(CloseButton)).toHaveLength(0);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
    //TODO
    it("tests the submit button with valid information", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const mockEvent = {
            target: {
                name: { firstName, lastName },
                value: { firstName: "valueIpass", lastName: "value2" },
                firstName: "Testing",
                lastName: "Patient",
                email: "testingemail123@gmail.com",
                phoneNumber: "514-111-1111",
                dateOfContact: "2022/04/05",
            },
        };

        const setStateMock = jest.fn();
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation(init => [init, setStateMock]);

        TrackContacts.mockReturnValue(true);

        // wrapper - enzyme
        const wrapper = shallow(<PositivePatientsTrackerForm hasCovid={true} />);

        // check if the data is registered in input -> handleChange
        // wrapper.find(Button).at(1).simulate("change", mockEvent);
        // wrapper.update();
        // console.log(wrapper.find(TrackPatientForm).values);
        wrapper.find(TrackPatientForm).simulate("change", 0, mockEvent);
        wrapper.update();
        wrapper.find(Button).at(1).simulate("click", mockEvent);
        wrapper.update();
        wrapper.find(Button).at(1).simulate("click", mockEvent);
        wrapper.update();
        // console.log(wrapper.debug());
        // console.log(wrapper.find(TrackPatientForm).values);
        // check if hook is called -> backend
        expect(TrackContacts).toBeCalled(); // might have to come back and test for failure

        // check if submit clears the data after its done -> onSubmit
        expect(React.useState).toBeCalled();
    });
});
