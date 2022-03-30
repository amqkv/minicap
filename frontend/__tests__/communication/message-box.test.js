import React from "react";
import { useSession } from "next-auth/react";
import MessageBoxPage from "@frontend/pages/communication/message-box";
import MessageBox from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";
import { shallow } from "enzyme";

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
