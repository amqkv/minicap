import { InputPatientProps } from "./types/input";
import { Input, InputGroup, Text, Box } from "@chakra-ui/react";

export default function PatientInputs({ label, units, name, style }: InputPatientProps) {
    return (
        <Box>
            <Text margin="10px 0">{label}</Text>
            <InputGroup>
                <Input name={name} size="sm" marginBottom={"10px"}></Input>
            </InputGroup>
            <Text>{units}</Text>
        </Box>
    );
}
