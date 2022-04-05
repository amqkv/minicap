import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import UserList from "@frontend/pages/immigration-officer/find-users";
import Circle from "@frontend/components/circle";
import Modal from "@frontend/components/modal/modal";
import { Flex, Text, Box } from "@chakra-ui/react";
import CovidPatients from "@frontend/pages/health-official/covid-patients";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";

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

        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Text)).toHaveLength(2);
        expect(wrapper.find(Flex)).toHaveLength(2);
        expect(wrapper.find(Box)).toHaveLength(3);
        expect(wrapper.find(PatientInformationModalBody)).toHaveLength(1);
        expect(wrapper.find(FilteredPatients)).toHaveLength(1);
        expect(wrapper.find(FilteredPatients).prop("options")).toHaveLength(3);
    });
    it("Click on a user and opens modal", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const wrapper = shallow(<CovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        expect(wrapper.find(Modal).prop("isOpen")).toBeFalsy();
        // index 0 is Flex for search input.
        const userRow = wrapper.find(Flex).at(0);
        userRow.props().onClick();
        wrapper.update();
        expect(wrapper.find(Modal).prop("isOpen")).toBeTruthy();
    });
<<<<<<< HEAD
});
=======
    it("Simulate onChange event on the filter bar", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.iOfficer,
                },
            },
        });
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation(init => [init, setState]);
        const wrapper = shallow(<UserList patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        const inputBox = shallow(wrapper.find(Input).get(0));
        inputBox.simulate("change", { target: { value: "a" } });
        expect(setState).toBeCalledWith("a");
    });
});

describe("filter function", () => {
    it("filters properly", () => {
        //sort alphabetically and do not click on button for positive or negative filter
        expect(
            filter({
                searchText: "bing bong",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                alphabeticalSort: true,
                positivesOnly: false,
                negativesOnly: false,
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[0]]);
        // no search, look for all patients that are positive
        expect(
            filter({
                searchText: "",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                alphabeticalSort: true,
                positivesOnly: true,
                negativesOnly: false,
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[1]]);
    });
});
>>>>>>> eefe58faa51d02b5c04cc5117516402d0c27578f
