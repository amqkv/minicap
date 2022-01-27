import { Text, Select} from "@chakra-ui/react";

interface GenderInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function StandardInput({
  name,
  label,
  placeholder,
}: GenderInputProps) {
  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <Select marginBottom={"10px"} placeholder=" " size={"md"}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="undefined">Rather not say</option>
      </Select>
    </>
  );
}
