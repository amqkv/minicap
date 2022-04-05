import PatientInfoModalSwiper from "@frontend/components/health-official/patient-status-swiper";
import PatientStatus from "@frontend/components/health-official/patient-status";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { shallow } from "enzyme";
import { Text } from "@chakra-ui/react";

describe("<PatientInfoModalSwiper/>", () => {
    it("renders swiper with content", () => {
        //GIVEN
        const patient = DEFAULT_PATIENT;
        //WHEN
        const wrapper = shallow(<PatientInfoModalSwiper patient={patient} />);

        //THEN
        expect(wrapper.find(PatientStatus)).toHaveLength(1);
    });
    it("renders message if no statuses", () => {
        //GIVEN
        const patient = DEFAULT_PATIENT;
        patient.status = [];
        //WHEN
        const wrapper = shallow(<PatientInfoModalSwiper patient={patient} />);

        //THEN
        expect(wrapper.find(Text)).toHaveLength(1);
    });
});
