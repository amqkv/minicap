import { InputPatientProps } from "./types/input";
import { Input, InputGroup, Text, Box } from "@chakra-ui/react";

export default function PatientInputs({ label, units, name, style }: InputPatientProps) {
    return (
        <Box paddingLeft={"10px"}>
            <InputGroup fontSize={"18px"}>
                <Text margin="10px 0 10px 10px">{label}: </Text>
                <Input w={"20%"} name={name} margin="10px 0 10px 10px" style={style}></Input>
                <Text margin="10px 0 10px 10px">{units}</Text>
            </InputGroup>
        </Box>
    );
}