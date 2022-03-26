import { shallow } from "enzyme";
import PatientChartsOverview from "@frontend/components/health-official/patient-charts-overview";
import PieChart from "@frontend/components/pie-chart";
import ScatterChart from "@frontend/components/scatter-chart";

import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Box, Center, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
describe("<PatientChartsOverview/>", () => {
    const wrapper = shallow(<PatientChartsOverview patientList={patientList} />);

    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(3);
    });
    it("Renders all the Tab components", () => {
        expect(wrapper.find(Tab)).toHaveLength(4);
    });
    it("Renders all the SimpleGrid components", () => {
        expect(wrapper.find(SimpleGrid)).toHaveLength(1);
    });
    it("Renders all the Tabs components", () => {
        expect(wrapper.find(Tabs)).toHaveLength(2);
    });
    it("Renders all the Center components", () => {
        expect(wrapper.find(Center)).toHaveLength(4);
    });
    it("Renders all the TabList components", () => {
        expect(wrapper.find(TabList)).toHaveLength(2);
    });
    it("Renders all the TabPanels components", () => {
        expect(wrapper.find(TabPanels)).toHaveLength(2);
    });
    it("Renders all the TabPanel components", () => {
        expect(wrapper.find(TabPanel)).toHaveLength(4);
    });
    it("Renders all the PieChart components", () => {
        expect(wrapper.find(PieChart)).toHaveLength(2);
    });
    it("Renders all the ScatterChart components", () => {
        expect(wrapper.find(ScatterChart)).toHaveLength(2);
    });
});

describe("pickDate", () => {
    const wrapper = shallow(<PatientChartsOverview patientList={patientList} />);

    it("Date picker for pie chart calls pickDate on change", () => {
        const mockDate = "2022-03-03";
        const input = wrapper.find("input").at(0);
        input.simulate("change", { target: { value: mockDate } });
        expect(wrapper.find("input")).toHaveLength(2);
    });
    it("Date picker for scatter chart calls pickDate on change", () => {
        const mockDate = "2022-03-03";
        const input = wrapper.find("input").at(1);
        input.simulate("change", { target: { value: mockDate } });
        expect(wrapper.find("input")).toHaveLength(2);
    });
});
