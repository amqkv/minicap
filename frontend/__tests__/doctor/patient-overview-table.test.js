import { shallow } from "enzyme";
import PatientOverviewTable from "@frontend/components/doctor/patient-overview-table";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DEFAULT_PATIENT } from "@frontend/models/patient";

const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];

describe("<PatientOverviewTable/>", () => {
    const wrapper = shallow(<PatientOverviewTable patientList={patientList} />);

    it("Renders all the Table components", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });
    it("Renders all the Thead components", () => {
        expect(wrapper.find(Thead)).toHaveLength(1);
    });
    it("Renders all the Tbody components", () => {
        expect(wrapper.find(Tbody)).toHaveLength(1);
    });
    it("Renders all the Tr components", () => {
        expect(wrapper.find(Tr)).toHaveLength(6);
    });
    it("Renders all the Th components", () => {
        expect(wrapper.find(Th)).toHaveLength(2);
    });
    it("Renders all the Td components", () => {
        expect(wrapper.find(Td)).toHaveLength(10);
    });
});
