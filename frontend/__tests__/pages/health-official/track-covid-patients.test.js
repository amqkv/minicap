import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import TrackCovidPatients from "@frontend/pages/health-official/track-contact-patients";
import { Text, Flex, Box } from "@chakra-ui/react";
import FilteredPatients from "@frontend/components/patient/filtered-patients";
import NavLink from "@frontend/components/navigation/navlink";

jest.mock("next-auth/react");

describe("health official list of contactpage", () => {
    it("doesn't allow access if the user isn't an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<TrackCovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe("Access Denied");
    });

    it("allows access if the user isn't an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const wrapper = shallow(<TrackCovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find(Box)).toHaveLength(1);
        expect(wrapper.find(FilteredPatients)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(2);
        expect(wrapper.find(Text)).toHaveLength(6);
        expect(wrapper.find(Flex)).toHaveLength(2);
    });
});
