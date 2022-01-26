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
      <Text>{label}</Text>
      <Select placeholder=" ">
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
        <option value="health official">Health official</option>
        <option value="immigration officer">Immigration officer</option>
      </Select>
    </>
  );
}
