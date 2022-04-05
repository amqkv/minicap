import { shallow } from "enzyme";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

jest.mock("next/router");
jest.mock("next-auth/react");

describe("Tests the login/logout button", () => {
    it("renders the login button", () => {
        useSession.mockReturnValue({});
        useRouter.mockReturnValue({});

        const wrapper = shallow(<LoginLogoutButton />);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).text()).toBe("Get Started Here");
    });

    it("renders the standard input field and good text when signed in", () => {
        useSession.mockReturnValue({
            data: {
                user: {},
            },
        });
        useRouter.mockReturnValue({});

        const wrapper = shallow(<LoginLogoutButton />);
        expect(wrapper.find(Button).text()).toBe("Sign Out");
    });

    it("Checks the onClick functions", () => {
        useSession.mockReturnValue({
            data: {
                user: {},
            },
        });
        useRouter.mockReturnValue({
            push: () => {
                return;
            },
        });

        const signOutButton = shallow(<LoginLogoutButton />);
        signOutButton.props().onClick();
        expect(signOut).toBeCalledTimes(1);

        useSession.mockReturnValue({});
        const signInButton = shallow(<LoginLogoutButton />);
        signInButton.props().onClick();
        expect(signIn).toBeCalledTimes(1);
    });
});
