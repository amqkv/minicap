import { Checkbox, Stack, Button, CheckboxGroup, extendTheme, Flex, Box } from '@chakra-ui/react';

// <TODO> Fetch details required from backend
let detailsRequired = [{detail: 'Weight', required: true}, {detail: 'Temperature', required: true}, {detail: 'Symptoms', required: true}, {detail: 'Chronic Illnesses', required: false}]
let updatedState = detailsRequired

function getCheckedBoxes(){
    let requiredDetails = []
    for(let i = 0; i < detailsRequired.filter(elm => elm.required == true).length; i++){
        requiredDetails.push(detailsRequired.filter(elm => elm.required == true)[i].detail)
    }
    return requiredDetails
}

function setCheckedItems(detail: string, newCheckedState : boolean){
    updatedState[updatedState.findIndex(elm => elm.detail == detail)].required = newCheckedState
}

function onSave(){
    // <TODO> - send updated state to the backend
    console.log(updatedState)
}

export default function PatientDetailsToProvideForm(){
    let checkboxes = []
    for(let i = 0; i < detailsRequired.length; i++){
        checkboxes.push(
        <Checkbox 
            key={detailsRequired[i].detail}
            value={detailsRequired[i].detail}
            colorScheme='red'
            onChange={(e) => setCheckedItems(detailsRequired[i].detail, e.target.checked)}
            > 
                {detailsRequired[i].detail} 
        </Checkbox>)
    }

    return(
        <div className='patient-details_form'>
            <Stack spacing={5} direction='row'>
                <CheckboxGroup defaultValue={getCheckedBoxes()}>
                    {checkboxes}
                </CheckboxGroup>
            </Stack>
            <Flex justify='flex-end'>
                <Button colorScheme='red' onClick={onSave}>Save</Button>
            </Flex>
        </div>


    )
}