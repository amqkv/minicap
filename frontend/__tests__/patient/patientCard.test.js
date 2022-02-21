import { shallow } from "enzyme";
import PatientCard from "@frontend/components/forms/patient-card";
import { Divider, Heading, Text } from "@chakra-ui/react";

describe("<PatientCard />", () => {
    it("renders a <PatientCard /> component", () => {
        const wrapper = shallow(<PatientCard />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Divider)).toHaveLength(1);
        expect(wrapper.find(Text)).toHaveLength(3);
    });
});
