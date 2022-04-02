import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { Button } from "@chakra-ui/react";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";

jest.mock("next-auth/react");

describe("patient tracking form page", () => {
    it("doesn't allow access if the user isn't a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        expect(wrapper.find("p")).toHaveLength(1);
    });
    it("renders properly if the user is a patient", () => {
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.patient,
                },
            },
        });

        expect(wrapper.find(TrackPatientForm)).toHaveLength(1);
        expect(wrapper.find(StandardInput)).toHaveLength(5);
        expect(wrapper.find(CloseButton)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
});
