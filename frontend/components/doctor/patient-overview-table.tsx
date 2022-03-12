import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";

export default function PatientOverviewTable({ patientList }: { patientList: Patient[] }) {
    const highTemperaturePatientList = patientList.filter(patient => patient.status[0].temperature.value >= 38);
    const flaggedPatientList = patientList.filter(patient => patient.isPrioritized);
    const malePatientList = patientList.filter(patient => patient.basicInformation.gender === "Male");
    const femalePatientList = patientList.filter(patient => patient.basicInformation.gender === "Female");
    const unreviewedPatientList: Patient[] = patientList.filter(patient => !patient.status[0].isReviewed);

    return (
        <Table colorScheme="red">
            <Thead>
                <Tr>
                    <Th fontSize={"md"} color="gray.700">
                        Patients
                    </Th>
                    <Th isNumeric fontSize={"md"} color="gray.700">
                        {patientList.length}
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Unreviewed</Td>
                    <Td isNumeric>{unreviewedPatientList.length}</Td>
                </Tr>
                <Tr>
                    <Td>High temperature</Td>
                    <Td isNumeric>{highTemperaturePatientList.length}</Td>
                </Tr>
                <Tr>
                    <Td>Flagged</Td>
                    <Td isNumeric>{flaggedPatientList.length}</Td>
                </Tr>{" "}
                <Tr>
                    <Td>Male</Td>
                    <Td isNumeric>{malePatientList.length}</Td>
                </Tr>{" "}
                <Tr>
                    <Td>Female</Td>
                    <Td isNumeric>{femalePatientList.length}</Td>
                </Tr>
            </Tbody>
        </Table>
    );
}
