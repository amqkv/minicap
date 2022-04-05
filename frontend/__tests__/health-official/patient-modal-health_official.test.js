import { shallow } from "enzyme";
import PatientInformationModalBody from "@frontend/components/health-official/patient-modal-health_official";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import { Image, Heading, Text, Box } from "@chakra-ui/react";

describe("<PatientInformationModalBody/>", () => {
    it("renders a <PatientInformationModalBody /> component", () => {
        const patient = IMMIGRATION_OFFICER_MOCK_PATIENTS[0];
        patient.status = [
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        const wrapper = shallow(<PatientInformationModalBody patient={patient} />);

        expect(wrapper.find(Heading).at(0).text()).toBe("Bing Bong Big");
        expect(wrapper.find(Text).at(0).text()).toBe("Gender: bing bong");
        expect(wrapper.find(Text).at(1).text()).toBe("Date of birth: 2000-08-28");
        expect(wrapper.find(Heading).at(1).text()).toBe("More Information:");
        expect(wrapper.find(Text).at(2).text()).toBe("Address: BIGBONG , bongbong h1h1h1");
        expect(wrapper.find(Text).at(3).text()).toBe("Email: boiboibib@gamil.com");
        expect(wrapper.find(Text).at(4).text()).toBe("Telephone: 41414141414");
        expect(wrapper.find(Heading)).toHaveLength(2);
        expect(wrapper.find(Box)).toHaveLength(4);
        expect(wrapper.find(Text)).toHaveLength(5);
        expect(wrapper.find(Image)).toHaveLength(1);
    });
});
