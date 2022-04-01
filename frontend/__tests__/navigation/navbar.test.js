import { shallow } from "enzyme";
import NavBar from "@frontend/components/navigation/navbar";
import { useSession } from "next-auth/react";
import Logo from "@frontend/components/navigation/logo";
import NavLink from "@frontend/components/navigation/navlink";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { USER_ROLES } from "@frontend/utils/constants";
import { IconButton, Stack } from "@chakra-ui/react";

jest.mock("next-auth/react");
// Using DOCTOR ROLE to test standard rendering.
const numberOfDoctorNavLinks = 3;

describe("<Navbar />", () => {
    it("renders a <Logo /> component and a Home <NavLink> when the user isn't logged in", () => {
        useSession.mockReturnValue({});

        const wrapper = shallow(<NavBar />);
        expect(wrapper.find(Logo)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(1);
        expect(wrapper.find(LoginLogoutButton)).toHaveLength(1);
    });

    it("renders a <Logo /> component and a 4 <NavLink> when the user is an admin", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.admin,
                },
            },
        });

        const wrapper = shallow(<NavBar />);
        expect(wrapper.find(Logo)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(4);
        expect(wrapper.find(LoginLogoutButton)).toHaveLength(1);
    });

    it("renders a <Logo /> component and a " + numberOfDoctorNavLinks + " <NavLink> when the user is a doctor", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });

        const wrapper = shallow(<NavBar />);
        expect(wrapper.find(Logo)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(numberOfDoctorNavLinks);
        expect(wrapper.find(LoginLogoutButton)).toHaveLength(1);
    });

    it("Open and close the navbar menu and test element rendering", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        let wrapper = shallow(<NavBar />);
        // Icon renders
        expect(wrapper.find(IconButton)).toHaveLength(1);
        expect(wrapper.find(Stack)).toHaveLength(0);
        wrapper.find(IconButton).props().onClick();
        expect(wrapper.find(Stack)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(numberOfDoctorNavLinks * 2);
    });
});
