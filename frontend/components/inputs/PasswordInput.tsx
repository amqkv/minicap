import { InputGroup, Input, InputRightElement, Button, Text, InputLeftElement } from "@chakra-ui/react";
import { mainColor } from "@frontend/utils/constants";
import { useState } from "react";
import { InputProps } from "@frontend/components/inputs/types/input";
import { WarningIcon } from "@chakra-ui/icons";

export default function PasswordInput({ name, label, placeholder, error }: InputProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Text margin="10px 0">{label}</Text>
      <InputGroup size="md">
        {error && <InputLeftElement children={<WarningIcon color="red.500" />} />}

        <Input name={name} pr="4.5rem" type={show ? "text" : "password"} placeholder={placeholder} />
        <InputRightElement width="4.5rem" >
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShow(!show)}
            color={"white"}
            backgroundColor={mainColor}
            _hover={{ opacity: "80%" }}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
