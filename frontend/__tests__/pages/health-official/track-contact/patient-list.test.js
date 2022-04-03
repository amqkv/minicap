import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import UserListPage from "@frontend/pages/health-official/track-contact/[id]";
import { Text, Flex, Box, Button, Divider } from "@chakra-ui/react";
import Modal from "@frontend/components/modal/modal";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";

jest.mock("next-auth/react");

describe("health official list of contactpage", () => {
    it("doesn't allow access if the user isn't an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe("Access Denied");
    });

    it("allows access if the user isn't an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find(Box)).toHaveLength(1);
        expect(wrapper.find(FilteredPatients)).toHaveLength(1);
        expect(wrapper.find(Text)).toHaveLength(2);
        expect(wrapper.find(Flex)).toHaveLength(3);
        expect(wrapper.find(Button)).toHaveLength(2);
        expect(wrapper.find(Button).at(0).text()).toBe("Delete Contact");
        expect(wrapper.find(Button).at(1).text()).toBe("Send Email");
        expect(wrapper.find(Divider)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(PatientInformationModalBody)).toHaveLength(1);
    });

    it("Click on a user and opens modal", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} id={566} />);
        expect(wrapper.find(Modal).prop("isOpen")).toBeFalsy();
        // index 0 is Flex for search input.
        const userRow = wrapper.find(Flex).at(0);

        userRow.props().onClick();
        wrapper.update();

        expect(wrapper.find(Modal).prop("isOpen")).toBeTruthy();
    });
});
