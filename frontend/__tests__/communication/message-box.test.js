import React from "react";
import { useSession } from "next-auth/react";
import MessageBoxPage from "@frontend/pages/communication/message-box";
import MessageBox from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";
import { shallow } from "enzyme";
import { Button, Input } from "@chakra-ui/react";

jest.mock("next-auth/react");

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
    const doctorUser = {
        patient_accountId: 51,
        doctor_accountId: 109,
        firstName: "TestFirstName",
        lastName: "TestLastName",
    };

    it("When signed in as a doctor", () => {
        let wrapper = shallow(
            <MessageBox
                patient_accountId={doctorUser.patient_accountId}
                doctor_accountId={doctorUser.doctor_accountId}
                firstName={doctorUser.firstName}
                lastName={doctorUser.lastName}
            />
        );
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
