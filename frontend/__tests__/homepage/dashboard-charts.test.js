import DashboardCharts from "@frontend/components/homepage/dashboard-charts";
import { USER_ROLES } from "@frontend/utils/constants";
import { shallow } from "enzyme";

import { BarChart, CartesianGrid, YAxis, Tooltip, Legend, Bar } from "recharts";

describe("test the dashboard <DashboardCharts/>", () => {
    it("does not renders the dashboard chart", () => {
        const wrapper = shallow(<DashboardCharts role="fake role" />);
        expect(wrapper.find(BarChart)).toHaveLength(0);
    });

    it("renders the Immigration Officer dashboard chart when it is logged in appropriately, there is a chart and a card", () => {
        const wrapper = shallow(<DashboardCharts role={USER_ROLES.iOfficer} data={[]} />);
        expect(wrapper.find(BarChart)).toHaveLength(1);
        expect(wrapper.find(Bar)).toHaveLength(2);
        expect(wrapper.find(CartesianGrid)).toHaveLength(1);
        expect(wrapper.find(YAxis)).toHaveLength(1);
        expect(wrapper.find(Tooltip)).toHaveLength(1);
        expect(wrapper.find(Legend)).toHaveLength(1);
    });
});
