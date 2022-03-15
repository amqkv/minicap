import { shallow } from "enzyme";
import { Button, Heading, Box } from "@chakra-ui/react";
import PatientFormsToFill from "@frontend/components/forms/patient-form-to-fill";
import { DEFAULT_REQUIRED_DETAILS, DEFAULT_PAST_CONDITIONS } from "../__mock__/mock";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

jest.mock("next-auth/react");

describe("test patient's form", () => {
    beforeEach(() => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
					AccountId: 0
                },
            },
        });
    });

    it("renders a <PatientFormsToFill /> component", () => {
        const wrapper = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        expect(wrapper.find(Heading)).toHaveLength(4);
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("activates the onSubmit with Errors in form", () => {
        const mockEvent = {
            preventDefault: () => {},
            target: [{ value: "temperature" }, { value: "weight" }, { value: "symptoms" }],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        //component.setProps();
        component.find("form").simulate("submit", mockEvent);
        component.update();
    });
	it("activates the onSubmit with fields incomplete in form", () => {
        const mockEvent = {
            preventDefault: () => {},
            target: [{ value: 3 }, { value: 3 }, { value: ""}],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        //component.setProps();
        component.find("form").simulate("submit", mockEvent);
        component.update();
    });
	it("activates the onSubmit with no errors in form", () => {
        const mockEvent = {
            preventDefault: () => {},
            target: [{ value: 3 }, { value: 3 }, { value: "symptoms" }],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        //component.setProps();
        component.find("form").simulate("submit", mockEvent);
        component.update();
    });
});
