import { WarningIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Text  } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";
import { useState } from "react";

export default function StandardInput({ name, label, placeholder, error }: InputProps) {
  return (
    <>
      <Text margin="10px 0">{label}</Text>
      <InputGroup size="md">
        {error && <InputLeftElement children={<WarningIcon color="red.500" />} />}
        <Input name={name} placeholder={placeholder} size="md" marginBottom={"10px"} />
      </InputGroup>
    </>
  );
}
