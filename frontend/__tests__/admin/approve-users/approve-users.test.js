import { shallow } from "enzyme";
import { Button, Spinner, ListItem } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";
import UserRowCard from "@frontend/components/admin/user-row-card";
import { USER_ROLES } from "@frontend/utils/constants";
import ApproveUserPage from "@frontend/pages/admin/approve-users";
import {ApproveUsers, getPendingUsers} from "@frontend/components/admin/approve-users/approve-users";
import React from "react";

jest.mock("next-auth/react");

describe("test rendering of approve user page", () => {
    it("Loads the User Card component [Approval Version]", () =>{
        const dummyUser = {
            AccountId: 1,
            FirstName: "firstName",
            LastName: "lastName",
            Role: 'Tester'
        };
        let wrapper = shallow(<ApproveUsersRowCard userInfoSimple={dummyUser}/>);

        expect(wrapper.find(UserRowCard)).toHaveLength(1);

        let child = wrapper.dive();

        expect(child.find(Button)).toHaveLength(1);
        expect(child.find(ListItem)).toHaveLength(1);
    });
    it("Loads the Users List", () =>{
      const dummyUsers = {Users: [{
        AccountId: 1,
        FirstName: "firstName",
        LastName: "lastName",
        Role: 'Tester'
    }]};
      let component = ApproveUsers(dummyUsers, false, null, 17);
      expect(component).toBeDefined();
      expect(component).toMatchObject(<React.Fragment></React.Fragment>);
    });
    
});
describe("Test the page access permission", () =>{
    it("ADMIN session", () =>{
        useSession.mockReturnValue({
            data: {
              user: {
                Role: USER_ROLES.admin,
              },
            },
          });
          const page = shallow(<ApproveUserPage/>);
          expect(page.find(Spinner)).toHaveLength(1);

    });
    it("NON-ADMIN session", () =>{
        useSession.mockReturnValue({
            data: {
              user: {
                Role: USER_ROLES.user,
              },
            },
          });
          const page = shallow(<ApproveUserPage/>);
          expect(page.contains(<div className={"error-message"}><p>Access Denied</p></div>)).toEqual(true);
    });

});