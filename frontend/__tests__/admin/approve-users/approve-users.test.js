import { shallow } from "enzyme";
import { Button, Spinner, ListItem } from "@chakra-ui/react";
import UserRowCard from "@frontend/components/admin/user-row-card";

import { DEFAULT_USER_SIMPLE } from "@frontend/__tests__/__mock__/mock";

import ApproveUsers from "@frontend/components/admin/approve-users/approve-users";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";

jest.mock("@frontend/hooks/unconfirmed-users-list");

describe("Test rendering of different element on approve user page", () => {
    const dummyUsers = {
        Users: [
            DEFAULT_USER_SIMPLE
        ],
    };
    it("Test the User Card component [Approval Version]", () => {
        let wrapper = shallow(<ApproveUsersRowCard userInfoSimple={dummyUsers.Users[0]} />);

        expect(wrapper.find(UserRowCard)).toHaveLength(1);

        let child = wrapper.dive();

        expect(child.find(Button)).toHaveLength(1);
        expect(child.find(ListItem)).toHaveLength(1);
    });
    it("Test Approve Users List Component", () => {
        unconfirmedUsersList.mockReturnValue({
            users: dummyUsers,
            isLoading: false,
            isError: false,
        });
        const componentNormal = shallow(<ApproveUsers />);
        expect(componentNormal.find(ApproveUsersRowCard)).toHaveLength(1);

        unconfirmedUsersList.mockReturnValue({
            users: dummyUsers,
            isLoading: true,
            isError: false,
        });
        const componentLoading = shallow(<ApproveUsers />);
        expect(componentLoading.contains(<Spinner />)).toBeTruthy();

        unconfirmedUsersList.mockReturnValue({
            users: {},
            isLoading: false,
            isError: true,
        });
        const componentError = shallow(<ApproveUsers />);
        expect(componentError.contains(<p> There is an error </p>)).toBeTruthy();
    });
});
