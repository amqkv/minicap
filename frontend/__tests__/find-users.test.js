import { shallow } from "enzyme";
import UserListPage from "@frontend/pages/immigration-officer/find-users";
import { USER_ROLES } from "@frontend/utils/constants";
import { useSession } from "next-auth/react";
import StandardInput from "@frontend/components/inputs/standard-input";
import Legend from "@frontend/components/legend";
import List from "@frontend/components/admin/list";

jest.mock("next-auth/react");

describe("test the immigration-officer's find user page", () => {
    it("renders a search bar, a legend, and a list of users that are queried when the user is an immigration-officer", async () => {
        //getting a mock user with assigned role of immigration officer
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.iOfficer,
                },
            },
        });

        const wrapper = shallow(<UserListPage />);
        expect(wrapper.find(StandardInput)).toHaveLength(1);
        expect(wrapper.find(Legend)).toHaveLength(1);
        expect(wrapper.find(List)).toHaveLength(1);
    });
});
