import React from "react";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import PatientListPage from "@frontend/pages/admin/patient-list";
import PatientLists from "@frontend/components/admin/patient/patient-lists";
import PatientItem from "@frontend/components/admin/patient/patient-item";
import usePatientDoctorData from "@frontend/hooks/use-patient-doctor-data";
import PatientModal from "@frontend/components/admin/patient/patient-modal";
import { shallow } from "enzyme";
import { Box, RadioGroup, Spinner } from "@chakra-ui/react";

jest.mock("next-auth/react");
jest.mock("@frontend/hooks/use-patient-doctor-data");

describe("Test the patient-list page access", () => {
    it("NON-ADMIN session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.doctor,
                },
            },
        });
        //When
        const wrapper = shallow(<PatientListPage />);
        //Then
        expect(wrapper.contains(<p id="error-message">Access Denied</p>)).toEqual(true);
    });
    it("ADMIN session", () => {
        //Given
        useSession.mockReturnValue({
            data: {
                user: {
                    Role: USER_ROLES.admin,
                },
            },
        });
        usePatientDoctorData.mockReturnValue({
            patientInfo: null,
            unassignedPatientInfo: null,
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<PatientListPage />);
        //Then
        expect(wrapper.find(PatientLists)).toHaveLength(1);
    });
});

describe("Test rendering of patient lists", () => {
    it("renders the patients of a list", () => {
        //Given
        usePatientDoctorData.mockReturnValue({
            patientInfo: [
                {
                    accountId: 100,
                    firstName: "Dra",
                    lastName: "LastDoctor",
                    doctorId: 1,
                    patients: [
                        {
                            accountId: 1,
                            patientId: 1,
                            firstName: "Name",
                            lastName: "Last",
                            doctorId: 1,
                        },
                        {
                            accountId: 2,
                            patientId: 2,
                            firstName: "Name2",
                            lastName: "Last2",
                            doctorId: 1,
                        },
                    ],
                },
            ],
            unassignedPatientInfo: [
                {
                    accountId: 13,
                    patientId: 3,
                    firstName: "FirstUn",
                    lastName: "LastUn",
                    doctorId: -1,
                },
            ],
            isLoading: false,
            isError: false,
        });
        //When

        const wrapper = shallow(<PatientLists />);

        //Then

        expect(wrapper.find(PatientItem)).toHaveLength(3);
    });
    it("render spinner when loading", () => {
        //Given
        usePatientDoctorData.mockReturnValue({
            patientInfo: [],
            unassignedPatientInfo: [],
            isLoading: true,
            isError: false,
        });
        //When
        const wrapper = shallow(<PatientLists />);

        //Then

        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
    it("render error message when there's an error loading", () => {
        //Given
        usePatientDoctorData.mockReturnValue({
            patientInfo: [],
            unassignedPatientInfo: [],
            isLoading: false,
            isError: true,
        });
        //When
        const wrapper = shallow(<PatientLists />);

        //Then

        expect(wrapper.find("#error-message")).toHaveLength(1);
    });
});

describe("simple test to see if modal opens", () => {
    it("clicks it", () => {
        //Given
        usePatientDoctorData.mockReturnValue({
            patientInfo: [
                {
                    accountId: 100,
                    firstName: "Dra",
                    lastName: "LastDoctor",
                    doctorId: 1,
                    patients: [
                        {
                            accountId: 1,
                            patientId: 1,
                            firstName: "Name",
                            lastName: "Last",
                            doctorId: 1,
                        },
                        {
                            accountId: 2,
                            patientId: 2,
                            firstName: "Name2",
                            lastName: "Last2",
                            doctorId: 1,
                        },
                    ],
                },
            ],
            unassignedPatientInfo: [
                {
                    accountId: 13,
                    patientId: 3,
                    firstName: "FirstUn",
                    lastName: "LastUn",
                    doctorId: -1,
                },
            ],
            isLoading: false,
            isError: false,
        });
        //When

        const wrapper = shallow(<PatientLists />);
        const wrapper2 = wrapper.find(PatientItem);
        wrapper2.at(0).shallow().find(Box).simulate("click");
        const wrapper3 = wrapper.find(PatientModal);
        expect(wrapper3.prop("isOpen")).toBeTruthy();
    });
});
