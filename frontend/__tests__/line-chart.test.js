import { shallow } from "enzyme";
import Chart from "@frontend/components/line-chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Box } from "@chakra-ui/react";

const STATUS_DATA_PROPS_MOCK = {
    Temperature: 0,
    StatusTime: "",
    Weight: 0,
    Symptoms: "",
};
const mockData = [STATUS_DATA_PROPS_MOCK];

describe("<LineChart/>", () => {
    const wrapper = shallow(<Chart data={mockData} w={300} h={300} />);

    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Renders all the XAxis components", () => {
        expect(wrapper.find(XAxis)).toHaveLength(1);
    });
    it("Renders all the YAxis components", () => {
        expect(wrapper.find(YAxis)).toHaveLength(1);
    });
    it("Renders all the Tooltip components", () => {
        expect(wrapper.find(Tooltip)).toHaveLength(1);
    });
    it("Renders all the Legend components", () => {
        expect(wrapper.find(Legend)).toHaveLength(1);
    });
    it("Renders all the Line components", () => {
        expect(wrapper.find(Line)).toHaveLength(2);
    });
    it("Renders all the CartesianGrid components", () => {
        expect(wrapper.find(CartesianGrid)).toHaveLength(1);
    });
    it("Renders all the LineChart components", () => {
        expect(wrapper.find(LineChart)).toHaveLength(1);
    });
});
