import React from "react";
import { useSession } from "next-auth/react";
import MessageListPage from "@frontend/pages/communication/message-list";
import MessageList from "@frontend/components/communication/message-list";
import { USER_ROLES } from "@frontend/utils/constants";
import { Spinner } from "@chakra-ui/react";
import { shallow } from "enzyme";
import usePatientNameList from "@frontend/hooks/use-patient-name";

jest.mock("next-auth/react");
jest.mock("@frontend/hooks/use-patient-name");

describe("Test the message-list page access", () => {
    it("NON-DOCTOR session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        //When
        const wrapper = shallow(<MessageListPage />);
        //Then
        expect(
            wrapper.contains(
                <div className={"error-message"}>
                    <p>Access Denied</p>
                </div>
            )
        ).toEqual(true);
    });

    it("DOCTOR session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        usePatientNameList.mockReturnValue({
            userRoles: null,
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<MessageListPage />);
        //Then
        expect(wrapper.find(MessageList)).toHaveLength(1);
    });
});

describe("Test rendering of Message list", () => {
    it("renders the patient's name of a list", () => {
        //Given
        usePatientNameList.mockReturnValue({
            patientNames: [
                {
                    AccountId: 1,
                    FirstName: "Name",
                    LastName: "Last",
                    Role: "Patient",
                },
                {
                    AccountId: 2,
                    FirstName: "Name2",
                    LastName: "Last2",
                    Role: "Patient",
                },
            ],
            isLoading: false,
            isError: false,
        });
        //When
        const wrapper = shallow(<MessageList />);
        //Then
        expect(wrapper.find("UserRowCard")).toHaveLength(2);
    });
    it("render spinner when loading", () => {
        //Given
        usePatientNameList.mockReturnValue({
            patientNames: {},
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<MessageList />);
        //Then
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});
