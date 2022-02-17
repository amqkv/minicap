import { shallow } from "enzyme";
import NavBar from "@frontend/components/navigation/navbar";
import { useSession } from "next-auth/react";
import Logo from "@frontend/components/navigation/logo";
import NavLink from "@frontend/components/navigation/navlink";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router")

describe("<Navbar />", () => {
  it("renders a <Logo /> component and a Home <NavLink> when the user isn't logged in", () => {
    useSession.mockReturnValue({});
    useRouter.mockReturnValue({ pathname: "/ds" });

    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(Logo)).toHaveLength(1);
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find(LoginLogoutButton)).toHaveLength(1);

  });

  it("renders a <Logo /> component and a 2 <NavLink> when the user is an admin", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          Role: USER_ROLES.admin,
        },
      },
    });
    useRouter.mockReturnValue({ pathname: "/" });


    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(Logo)).toHaveLength(1);
    expect(wrapper.find(NavLink)).toHaveLength(3);
    expect(wrapper.find(LoginLogoutButton)).toHaveLength(0);

  });

  it("renders a <Logo /> component and a 2 <NavLink> when the user is a doctor", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          Role: USER_ROLES.doctor,
        },
      },
    });
    useRouter.mockReturnValue({ pathname: "/" });


    const wrapper = shallow(<NavBar />);
    expect(wrapper.find(Logo)).toHaveLength(1);
    expect(wrapper.find(NavLink)).toHaveLength(2);
    expect(wrapper.find(LoginLogoutButton)).toHaveLength(0);

  });
});
