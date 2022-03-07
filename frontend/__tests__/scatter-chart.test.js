import { shallow } from "enzyme";
import Chart from "@frontend/components/scatter-chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Box, Center, Text } from "@chakra-ui/react";
import { DAY } from "@frontend/utils/constants";
import { extractStatuses, transformWeightTempData } from "@frontend/functions/data-transform-chart";
import { DEFAULT_PATIENT } from "@frontend/models/patient";

const patientList = [DEFAULT_PATIENT];

describe("<ScatterChart/>", () => {
    const wrapper = shallow(
        <Chart
            statuses={extractStatuses(patientList)}
            transformDataFn={transformWeightTempData}
            title="Test"
            day={DAY.ALL}
            w={300}
            h={300}
        />
    );

    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(2);
    });
    it("Renders all the Center components (if data is not null)", () => {
        expect(wrapper.find(Center)).toHaveLength(2);
    });
    it("Renders all the Text components (if data is not null)", () => {
        expect(wrapper.find(Text)).toHaveLength(1);
    });
    it("Renders all the Center components (if data is null)", () => {
        const w = shallow(
            <Chart
                statuses={extractStatuses(patientList)}
                transformDataFn={transformWeightTempData}
                title="Test"
                day={""}
                w={300}
                h={300}
            />
        );
        expect(w.find(Center)).toHaveLength(1);
    });
    it("Renders all the ScatterChart components", () => {
        expect(wrapper.find(ScatterChart)).toHaveLength(1);
    });
    it("Renders all the CartesianGrid components", () => {
        expect(wrapper.find(CartesianGrid)).toHaveLength(1);
    });
    it("Renders all the XAxis components", () => {
        expect(wrapper.find(XAxis)).toHaveLength(1);
    });
    it("Renders all the YAxis components", () => {
        expect(wrapper.find(YAxis)).toHaveLength(1);
    });
    it("Renders all the Scatter components", () => {
        expect(wrapper.find(Scatter)).toHaveLength(1);
    });
    it("Renders all the Tooltip components", () => {
        expect(wrapper.find(Tooltip)).toHaveLength(1);
    });
});
