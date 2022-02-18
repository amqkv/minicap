import { Text, Select } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function DropdownInput({ name, label, placeholder, options }: InputProps) {
    return (
        <>
            <Text margin="10px 0">{label}</Text>
            <Select marginBottom={"10px"} placeholder={placeholder} size={"md"}>
                {options?.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        </>
    );
}
