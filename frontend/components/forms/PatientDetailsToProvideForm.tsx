import { Checkbox, Stack } from '@chakra-ui/react';

export default function PatientDetailsToProvideForm(){
    // <TODO> Fetch details required from backend
    let detailsRequired = [{detail: 'Weight', required: true}, {detail: 'Temperature', required: true}, {detail: 'Symptoms', required: true}, {detail: 'Chronic Illnesses', required: false}]
    let checkboxes = []
    for(let i = 0; i < detailsRequired.length; i++){
        checkboxes.push(<Checkbox isChecked={detailsRequired[i].required} colorScheme='red'> {detailsRequired[i].detail} </Checkbox>)
    }

    return(
        <Stack spacing={5} direction='row'>
            {checkboxes}
        </Stack>
    )
}