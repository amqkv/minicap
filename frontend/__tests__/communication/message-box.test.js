import React from "react";
import { useSession } from "next-auth/react";
import MessageBoxPage from "@frontend/pages/communication/message-box";
import MessageBox from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";
import { shallow } from "enzyme";
import { Button, Input } from "@chakra-ui/react";

jest.mock("next-auth/react");
const mockPreventDefault = jest.fn();

describe("Test the message-box access", () => {
    it("PATIENT session", () => {
        // Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        // When
        const wrapper = shallow(<MessageBoxPage />);
        // Then
        expect(wrapper.find(MessageBox)).toHaveLength(1);
    });
    it("DOCTOR session", () => {
        // Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        // When
        const wrapper = shallow(<MessageBoxPage />);
        // Then
        expect(wrapper.find(MessageBox)).toHaveLength(1);
    });
    it("NON-PATIENT or NON-DOCTOR session", () => {
        // Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.hOfficial,
                },
            },
        });
        // When
        const wrapper = shallow(<MessageBoxPage />);
        // Then
        expect(
            wrapper.contains(
                <div className={"error-message"}>
                    <p>Access Denied</p>
                </div>
            )
        ).toEqual(true);
    });
});

describe("Test rendering of different element on message box page", () => {
    it("When signed in as a doctor", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    AccountId: 1,
                    Role: USER_ROLES.doctor,
                },
            },
        });
        let wrapper = shallow(<MessageBox patient_accountId="2" />);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it("When signed in as a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });
        let wrapper = shallow(<MessageBox doctor_accountId="109" />);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it("Send message", () => {
        const mockEvent = {
            preventDefault: mockPreventDefault,
            target: [{ value: "test" }],
        };
        const component = shallow(<MessageBox />);
        component.find("form").simulate("submit", mockEvent);
        component.update();
        expect(mockPreventDefault).toBeCalled();
    });
});
