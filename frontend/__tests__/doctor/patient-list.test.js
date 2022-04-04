import { shallow } from "enzyme";
import PatientList from "@frontend/components/doctor/patient-list";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { Text } from "@chakra-ui/react";
describe("<PatientList/>", () => {
    it("renders a Text component when no patients to show", () => {
        //GIVEN (empty patient list)
        const patientList = [];
        //WHEN
        const wrapper = shallow(
            <PatientList patientList={patientList} searchTerm={""} setSelectedPatient={jest.fn()} onOpen={jest.fn()} />
        );

        //THEN
        expect(wrapper.find(Text)).toHaveLength(1);
    });
    it("renders 2 patient info cards", () => {
        //GIVEN
        const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];

        //WHEN
        const wrapper = shallow(
            <PatientList
                patientList={patientList}
                searchTerm={"first"}
                setSelectedPatient={jest.fn()}
                onOpen={jest.fn}
            />
        );

        //THEN
        expect(wrapper.find(PatientInfoCard)).toHaveLength(2);
    });
    it("if search term doesn't match, doesn't render any info cards", () => {
        //GIVEN
        const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];

        //WHEN
        const wrapper = shallow(
            <PatientList
                patientList={patientList}
                searchTerm={"second"}
                setSelectedPatient={jest.fn()}
                onOpen={jest.fn}
            />
        );

        //THEN
        expect(wrapper.find(PatientInfoCard)).toHaveLength(0);
    });

    it("checks the click simulation", () => {
        //GIVEN
        const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
        const selectPatient = jest.fn();
        const open = jest.fn();
        //WHEN
        const wrapper = shallow(
            <PatientList patientList={patientList} searchTerm={""} setSelectedPatient={selectPatient} onOpen={open} />
        );
        wrapper.find(PatientInfoCard).at(0).dive().find("Box").at(0).simulate("click");

        //THEN

        expect(selectPatient.mock.calls).toHaveLength(1);
        expect(open.mock.calls).toHaveLength(1);
    });
});
