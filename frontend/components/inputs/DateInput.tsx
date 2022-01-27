import { Text } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function StandardInput({ name, label }: InputProps) {
  let today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <input className='chakra-input css-1cxpn8z' type="date" name={name} value={today} max={today} />
    </>
  );
}
