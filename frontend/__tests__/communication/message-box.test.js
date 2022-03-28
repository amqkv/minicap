import React from "react";
import { useSession } from "next-auth/react";
import MessageBoxPage from "@frontend/pages/communication/message-box";
import { shallow } from "enzyme";

jest.mock("next-auth/react");

// describe("Test the message-box access", () => {
//     it("NON-PATIENT or NON-DOCTOR session", () => {
//         // Given
//         useSession.mockReturnValue({
//             data: {
//                 user: {
//                     Role: USER_ROLES.hOfficial,
//                 },
//             },
//         });
//         // When
//         const wrapper = shallow(<MessageBoxPage />);
//         // Then
//         expect(
//             wrapper.contains(
//                 <div className={"error-message"}>
//                     <p>Access Denied</p>
//                 </div>
//             )
//         ).toEqual(true);
//     });
// });
