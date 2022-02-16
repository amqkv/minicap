import { Box, Heading } from "@chakra-ui/react";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-form-to-fill";

export default function PatientSymptoms({ requiredDetails }: any) {
    return (
        <Box paddingLeft={"20px"}>
            <Heading size="lg">Your Doctor: Dr Sawkon Di Zenoots</Heading>
            <Heading size="lg">Today's Condition</Heading>
            <PatientDetailsToProvideForm requiredDetails={requiredDetails}/>
        </Box>
    );
}