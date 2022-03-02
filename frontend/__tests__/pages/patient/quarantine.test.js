import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { Text, Heading, Accordion, AccordionItem, Box } from "@chakra-ui/react";
import { USER_ROLES } from "@frontend/utils/constants";
import NavLink from "@frontend/components/navigation/navlink";
import Quarantine from "@frontend/pages/patient/quarantine";

jest.mock("next-auth/react");

describe("<Quarantine />", () => {
    it("does not renders page, access denied because the user isn't a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });

        const wrapper = shallow(<Quarantine hasCovid />);
        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe("Access Denied");
    });

    it("does not renders page, access denied because the user doesn't have covid", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });

        const wrapper = shallow(<Quarantine hasCovid={false} />);
        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe("Access Denied");
    });

    it("renders page full of information related to quarantining using various text boxes and an accordion component", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });

        const wrapper = shallow(<Quarantine hasCovid />);
        expect(wrapper.find(Text)).toHaveLength(183);
        expect(wrapper.find(Accordion)).toHaveLength(1);
        expect(wrapper.find(AccordionItem)).toHaveLength(3);
        expect(wrapper.find(Heading)).toHaveLength(11);
        expect(wrapper.find(NavLink)).toHaveLength(24);
        expect(wrapper.find(Box)).toHaveLength(64);
        expect(wrapper.find("li")).toHaveLength(142);
        expect(wrapper.find("ul")).toHaveLength(50);
    });
});
