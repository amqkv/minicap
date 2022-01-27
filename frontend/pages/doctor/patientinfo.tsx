import PatientDetailsToProvideForm from '@frontend/components/forms/PatientDetailsToProvideForm';
import { Box, Flex, Heading, Text, Image, Divider } from '@chakra-ui/react';

let patient = {
  basicInformation: {
    firstName: 'Dragun',
    lastName: 'Di Zenuts',
    gender: 'Male',
    age: 62,
    admissionDate: '2022-01-01',
  },
  conditionDetails: [
    {
      updateDate: '2022-01-22',
      temperature: 37.6,
      weight: 132,
      symptoms: ['cough', 'sore throat', 'chest pains'],
    },
  ],
};

export default function PatientInfo() {
  return (
    <div className="patient-info">
      <div className="section basic-details">
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
              {patient.basicInformation.firstName +
                ' ' +
                patient.basicInformation.lastName}
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
      </div>
      <Divider />
      <div className="section desired-details">
        <div className="header">
          <Heading size="lg"> Desired Details</Heading>
        </div>
        <div className="form-container">
          <PatientDetailsToProvideForm />
        </div>
      </div>
      <Divider />
      <div className="section updated-details">
        {/* <TODO> Insert updated detals history */}
      </div>
    </div>
  );
}
