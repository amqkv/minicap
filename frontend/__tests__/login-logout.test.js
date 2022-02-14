import { shallow } from "enzyme";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";

jest.mock("next-auth/react");

describe("", () => {
    it("renders the login button", () => {
        useSession.mockReturnValue({});
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

        const wrapper = shallow(<LoginLogoutButton />);
        expect(wrapper.find(Button).text()).toBe("Sign Out");
    });
});
