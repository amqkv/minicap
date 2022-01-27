import { Input, Text } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function StandardInput({
  name,
  label,
  placeholder,
}: InputProps) {
  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <Input
        name={name}
        placeholder={placeholder}
        size="md"
        marginBottom={"10px"}
      />
    </>
  );
}
