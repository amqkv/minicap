import { shallow } from "enzyme";
import { Button, Heading } from "@chakra-ui/react";
import PatientFormsToFill from "@frontend/components/forms/patient-form-to-fill";
import { DEFAULT_REQUIRED_DETAILS, DEFAULT_PAST_CONDITIONS } from "../__mock__/mock";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

jest.mock("next-auth/react");

describe("test patient's form", () => {
    it("renders a <PatientFormsToFill /> component", () => {
        useSession.mockReturnValue({
            data: {
              user: {
                Role: USER_ROLES.patient,
              },
            },
          });

        const wrapper = shallow(
            <PatientFormsToFill requiredDetails={DEFAULT_REQUIRED_DETAILS} pastConditions={DEFAULT_PAST_CONDITIONS} />
        );
        expect(wrapper.find(Heading)).toHaveLength(4);
        expect(wrapper.find(Button)).toHaveLength(1);

    });
});
