import { shallow } from "enzyme";
import { Button, Heading } from "@chakra-ui/react";
import PatientFormsToFill from "@frontend/components/forms/patient-form-to-fill";
import { DEFAULT_REQUIRED_DETAILS, DEFAULT_PAST_CONDITIONS } from "../__mock__/mock";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

jest.mock("next-auth/react");
const mockPreventDefault = jest.fn();

describe("test patient's form", () => {
    beforeEach(() => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                    AccountId: 0,
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
            preventDefault: mockPreventDefault,
            target: [{ value: "temperature" }, { value: "weight" }, { value: "symptoms" }],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with fields incomplete in form", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }, { value: 3 }, { value: "" }],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }, { value: 3 }, { value: "symptoms" }],
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });

    it("activates the onSubmit with no errors in form, temp+weight", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }, { value: 3 }],
        };
        const REQUIRED_DETAILS = {
            Weight: true,
            Temperature: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form, temp+symptoms", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }, { value: "symptoms" }],
        };
        const REQUIRED_DETAILS = {
            Temperature: true,
            Symptoms: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form, weight+symptoms", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }, { value: "symptoms" }],
        };
        const REQUIRED_DETAILS = {
            Weight: true,
            Symptoms: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form, only temperature", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }],
        };
        const REQUIRED_DETAILS = {
            Temperature: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form, only weight", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: 3 }],
        };
        const REQUIRED_DETAILS = {
            Weight: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
    it("activates the onSubmit with no errors in form, only symptoms", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: "symptoms" }],
        };
        const REQUIRED_DETAILS = {
            Symptoms: true,
        };
        const component = shallow(
            <PatientFormsToFill requiredDetails={REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
});
