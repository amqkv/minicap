import { Box, Text } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";

interface AppProps {
    patient: Patient;
}

export default function PatientStatus({ patient }: AppProps) {
    const status: { [key: string]: { value: string | number; unit: string } } = {
        weight: {
            value: patient.status.weight.value,
            unit: patient.status.weight.unit,
        },
        temperature: {
            value: patient.status.temperature.value,
            unit: patient.status.temperature.unit,
        },
        symptoms: {
            value: patient.status.symptoms.value,
            unit: patient.status.symptoms.unit,
        },
    };
    const requiredDetails: { [key: string]: boolean } = {
        weight: patient.requiredDetails.weight,
        temperature: patient.requiredDetails.temperature,
        symptoms: patient.requiredDetails.symptoms,
    };
    return(            
    <Box m={1}>
        {Object.keys(patient.status).map(statusDetail =>
            requiredDetails[statusDetail] ? (
                <Text fontSize="sm" key={statusDetail}>
                    <b>{statusDetail.charAt(0).toUpperCase() + statusDetail.slice(1)}: &nbsp;</b>
                    {status[statusDetail].value} {status[statusDetail].unit}
                </Text>
            ) : null
        )}

    </Box>)
}