import { shallow } from "enzyme";
import PatientStatus from "@frontend/components/doctor/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Text } from "@chakra-ui/react";

describe("<PatientStatus/>", () => {
    it("Renders all the Box components", () => {
        const wrapper = shallow(<PatientStatus patient={DEFAULT_PATIENT} statusIndex={0} />);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Renders all the Text components", () => {
        let patient = { ...DEFAULT_PATIENT };
        patient.requiredDetails.weight = true;
        patient.status[0].weight.value = 0;
        const wrapper = shallow(<PatientStatus patient={patient} statusIndex={0} />);
        expect(wrapper.find(Text)).toHaveLength(1);
    });
});
