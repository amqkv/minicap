import { shallow, render } from "enzyme";
import StandardInput from "@frontend/components/inputs/standard-input";
import PasswordInput from "@frontend/components/inputs/password-input";
import DateInput from "@frontend/components/inputs/date-input";
import DropdownInput from "@frontend/components/inputs/dropdown-input";
import { Button, Input, Select, InputRightElement, Textarea } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { USER_ROLES_SIGN_IN } from "@frontend/utils/constants";
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input";
import UnitInput from "@frontend/components/inputs/unit-input";

const baseProps = {
    name: "Dummy name",
    label: "Dummy label",
};

describe("test the inputs in register <StandardInput/>", () => {
    it("renders the standard input field", () => {
        const wrapper = render(<StandardInput {...baseProps} />);
        expect(wrapper.find("input")).toHaveLength(1);
    });

    it("render the error message when the error prop is passed", () => {
        const wrapper = shallow(<StandardInput {...baseProps} error />);
        expect(wrapper.find(WarningIcon)).toHaveLength(1);
    });
});

describe("test the inputs in register <PasswordInput/>", () => {
    it("renders the password input field", () => {
        const wrapper = shallow(<PasswordInput {...baseProps} />);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).text()).toBe("Show");
    });

    it("renders the password input field with an error when the error prop is passed and name is not password", () => {
        const wrapper = shallow(<PasswordInput {...baseProps} error />);
        expect(wrapper.find(WarningIcon)).toHaveLength(1);
    });

    it("renders the password input field with an error when the error prop is passed and name is password", () => {
        const wrapper = shallow(<PasswordInput {...baseProps} name="Password" error />);
        expect(wrapper.find(WarningIcon)).toHaveLength(1);
        expect(wrapper.find(InputRightElement)).toHaveLength(1);
    });

    it("render the error message when the error prop is passed", () => {
        const wrapper = render(<PasswordInput {...baseProps} />);
        expect(wrapper.find("input")).toHaveLength(1);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("renders the password input field hide passsword button", () => {
        const wrapper = shallow(<PasswordInput {...baseProps} />);
        expect(wrapper.find(Button).text()).toBe("Show");
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Button).text()).toBe("Hide");
    });
});

describe("test the inputs in register <DateInput/>", () => {
    it("renders the date input field", async () => {
        const wrapper = render(<DateInput />);
        expect(wrapper.find("input")).toHaveLength(1);
    });
});

describe("test the inputs in register <DropdownInput/>", () => {
    it("renders the dropdown input field", async () => {
        const wrapper = shallow(<DropdownInput {...baseProps} />);
        expect(wrapper.find(Select)).toHaveLength(1);
        expect(wrapper.find("option")).toHaveLength(0);
    });

    it("renders the dropdown input field with options when options are passed", async () => {
        const wrapper = shallow(<DropdownInput {...baseProps} options={USER_ROLES_SIGN_IN} />);
        expect(wrapper.find(Select)).toHaveLength(1);
        expect(wrapper.find("option")).toHaveLength(4);
    });
});

describe("test the inputs in forms to fill <PatientTextarea/>", () => {
    it("renders the textarea input field", async () => {
        const wrapper = shallow(<PatientTextarea {...baseProps} />);
        expect(wrapper.find(Textarea)).toHaveLength(1);
    });
});

describe("test the inputs in forms to fill <UnitInput/>", () => {
    it("renders the input field", async () => {
        const wrapper = shallow(<UnitInput {...baseProps} units={"lbs"} />);
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("renders the warning icon on the input field when there is an error", async () => {
        const wrapper = shallow(<UnitInput {...baseProps} units={"lbs"} error />);
        expect(wrapper.find(Input)).toHaveLength(1);
    });
});
