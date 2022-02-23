import { shallow } from "enzyme";
import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import ApproveUserPage from "@frontend/pages/admin/approve-users";

jest.mock("next-auth/react");

describe("Test the page access permission", () => {
    it("ADMIN session", () => {
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
    it("NON-ADMIN session", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.user,
                },
            },
        });
        const page = shallow(<ApproveUserPage/>);
        expect(
            page.contains(
                <div className={"error-message"}>
                    <p>Access Denied</p>
                </div>
            )
        ).toEqual(true);
    });
});
