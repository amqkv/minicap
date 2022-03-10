import { shallow } from "enzyme";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-details-to-provide-form";
import PatientStatus from "@frontend/components/doctor/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Text, Divider, Heading, Flex } from "@chakra-ui/react";
import PatientInfoModalSwiper from "@frontend/components/doctor/patient-info-modal-swiper";

jest.mock("@frontend/components/doctor/patient-info-modal-swiper", () => {
    return {
        __esModule: true,
        default: () => {
            return <div></div>;
        },
    };
});

describe("<PatientInfoModal/>", () => {
    const wrapper = shallow(<PatientInfoModalContent patient={DEFAULT_PATIENT} />);
    it("Renders all Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(11);
    });
    it("Renders all Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(4);
    });
    it("Renders all Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all Heading components", () => {
        expect(wrapper.find(Heading)).toHaveLength(2);
    });
    it("Renders all PatientStatus components", () => {
        expect(wrapper.find(PatientStatus)).toHaveLength(1);
    });
    it("Renders all PatientDetailsToProvideForm  components", () => {
        expect(wrapper.find(PatientDetailsToProvideForm)).toHaveLength(1);
    });
    it("Renders all Divider components", () => {
        expect(wrapper.find(Divider)).toHaveLength(2);
    });
    it("Renders the last Heading containing the lastUpdated value with 0 decimals if it's > 1", () => {
        const patient = { ...DEFAULT_PATIENT };
        patient.status[0].lastUpdated = 10;
        let w = shallow(<PatientInfoModalContent patient={patient} />);
        expect(w.find(Heading)).toHaveLength(2);
    });
});
