import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import UserList, { filterByText, getServerSideProps } from "@frontend/pages/immigration-officer/find-users";
import Circle from "@frontend/components/circle";
import List from "@frontend/components/admin/list";
import Modal from "@frontend/components/modal";
import Legend from "@frontend/components/legend";
import { Input, Image, Flex } from "@chakra-ui/react";

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
        const wrapper = shallow(<UserList patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

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
        const wrapper = shallow(<UserList patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(List)).toHaveLength(1);
        expect(wrapper.find(Legend)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Image)).toHaveLength(1);
    });
    it("Click on a user and opens modal", () =>{
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.iOfficer,
                },
            },
        });
        const wrapper = shallow(<UserList patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        expect(wrapper.find(Modal).prop("isOpen")).toBeFalsy();
        // index 0 is Flex for search input.
        const userRow = shallow(wrapper.find(Flex).get(1));
        userRow.props().onClick();
        wrapper.update();
        expect(wrapper.find(Modal).prop("isOpen")).toBeTruthy();
    });
    it("Simulate onChange event on the filter bar", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.iOfficer,
                },
            },
        });
        const wrapper = shallow(<UserList patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        const inputBox = shallow(wrapper.find(Input).get(0));
        inputBox.simulate("change", { target: {value: "a"}});
        
    });
});

describe("filter function", () => {
    it("filters properly", () => {
        expect(filterByText({ searchText: "bing bong", arr: IMMIGRATION_OFFICER_MOCK_PATIENTS })).toStrictEqual([
            IMMIGRATION_OFFICER_MOCK_PATIENTS[0],
        ]);
    });
});
