import { mutate } from "swr";
import { shallow } from "enzyme";
import PatientModal from "@frontend/components/admin/patient/patient-modal";
import { DOCTOR_LIST_SIMPLE, SINGLE_PATIENT_INFO_SIMPLE } from "@frontend/__tests__/__mock__/mock";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve("Something"),
    })
);
jest.mock("swr", () => {
    const originalModule = jest.requireActual("swr");
    return {
        __esModule: true,
        ...originalModule,
        mutate: jest.fn(),
    };
});
let onClose = jest.fn();

describe("Patient modal component test", () => {
    it("Renders the patient modal", () => {
        //Given
        const dummyPatient = SINGLE_PATIENT_INFO_SIMPLE;

        const dummyDoctor = DOCTOR_LIST_SIMPLE;
        //When
        let wrapper = shallow(<PatientModal isOpen={true} patientInfo={dummyPatient} doctorList={dummyDoctor} />);
        //Then
        expect(wrapper.find("#patient-name").text()).toEqual(`${dummyPatient.lastName}, ${dummyPatient.firstName}`);
        expect(wrapper.find("Radio")).toHaveLength(dummyDoctor.length + 1);
    });
    it("Checks if onChange changes state", () => {
        //Given
        const dummyUser = {
            accountId: null,
            patientId: null,
            firstName: "firstName",
            lastName: "lastName",
            doctorId: 1,
        };

        const dummyDoctor = [
            {
                firstName: "Dra",
                lastName: "LastDoctor",
                doctorId: 1,
            },
            { firstName: "Doc", lastName: "LastDoctor2", doctorId: 2 },
        ];
        //When
        let wrapper = shallow(<PatientModal isOpen={true} patientInfo={dummyUser} doctorList={dummyDoctor} />);
        //Then

        expect(wrapper.find("RadioGroup").prop("value")).toEqual(1);
        wrapper.find("RadioGroup").props().onChange("-1");
        expect(wrapper.find("RadioGroup").prop("value")).toEqual(-1);
    });
    it("Check apply button for functionality", async () => {
        //Given
        const dummyPatient = SINGLE_PATIENT_INFO_SIMPLE;

        const dummyDoctor = DOCTOR_LIST_SIMPLE;
        //When
        let wrapper = shallow(
            <PatientModal isOpen={true} patientInfo={dummyPatient} onClose={onClose} doctorList={dummyDoctor} />
        );
        wrapper.find("#done-button").props().onClick();
        await Promise.resolve();
        //Then

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mutate).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
