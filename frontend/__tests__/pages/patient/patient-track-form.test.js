import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";
import { Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, CloseButton } from "@chakra-ui/react";
import PositivePatientsTrackerForm from "@frontend/pages/patient/patient-track-form";
import { shallow } from "enzyme";

jest.mock("next-auth/react");

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
});
