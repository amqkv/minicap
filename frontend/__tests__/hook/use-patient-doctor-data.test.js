import usePatientDoctorData from "@frontend/hooks/use-patient-doctor-data";
import useSWR from "swr";

jest.mock("swr");
describe("Test role hook", () => {
    it("Loads data", async () => {
        //Given
        useSWR.mockReturnValue({
            data: {
                assigned: "data",
                unassigned: "unassignedData",
            },
            error: false,
        });
        //When
        const { patientInfo, unassignedPatientInfo, isLoading, isError } = usePatientDoctorData();

        expect(patientInfo).toEqual("data");
        expect(unassignedPatientInfo).toEqual("unassignedData");
        expect(isLoading).toBeFalsy();
        expect(isError).toBeFalsy();
    });

    it("Returns error", async () => {
        //Given
        useSWR.mockReturnValue({
            data: {},
            error: true,
        });
        //When
        const { patientInfo, unassignedPatientInfo, isLoading, isError } = usePatientDoctorData();

        expect(patientInfo).toEqual(undefined);
        expect(unassignedPatientInfo).toEqual(undefined);
        expect(isLoading).toBeFalsy();
        expect(isError).toBeTruthy();
    });

    it("Return Loading", async () => {
        //Given
        useSWR.mockReturnValue({
            data: null,
            error: false,
        });
        //When
        const { patientInfo, unassignedPatientInfo, isLoading, isError } = usePatientDoctorData();

        expect(patientInfo).toEqual(undefined);
        expect(unassignedPatientInfo).toEqual(undefined);
        expect(isLoading).toBeTruthy();
        expect(isError).toBeFalsy();
    });
});
