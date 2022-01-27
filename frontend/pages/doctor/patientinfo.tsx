import PatientDetailsToProvideForm from '@frontend/components/forms/PatientDetailsToProvideForm';
import { Box, Flex, Heading, Text, Image, Divider} from '@chakra-ui/react';

let patient = {
    basicInformation: {
        firstName: 'Dragun',
        lastName: 'Di Zenuts',
        gender: 'Male',
        age: 62,
        admissionDate: '01/01/2022',
    },
    conditionDetails: {
        statusTime: '13h',
        temperature: 37.6,
        weight: 132,
        symptoms: ['cough', 'sore throat', 'chest pains']
    }
}

// function getPatientCondition(){
//     let details = []
//     for(let i = 1; i < patient.conditionDetails.length; i ++){
//         details.push
//     }
// }

export default function PatientInfo(){

    return(
        <div className='patient-info'>
        <div className='section basic-details'>
            <Flex>
                <Box >
                    <Image src='https://static.thenounproject.com/png/389195-200.png' alt='Patient Picture' boxSize='140px'/>
                </Box>
                <Box >
                    <Heading size='lg'>{patient.basicInformation.firstName + ' ' + patient.basicInformation.lastName}</Heading>
                    <Text fontSize='xl'>{patient.basicInformation.gender}</Text>
                    <Text fontSize='xl'>Age: {patient.basicInformation.age}</Text>
                    <Text fontSize='xl'>Admitted On: {patient.basicInformation.admissionDate}</Text>
                </Box>
            </Flex>
        </div>
        <Divider/>
        <div className='section desired-details'>
            <div className='header'>
                <Heading size='lg'> Desired Details</Heading>
            </div>
            <div className='form-container'>
                <PatientDetailsToProvideForm/>
            </div>
        </div>
        <Divider/>
        <div className='section updated-details'>
            <Heading size='lg'>Details updated {patient.conditionDetails.statusTime} ago:</Heading>
            <Text></Text>
        </div>
        </div>
    )
}