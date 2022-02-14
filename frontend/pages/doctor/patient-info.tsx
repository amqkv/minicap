import { Box, Flex, Heading, Text, Image, Divider } from "@chakra-ui/react";
import PatientDetailsToProvideForm from "components/forms/patient-details-to-provide-form";
import serverURL from "@frontend/config/index.js";

export async function getServerSideProps() {
    let requiredDetails: any = [];
    try {
        // <TODO> Get current patient ID (the one that gets clicked on)
        const response: any = await fetch(serverURL + "/patients/getRequiredDetails/3");
        requiredDetails = await response.json();
    } catch {}
    return {
        props: {
            requiredDetails,
        },
    };
}

// <TODO> Get current patient's actual information from backend
const patient = {
    basicInformation: {
        firstName: "Dragun",
        lastName: "Di Zenuts",
        gender: "Male",
        age: 62,
        admissionDate: "2022-01-01",
    },
    conditionDetails: [
        {
            updateDate: "2022-01-22",
            temperature: 37.6,
            weight: 132,
            symptoms: ["cough", "sore throat", "chest pains"],
        },
    ],
};

export default function PatientInfo({ requiredDetails }: any) {
    return (
        <Box className="patient-info">
            <Box m="14px" className="section basic-details">
                <Flex>
                    <Box flex="1">
                        <Image
                            src="https://static.thenounproject.com/png/389195-200.png"
                            alt="Patient Picture"
                            boxSize="140px"
                            width="190px"
                        />
                    </Box>
                    <Box flex="3.5">
                        <Heading size="lg">
                            {patient.basicInformation.firstName + " " + patient.basicInformation.lastName}
                        </Heading>
                        <Text fontSize="xl">{patient.basicInformation.gender}</Text>
                        <Text fontSize="xl">
                            <b>Age: </b>
                            {patient.basicInformation.age}
                        </Text>
                        <Text fontSize="xl">
                            <b>Admitted On:</b> {patient.basicInformation.admissionDate}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Divider />
            <Box m="14px" className="section desired-details">
                <Box mb="10px" className="header">
                    <Heading size="lg"> Desired Details</Heading>
                </Box>
                <Box className="form-container">
                    <PatientDetailsToProvideForm requiredDetails={requiredDetails} />
                </Box>
            </Box>
            <Divider />
            <Box m="14px" className="section updated-details">
                {/* <TODO> Insert updated details history */}
            </Box>
        </Box>
    );
}
