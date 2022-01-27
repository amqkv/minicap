import { Text, Select } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function DropdownInput({ name, label, placeholder, options }: InputProps) {
  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <Select marginBottom={"10px"} placeholder=" " size={"md"}>
        {options?.map((option) => (
          <option value={option as any}>{option}</option>
        ))}
      </Select>
    </>
  );
}
