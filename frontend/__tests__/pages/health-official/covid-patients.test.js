import React from "react";
import { useSession } from "next-auth/react";
import { shallow } from "enzyme";
import { USER_ROLES } from "@frontend/utils/constants";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";
import CovidPatients from "@frontend/pages/health-official/covid-patients";
import Circle from "@frontend/components/circle";
import Modal from "@frontend/components/modal/modal";
import { Select, Text, Flex, Box, Input } from "@chakra-ui/react";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";
import changeCovidStatus from "@frontend/functions/change-patient-covid-status";

jest.mock("@frontend/functions/change-patient-covid-status");
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
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Text)).toHaveLength(3);
        expect(wrapper.find(Flex)).toHaveLength(3);
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
        changeCovidStatus.mockResolvedValue(true);

        wrapper.find(Select).simulate("change");
        expect(changeCovidStatus).toBeCalledTimes(1);
    });
});
