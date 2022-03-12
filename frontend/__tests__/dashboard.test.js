import { shallow } from "enzyme";
import Dashboard from "@frontend/components/homepage/dashboard";
import { Heading } from "@chakra-ui/react";
import Card from "@frontend/components/homepage/card";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

jest.mock("next-auth/react");

describe("<Dashboard />", () => {
    it("renders a <Dashboard /> component when PATIENT user is logged in", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<Dashboard />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Card)).toHaveLength(3);
    });

    it("renders a <Dashboard /> component when DOCTOR user is logged in", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        const wrapper = shallow(<Dashboard />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Card)).toHaveLength(3);
    });
    it("renders a <Dashboard /> component when ADMIN user is logged in", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        const wrapper = shallow(<Dashboard />);

        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(Card)).toHaveLength(3);
    });
});
