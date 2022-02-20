import { shallow } from "enzyme";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import PatientStatus from "@frontend/components/doctor/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";

describe("<PatientStatus/>", () => {
    it("Renders all the Box components", () => {
        const wrapper = shallow(<PatientStatus patient={DEFAULT_PATIENT} />);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Renders all the Text components", () => {
        let patient = { ...DEFAULT_PATIENT };
        patient.requiredDetails.weight = true;
        const wrapper = shallow(<PatientStatus patient={patient} />);
        expect(wrapper.find(Text)).toHaveLength(1);
    });
});
