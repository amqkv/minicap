import { InputPatientProps } from "./types/input";
import { InputGroup, Text, Box, Textarea } from "@chakra-ui/react";

export default function PatientTextarea({ label, name, style }: InputPatientProps) {
    return (
        <Box paddingLeft={"0px"}>
            <InputGroup fontSize={"18px"}>
                <Text marginTop={"10px"} marginRight={"0px"} marginBottom={"10px"} marginLeft={["10px", "20px"]}>
                    {label}:{" "}
                </Text>
                <Textarea
                    name={name}
                    margin="10px 0 10px 10px"
                    style={style}
                    placeholder={"Please separate the symptoms with a comma"}></Textarea>
            </InputGroup>
        </Box>
    );
}
