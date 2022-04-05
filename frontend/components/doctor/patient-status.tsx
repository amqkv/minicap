import { Box, Text, Flex, Center } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";

export default function PatientStatus({
    patient,
    statusIndex,
    alignPassed = "center",
}: {
    patient: Patient;
    statusIndex: number;
    alignPassed?: string;
}) {
    const status: { [key: string]: { value: string | number; unit: string } } = {
        weight: {
            value: patient.status[statusIndex].weight.value,
            unit: patient.status[statusIndex].weight.unit,
        },
        temperature: {
            value: patient.status[statusIndex].temperature.value,
            unit: patient.status[statusIndex].temperature.unit,
        },
        symptoms: {
            value: patient.status[statusIndex].symptoms.value,
            unit: patient.status[statusIndex].symptoms.unit,
        },
    };
    const requiredDetails: { [key: string]: boolean } = {
        weight: patient.requiredDetails.weight,
        temperature: patient.requiredDetails.temperature,
        symptoms: patient.requiredDetails.symptoms,
    };
    return (
        <Box m={1} align={alignPassed}>
            {Object.keys(patient.status[statusIndex]).map(statusDetail =>
                requiredDetails[statusDetail] ? (
                    <Text fontSize="sm" key={statusDetail} width="250px">
                        <b>{statusDetail.charAt(0).toUpperCase() + statusDetail.slice(1)}: &nbsp;</b>
                        {status[statusDetail].value} {status[statusDetail].unit}
                    </Text>
                ) : null
            )}
        </Box>
    );
}
