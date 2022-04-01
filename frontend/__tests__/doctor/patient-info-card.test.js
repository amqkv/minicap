import { shallow } from "enzyme";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import PatientStatus from "@frontend/components/doctor/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

describe("<PatientInfoCard/>", () => {
    const wrapper = shallow(<PatientInfoCard patient={DEFAULT_PATIENT} />);

    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(6);
    });
    it("Renders all the Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all the Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(5);
    });
    it("Renders all the Divider components", () => {
        expect(wrapper.find(Divider)).toHaveLength(1);
    });
    it("Renders all the PatientStatus components", () => {
        expect(wrapper.find(PatientStatus)).toHaveLength(1);
    });
    it("Verifies that no priority icon is rendered if patient is not flagged", () => {
        expect(wrapper.find(WarningTwoIcon)).toHaveLength(0);
    });
    it("Renders high priority icon if patient is flagged", () => {
        let prioritizedPatient = DEFAULT_PATIENT;
        prioritizedPatient.isPrioritized = true;
        let w = shallow(<PatientInfoCard patient={prioritizedPatient} />);
        expect(w.find(WarningTwoIcon)).toHaveLength(1);
    });
    it("Renders the box borderColor gray if patient status hasn't been reviewed yet", () => {
        const patient = { ...DEFAULT_PATIENT };
        patient.isAllReviewed = true;
        const notReviewedWrapper = shallow(<PatientInfoCard patient={patient} />);
        expect(notReviewedWrapper.find(Box).get(0).props).toHaveProperty("borderColor", "gray.200");
    });
    it("Renders the last Text containing the lastUpdated value with 0 decimals if it's > 1", () => {
        const patient = { ...DEFAULT_PATIENT };
        patient.status[0].lastUpdated = 10;
        const w = shallow(<PatientInfoCard patient={patient} />);
        expect(w.find(Text)).toHaveLength(5);
    });
});
