import { shallow } from "enzyme";
import Dashboard from "@frontend/components/homepage/dashboard";
import { Heading } from "@chakra-ui/react";
import Card from "@frontend/components/homepage/card";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("<Dashboard />", () => {
    it("renders a <Dashboard /> component when user is logged in", () => {
        useSession.mockReturnValue({});
        const wrapper = shallow(<Dashboard />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Card)).toHaveLength(0);
    });
});


