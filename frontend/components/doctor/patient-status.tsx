import { Box, Text } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";

export default function PatientStatus({ patient }: { patient: Patient }) {
    const status: { [key: string]: { value: string | number; unit: string } } = {
        weight: {
            value: patient.status[0].weight.value,
            unit: patient.status[0].weight.unit,
        },
        temperature: {
            value: patient.status[0].temperature.value,
            unit: patient.status[0].temperature.unit,
        },
        symptoms: {
            value: patient.status[0].symptoms.value,
            unit: patient.status[0].symptoms.unit,
        },
    };
    const requiredDetails: { [key: string]: boolean } = {
        weight: patient.requiredDetails.weight,
        temperature: patient.requiredDetails.temperature,
        symptoms: patient.requiredDetails.symptoms,
    };
    return (
        <Box m={1}>
            {Object.keys(patient.status[0]).map(statusDetail =>
                requiredDetails[statusDetail] ? (
                    <Text fontSize="sm" key={statusDetail}>
                        <b>{statusDetail.charAt(0).toUpperCase() + statusDetail.slice(1)}: &nbsp;</b>
                        {status[statusDetail].value} {status[statusDetail].unit}
                    </Text>
                ) : null
            )}
        </Box>
    );
}
