import { WarningIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Text, Box } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function StandardInput({ name, label, placeholder, error, style, inputProps, onChange }: InputProps) {
    return (
        <Box style={style} padding="5px">
            {label && <Text margin="10px 0">{label}</Text>}
            <InputGroup size="md">
                {error && (
                    <InputLeftElement>
                        <WarningIcon color="red.500" />
                    </InputLeftElement>
                )}
                <Input
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    size="md"
                    marginBottom={"10px"}
                    {...inputProps}
                />
            </InputGroup>
        </Box>
    );
}
