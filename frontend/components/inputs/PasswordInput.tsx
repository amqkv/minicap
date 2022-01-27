import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
} from "@chakra-ui/react";
import { mainColor } from "@frontend/utils/constants";
import { useState } from "react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function PasswordInput({
  name,
  label,
  placeholder,
}: InputProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Text marginTop="10px">{label}</Text>
      <InputGroup size="md">
        <Input
          name={name}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={placeholder}
          marginTop={"10px"}
          marginBottom={"10px"}
        />
        <InputRightElement width="4.5rem" marginTop="10px">
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
