import { Box, Text } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function DateInput({ name, label, style }: InputProps) {
  let today = new Date().toISOString().slice(0, 10)

  return (
    <Box style={style} padding="5px">
      <Text margin='10px 0'>{label}</Text>
      <input className='chakra-input css-1cxpn8z' type="date" name={name} max={today} />
    </Box>
  );
}
