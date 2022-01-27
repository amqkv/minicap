import PasswordInput from "@frontend/components/inputs/PasswordInput";
import StandardInput from "@frontend/components/inputs/StandardInput";
import DateInput from "@frontend/components/inputs/DateInput";
import DropdownInput from "@frontend/components/inputs/DropdownInput";

import { InputFactoryProps } from "@frontend/components/inputs/types/input";

export default function InputFactory({ name, label, placeholder, type, options }: InputFactoryProps) {
  if (type === "password") {
    return <PasswordInput name={name} label={label} placeholder={placeholder} />;
  } else if (type === "standard") {
    return <StandardInput name={name} label={label} placeholder={placeholder} />;
  } else if (type === "dropdown") {
    return <DropdownInput name={name} label={label} options={options} />;
  } else if (type === "date") {
    return <DateInput name={name} label={label} />;
  } else {
    return null;
  }
}
