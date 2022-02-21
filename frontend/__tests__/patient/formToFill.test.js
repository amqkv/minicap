import { shallow } from "enzyme";
import { Button, Heading } from "@chakra-ui/react";
import PatientFormsToFill from "@frontend/components/forms/patient-form-to-fill";

describe("test patient's form", () => {
    it("renders a <PatientFormsToFill /> component", () => {
        const wrapper = shallow(<PatientFormsToFill />);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Heading)).toHaveLength(3);

    });
});
