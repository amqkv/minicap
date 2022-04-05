import React from "react";
import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import CovidPatients from "@frontend/pages/health-official/covid-patients";
import Circle from "@frontend/components/circle";
import List from "@frontend/components/admin/list";
import Modal from "@frontend/components/modal/modal";
import Legend from "@frontend/components/legend";
import { Input, Flex, Button, Select } from "@chakra-ui/react";
import { filter } from "@frontend/functions/sorting-filtering";
import PatientInformationModalBody from "@frontend/components/health-official/patient-modal-health_official";

jest.mock("next-auth/react");

describe("health official covid patients page", () => {
    it("doesn't allow access if the user isn't an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        const wrapper = shallow(<CovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find("p")).toHaveLength(1);
    });
    it("renders properly if the user is an health official", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const wrapper = shallow(<CovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);

        expect(wrapper.find(Select)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(List)).toHaveLength(1);
        expect(wrapper.find(Legend)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Circle)).toHaveLength(4);
        expect(wrapper.find(Button)).toHaveLength(3);
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
        const wrapper = shallow(<CovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        expect(wrapper.find(Modal).prop("isOpen")).toBeFalsy();
        // index 0 is Flex for search input.
        const userRow = shallow(wrapper.find(Flex).get(2));
        userRow.props().onClick();
        wrapper.update();
        expect(wrapper.find(Modal).prop("isOpen")).toBeTruthy();
    });
    it("Simulate onChange event on the filter bar", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation(init => [init, setState]);
        const wrapper = shallow(<CovidPatients patients={IMMIGRATION_OFFICER_MOCK_PATIENTS} />);
        const inputBox = shallow(wrapper.find(Input).get(0));
        inputBox.simulate("change", { target: { value: "a" } });
        expect(setState).toBeCalledWith("a");
    });
});

describe("filter function", () => {
    it("filters properly", () => {
        expect(
            filter({
                searchText: "bing bong",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                alphabeticalSort: true,
                positivesOnly: false,
                negativesOnly: false,
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[0]]);

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
