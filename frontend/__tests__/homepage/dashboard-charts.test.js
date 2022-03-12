import DashboardCharts from "@frontend/components/homepage/dashboard-charts";
import { USER_ROLES } from "@frontend/utils/constants";
import { shallow } from "enzyme";

import { BarChart, CartesianGrid, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Stat, StatNumber } from "@chakra-ui/react"

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

describe("test the dashboard <DashboardCharts/> [ADMIN version]", () => {
    it("does not renders the stats box if not ADMIN", () => {
        const component = shallow(<DashboardCharts role="fake role" />);
        expect(component.find(Stat)).toHaveLength(0);
    });
    it("does not renders the stats box if no stats data is present even if admin", () => {
        const component = shallow(<DashboardCharts role={USER_ROLES.admin} data={[]}/>);
        expect(component.find(Stat)).toHaveLength(0);
    });

    it("renders the Admin dashboard chart when ADMIN is logged in", () => {
        const mockStats = { unassignedPatientsCount: 420, pendingCount: 69 };
        const component = shallow(<DashboardCharts role={USER_ROLES.admin} stats={mockStats} />);
        expect(component.find(Stat)).toHaveLength(2);
        expect(component.find(StatNumber)).toHaveLength(2);
        expect(component.find(StatNumber).at(0).props().children).toBe(mockStats.unassignedPatientsCount);
        expect(component.find(StatNumber).at(1).props().children).toBe(mockStats.pendingCount);
    });
});
