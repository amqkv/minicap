import { Input, Text } from "@chakra-ui/react";

interface StandardInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function StandardInput({
  name,
  label,
  placeholder,
}: StandardInputProps) {
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
