import React from "react";
import { useSession } from "next-auth/react";
import UserListPage from "@frontend/pages/admin/user-list";
import UserLists from "@frontend/components/admin/user-lists";
import { USER_ROLES } from "@frontend/utils/constants";
import { Spinner } from "@chakra-ui/react";
import { shallow } from "enzyme";
import useRole from "@frontend/hooks/use-role";
import UserRowCard from "@frontend/components/admin/user-row-card";

jest.mock("next-auth/react");
jest.mock("@frontend/hooks/use-role");

describe("test the user-list page access", () => {
    it("NON-ADMIN session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        //When
        const wrapper = shallow(<UserListPage />);
        //Then
        expect(wrapper.contains(<p id="error-message">Access Denied</p>)).toEqual(true);
    });

    it("ADMIN session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.admin,
                },
            },
        });
        useRole.mockReturnValue({
            userRoles: null,
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<UserLists />);
        //Then
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});

describe("Test rendering of User list", () => {
    it("renders the user of a list", () => {
        //Given
        useRole.mockReturnValue({
            userRoles: {
                Patient: [
                    {
                        AccountId: 1,
                        FirstName: "Name",
                        LastName: "Last",
                        Role: "Patient",
                    },
                ],
            },
            isLoading: false,
            isError: false,
        });
        //When

        const wrapper = shallow(<UserLists />);

        //Then
        expect(wrapper.find(UserRowCard)).toHaveLength(1);
    });
});
