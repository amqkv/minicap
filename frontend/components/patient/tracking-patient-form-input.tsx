import { Flex } from "@chakra-ui/react";
import StandardInput from "@frontend/components/inputs/standard-input";
import { ContactPerson } from "@frontend/components/patient/types/contact-person";

interface TrackPatientFormProps {
    onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
    values: ContactPerson;
}

interface trackPatientFormField {
    name: string;
    placeholder: string;
    label: string;
}

const trackPatientFormFields = [
    { name: "firstName", placeholder: "Enter First Name", label: "First Name" },
    { name: "lastName", placeholder: "Enter Last Name", label: "Last Name" },
    { name: "email", placeholder: "Enter Email", label: "Email" },
    { name: "phoneNumber", placeholder: "Enter Phone Number", label: "Phone Number" },
    { name: "dateOfContact", placeholder: "Enter Date of Contact", label: "Date of Contact" },
];

export default function TrackPatientForm({ onChange, index, values }: TrackPatientFormProps) {
    return (
        <Flex flexDirection={{ base: "column", md: "row" }} alignItems="center">
            {trackPatientFormFields.map((item: trackPatientFormField) => (
                <StandardInput
                    key={item.name}
                    inputProps={{ flex: 1, value: values[item.name as keyof ContactPerson] }}
                    onChange={e => onChange(index, e)}
                    {...item}
                />
            ))}
        </Flex>
    );
}
