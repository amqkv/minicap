import React from "react";
import { useSession } from "next-auth/react";
import UserListPage from "@frontend/pages/admin/user-list";
import UserLists from "@frontend/components/admin/user-lists";
import { USER_ROLES } from "@frontend/utils/constants";
import { Box, Spinner, Modal, RadioGroup } from "@chakra-ui/react";
import { shallow } from "enzyme";
import useRole from "@frontend/hooks/use-role";
import UserRowCard from "@frontend/components/admin/user-row-card";
import UserModal from "@frontend/components/admin/user-modal";

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
});

describe("user modal component test", () => {
    it("renders the user modal", () => {
        //Given
        const dummyUser = {
            AccountId: null,
            FirstName: "firstName",
            LastName: "lastName",
            Role: "Patient",
        };
        //When
        let wrapper = shallow(<UserModal userInfo={dummyUser} />);
        //Then
        expect(wrapper.find("#user-name").text()).toEqual(`${dummyUser.LastName}, ${dummyUser.FirstName}`);
    });
});

describe("simple test", () => {
    it("clicks it", () => {
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
        // expect(wrapper.find(UserModal)).toHaveLength(1);
        // expect(wrapper.contains(<Box> User Role:</Box>)).toEqual(true);
    });
});
