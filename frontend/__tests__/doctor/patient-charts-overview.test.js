import { shallow } from "enzyme";
import PatientChartsOverview from "@frontend/components/doctor/patient-charts-overview";
import PieChart from "@frontend/components/pie-chart";
import ScatterChart from "@frontend/components/scatter-chart";

import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
describe("<PatientInfoCard/>", () => {
    const wrapper = shallow(<PatientChartsOverview patientList={patientList} />);

    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(3);
    });
    it("Renders all the Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all the Tab components", () => {
        expect(wrapper.find(Tab)).toHaveLength(6);
    });
    it("Renders all the Tabs components", () => {
        expect(wrapper.find(Tabs)).toHaveLength(2);
    });
    it("Renders all the Center components", () => {
        expect(wrapper.find(Center)).toHaveLength(2);
    });
    it("Renders all the TabList components", () => {
        expect(wrapper.find(TabList)).toHaveLength(2);
    });
    it("Renders all the TabPanels components", () => {
        expect(wrapper.find(TabPanels)).toHaveLength(2);
    });
    it("Renders all the TabPanel components", () => {
        expect(wrapper.find(TabPanel)).toHaveLength(6);
    });
    it("Renders all the PieChart components", () => {
        expect(wrapper.find(PieChart)).toHaveLength(3);
    });
    it("Renders all the ScatterChart components", () => {
        expect(wrapper.find(ScatterChart)).toHaveLength(3);
    });
});
