import React from "react";
import { useSession } from "next-auth/react";
import UserListPage from "@frontend/pages/admin/user-list";
import UserLists from "@frontend/components/admin/user-lists";
import { USER_ROLES } from "@frontend/utils/constants";
import { Box, Spinner } from "@chakra-ui/react";
import { shallow } from "enzyme";
import useRole from "@frontend/hooks/use-role";
import UserRowCard from "@frontend/components/admin/user-row-card";
import UserModal from "@frontend/components/admin/user-modal";

jest.mock("next-auth/react");
jest.mock("@frontend/hooks/use-role");

describe("Test the user-list page access", () => {
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
        const wrapper = shallow(<UserListPage />);
        //Then
        expect(wrapper.find(UserLists)).toHaveLength(1);
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
                    {
                        AccountId: 2,
                        FirstName: "Name2",
                        LastName: "Last2",
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

        expect(wrapper.find("UserRowCard")).toHaveLength(2);
    });
    it("render spinner when loading", () => {
        //Given
        useRole.mockReturnValue({
            userRoles: {},
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<UserLists />);

        //Then

        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
    it("Error loading data", () => {
        //Given
        useRole.mockReturnValue({
            userRoles: {},
            isLoading: false,
            isError: true,
        });
        //When
        const wrapper = shallow(<UserLists />);

        //Then

        expect(wrapper.find("#error-message")).toHaveLength(1);
    });
});

describe("Check if a click makes the modal pop up", () => {
    it("Clicks a row", () => {
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
                    {
                        AccountId: 2,
                        FirstName: "Name2",
                        LastName: "Last2",
                        Role: "Patient",
                    },
                ],
            },
            isLoading: false,
            isError: false,
        });
        //When

        const wrapper = shallow(<UserLists />);
        const wrapper2 = wrapper.find(UserRowCard);
        wrapper2.at(0).shallow().find(Box).simulate("click");
        const wrapper3 = wrapper.find(UserModal);
        expect(wrapper3.prop("isOpen")).toBeTruthy();
    });
});
