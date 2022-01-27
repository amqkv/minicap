import {
  Text,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { mainColor } from "@frontend/utils/constants";
import { useState } from "react";
import PasswordInput from "@frontend/components/inputs/PasswordInput";
import StandardInput from "@frontend/components/inputs/StandardInput";
import RoleInput from "@frontend/components/inputs/AccountRoleInput";
import GenderInput from "@frontend/components/inputs/GenderInput";

export interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

interface InputFactoryProps extends InputProps {
  type: string;
}

export default function InputFactory({
  name,
  label,
  placeholder,
  type,
}: InputFactoryProps) {
  if (type === "password") {
    return (
      <PasswordInput name={name} label={label} placeholder={placeholder} />
    );
  } else if (type === "standard") {
    return (
      <StandardInput name={name} label={label} placeholder={placeholder} />
    );
  } else if (type === "role") {
    return <RoleInput name={name} label={label} placeholder={placeholder} />;
  } else if (type === "gender") {
    return <GenderInput name={name} label={label} placeholder={placeholder} />;
  } else {
    return null;
  }
}
