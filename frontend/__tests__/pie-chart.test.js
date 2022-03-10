import { shallow } from "enzyme";
import Chart from "@frontend/components/pie-chart";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Box, Center, Text } from "@chakra-ui/react";
import { DAY } from "@frontend/utils/constants";
import { extractStatuses } from "@frontend/functions/data-transform-chart";
import { DEFAULT_PATIENT } from "@frontend/models/patient";

// const patientList = [
//     { ...DEFAULT_PATIENT, status: { ...DEFAULT_PATIENT.status[0], symptoms: { value: "cough", unit: "" } } },
// ];
const patientList = [DEFAULT_PATIENT];

describe("<PieChart/>", () => {
    const wrapper = shallow(
        <Chart statuses={extractStatuses(patientList)} title="Test" h={250} w={450} day={DAY.ALL} />
    );

    it("Renders all the Box components (if data is not null)", () => {
        expect(wrapper.find(Box)).toHaveLength(2);
    });
    it("Renders all the Center components (if data is not null)", () => {
        expect(wrapper.find(Center)).toHaveLength(2);
    });
    it("Renders all the Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(1);
    });

    it("Renders all the PieChart components", () => {
        expect(wrapper.find(PieChart)).toHaveLength(1);
    });

    it("Renders all the Legend components", () => {
        expect(wrapper.find(Legend)).toHaveLength(1);
    });

    it("Renders all the Pie components", () => {
        expect(wrapper.find(Pie)).toHaveLength(1);
    });
    it("Renders all the Cell components", () => {
        expect(wrapper.find(Cell)).toHaveLength(1);
    });

    it("Renders all the Center components (if data is null)", () => {
        const w = shallow(<Chart statuses={extractStatuses(patientList)} title="Test" h={250} w={450} day={""} />);
        expect(w.find(Center)).toHaveLength(1);
    });
});
