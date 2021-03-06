import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Patient, Patient_HealthOfficial } from "@frontend/models/patient";

export default function PatientOverviewTable({ patientList }: { patientList: Patient_HealthOfficial[] }) {
    const highTemperaturePatientList = patientList.filter(patient => patient?.status[0]?.temperature.value >= 38);
    const flaggedPatientList = patientList.filter(patient => patient?.isPrioritized);
    const malePatientList = patientList.filter(patient => patient?.gender === "Male");
    const femalePatientList = patientList.filter(patient => patient?.gender === "Female");

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
