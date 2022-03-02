import { InputPatientProps } from "./types/input";
import { Input, InputGroup, Text, InputLeftElement, Flex, InputRightAddon } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function UnitInput({ label, units, name, style, error }: InputPatientProps) {
    return (
        <Flex alignItems={"center"} paddingLeft={"10px"}>
            <Text margin="10px 0 10px 10px">{label}: </Text>
            <InputGroup fontSize={"18px"} margin="10px 0 10px 10px">
                {error && (
                    <InputLeftElement>
                        <WarningIcon color="red.500" />
                    </InputLeftElement>
                )}
                <Input  placeholder={"Enter an integer"} name={name} style={style}></Input>
                <InputRightAddon children={units} />
            </InputGroup>
        </Flex>
    );
}
