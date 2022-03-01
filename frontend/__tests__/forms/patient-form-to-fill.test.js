import { shallow } from "enzyme";
import { DEFAULT_REQUIRED_DETAILS, DEFAULT_PAST_CONDITIONS } from "../__mock__/mock";
import PatientFormsToFill from "@frontend/components/forms/patient-form-to-fill";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { Heading } from "@chakra-ui/react";



describe("handlePatientForm", () => {


    it("Calls fetch", async () => {
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
        expect(wrapper.find(Heading)).toHaveLength(3);
    });
    // it("Calls setCheckedItems", async () => {
    //     const component = shallow(<PatientDetailsToProvideForm requiredDetails={REQUIRED_DETAILS} />);
    //     component
    //         .find(Checkbox)
    //         .at(2)
    //         .simulate("change", { target: { checked: false, key: "symptoms" } });
    //     expect(component.find(Checkbox).get(2).props.checked).toBeFalsy();
    // });
});
