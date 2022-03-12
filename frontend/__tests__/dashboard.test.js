import { shallow } from "enzyme";
import Dashboard from "@frontend/components/homepage/dashboard";
import { Heading } from "@chakra-ui/react";
import Card from "@frontend/components/homepage/card";
import Chart from "@frontend/components/line-chart"; 
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

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

const mockData = [
    {
        Temperature: 37,
        StatusTime: "03/09/2022",
        Weight: 70,
        Symptoms: "Testing 1 ",
        IsReviewed: true,
        Patient_PatientId: 3,
        StatusId: 198,
    },
    {
        Temperature: 38,
        StatusTime: "03/08/2022",
        Weight: 70,
        Symptoms: "Testing 2 ",
        IsReviewed: true,
        Patient_PatientId: 3,
        StatusId: 113,
    },
    {
        Temperature: 38,
        StatusTime: "03/01/2022",
        Weight: 70,
        Symptoms: "Testing 3 ",
        IsReviewed: true,
        Patient_PatientId: 3,
        StatusId: 264,
    },
];

describe("<Dashboard />", () => {
    useSession.mockReturnValue({
        data: {
            user: {
                Role: USER_ROLES.patient,
            },
        },
    });
    const wrapper = shallow(<Dashboard data={mockData}/>);

    it("renders a <Dashboard /> component when user is logged in", () => {
        expect(wrapper.find(Heading)).toHaveLength(2);
        expect(wrapper.find(Card)).toHaveLength(3);
    });
});
