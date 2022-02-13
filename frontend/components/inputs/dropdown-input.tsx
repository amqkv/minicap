import { Text, Select, Box } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function DropdownInput({ name, label, placeholder, options, style }: InputProps) {
    return (
        <Box style={style} padding="5px">
        <Text margin='10px 0'>{label}</Text>
        <Select marginBottom={"10px"} placeholder={placeholder} size={"md"}>
          {options?.map((option) => (
            <option value={option as any}>{option}</option>
          ))}
        </Select>
      </Box>
    );
}
