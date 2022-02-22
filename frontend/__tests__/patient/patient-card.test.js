import { shallow } from "enzyme";
import PatientCard from "@frontend/components/forms/patient-card";
import { Divider, Heading, Box, Text } from "@chakra-ui/react";
import { DEFAULT_CARD_PATIENT } from "../__mock__/mock";

describe("<PatientCard />", () => {
    it("renders a <PatientCard /> component", () => {
        const wrapper = shallow(<PatientCard label={"2022"} temperature={2} weight={3} symptoms={"help"} />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Divider)).toHaveLength(1);
        expect(wrapper.find(Text)).toHaveLength(3);

        expect(wrapper.find(Text).at(0).text()).toBe("Temperature: 2 °C");
        expect(wrapper.find(Text).at(1).text()).toBe("Weight: 3 lbs");
        expect(wrapper.find(Text).at(2).text()).toBe("Symptoms: help");
    });

});
