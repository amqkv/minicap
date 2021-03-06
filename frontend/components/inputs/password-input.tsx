import { InputGroup, Input, InputRightElement, Button, Text, InputLeftElement, Tooltip, Box } from "@chakra-ui/react";
import { MAIN_COLOR } from "@frontend/utils/constants";
import { useState } from "react";
import { InputProps } from "@frontend/components/inputs/types/input";
import { WarningIcon } from "@chakra-ui/icons";

export default function PasswordInput({ name, label, placeholder, error, style }: InputProps) {
  const [show, setShow] = useState(false);
  const message = "Your password must contain at least one of the following: an uppercase, a lowercase, a special symbol, and length at least 8";
  return (
    <Box style={style} padding="5px">
      <Text margin="10px 0">{label}</Text>
      <InputGroup size="md">
        {error && (
          <InputLeftElement>
            {name === 'Password' ? <Tooltip aria-label='A tooltip' label={message} defaultIsOpen bg='red.500'>
              <WarningIcon color="red.500" />
            </Tooltip> : <WarningIcon color="red.500" />}
          </InputLeftElement>
        )}

        <Input name={name} pr="4.5rem" type={show ? "text" : "password"} placeholder={placeholder} />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShow(!show)}
            color={"white"}
            backgroundColor={MAIN_COLOR}
            _hover={{ opacity: "80%" }}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
