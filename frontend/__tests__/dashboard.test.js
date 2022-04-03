import { shallow } from "enzyme";
import Dashboard from "@frontend/components/homepage/dashboard";
import { Heading } from "@chakra-ui/react";
import Card from "@frontend/components/homepage/card";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { MOCK_DATA_SYMPTOMS, MOCK_CONFIRMED_APPOINTMENT } from "@frontend/__tests__/__mock__/mock";
jest.mock("next-auth/react");

const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        });
});

afterAll(() => {
    global.fetch = unmockedFetch;
});

describe("<Dashboard />", () => {
    it("renders a <Dashboard /> component when PATIENT user is logged in", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<Dashboard data={MOCK_DATA_SYMPTOMS} appointmentConfirmation={MOCK_CONFIRMED_APPOINTMENT} />);
        expect(wrapper.find(Heading)).toHaveLength(5);
        expect(wrapper.find(Card)).toHaveLength(2);
    });

    it("renders a <Dashboard /> component when ADMIN user is logged in", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.admin,
                },
            },
        });
        const component = shallow(<Dashboard data={[]} appointmentConfirmation={[]}/>);
        expect(component.find(Heading)).toHaveLength(3);
    });
});
