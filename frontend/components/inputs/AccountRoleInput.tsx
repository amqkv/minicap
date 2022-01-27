import { Text, Select } from "@chakra-ui/react";

interface RoleInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function StandardInput({
  name,
  label,
  placeholder,
}: RoleInputProps) {
  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <Select marginBottom={"10px"} placeholder=" " size={"md"}>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
        <option value="health official">Health official</option>
        <option value="immigration officer">Immigration officer</option>
      </Select>
    </>
  );
}
