import { Flex } from "@chakra-ui/react";
import StandardInput from "../inputs/standard-input";

export default function TrackPatientForm() {
    return (
        <Flex >
            <StandardInput
                style={{ width: "15%" }}
                name="First Name"
                placeholder="Enter First Name"
                label="First Name"
            />
            <StandardInput style={{ width: "15%" }} name="Last Name" placeholder="Enter Last Name" label="Last Name" />
            <StandardInput style={{ width: "15%" }} name="Email" placeholder="Enter Email" label="Email" />
            <StandardInput
                style={{ width: "15%" }}
                name="Phone Number"
                placeholder="Enter Phone Number"
                label="Phone Number"
            />
            <StandardInput
                style={{ width: "15%" }}
                name="Date of Contact"
                placeholder="Enter Date of Contact"
                label="Date of Contact"
            />
        </Flex>
    );
}
