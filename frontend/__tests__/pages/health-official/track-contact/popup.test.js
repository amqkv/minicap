import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import UserListPage from "@frontend/pages/health-official/track-contact/[id]";
import { Flex, Button } from "@chakra-ui/react";
import Modal from "@frontend/components/modal/modal";
import usePatientModal from "@frontend/hooks/use-patient-modal";

jest.mock("next-auth/react");
jest.mock("@frontend/hooks/use-patient-modal");

describe("Test the modal and list functions", () => {
    beforeEach(() => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        usePatientModal.mockReturnValue({
            isOpen: false,
            modalCLose: jest.fn(() => (usePatientModal.isOpen = false)),
            openModal: jest.fn(() => (usePatientModal.isOpen = true)),
            selectedPatient: IMMIGRATION_OFFICER_MOCK_PATIENTS[0],
        });
    });
    it("Test the modal open and close", () => {
        const openModalMock = usePatientModal().openModal;

        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} id={566} />);

        expect(wrapper.find(Modal).prop("isOpen")).toBeFalsy();

        wrapper.find(Flex).at(0).simulate("click");
        wrapper.update();

        expect(usePatientModal).toBeCalled();
        expect(openModalMock).toBeCalled();
    });
    it("Test Delete Contact", () => {
        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} id={566} />);

        global.fetch = jest.fn().mockResolvedValueOnce(true);
        wrapper.find(Button).at(0).simulate("click");
        wrapper.update();
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockClear();

        global.fetch = jest.fn().mockResolvedValueOnce(undefined);
        wrapper.find(Button).at(0).simulate("click");
        wrapper.update();
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockClear();
    });
    it("Test Send Email", () => {
        const wrapper = shallow(<UserListPage contacts={IMMIGRATION_OFFICER_MOCK_PATIENTS} id={566} />);

        global.fetch = jest.fn().mockResolvedValue(true);
        wrapper.find(Button).at(1).simulate("click");
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockClear();

        global.fetch = jest.fn().mockResolvedValue(undefined);
        wrapper.find(Button).at(1).simulate("click");
        expect(global.fetch).toHaveBeenCalled();
        global.fetch.mockClear();
    });
});
