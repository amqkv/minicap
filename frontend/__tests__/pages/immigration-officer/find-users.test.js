import { useSession } from "next-auth/react";
import { mount, shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { immigrationofficerMockPatients } from "@frontend/__tests__/__mock__/mock";
import UserList, { filterByText } from "@frontend/pages/immigration-officer/find-users";
import Circle from "@frontend/components/circle";
import List from "@frontend/components/admin/list";
import Modal from "@frontend/components/modal";
import Legend from "@frontend/components/legend";
import { Input, Image } from "@chakra-ui/react";

jest.mock("next-auth/react");

describe("immigration officer find users page", () => {
    it("doesn't allow access if the user isn't an immigration officer", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<UserList patients={immigrationofficerMockPatients} />);

        expect(wrapper.find("p")).toHaveLength(1);
    });
    it("renders properly if the user is an immigration officer", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.iOfficer,
                },
            },
        });
        const wrapper = shallow(<UserList patients={immigrationofficerMockPatients} />);

        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(List)).toHaveLength(1);
        expect(wrapper.find(Legend)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Image)).toHaveLength(1);
    });
});

describe("filter function", () => {
    it("filters properly", () => {
        expect(filterByText({ searchText: "bing bong", arr: immigrationofficerMockPatients })).toStrictEqual([
            immigrationofficerMockPatients[0],
        ]);
    });
});
