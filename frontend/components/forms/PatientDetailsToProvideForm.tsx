import {
  Checkbox,
  Stack,
  Button,
  CheckboxGroup,
  extendTheme,
  Flex,
  Box,
} from '@chakra-ui/react';

// <TODO> Fetch details required from backend
let requiredDetails = [
  { detail: 'Weight', required: true },
  { detail: 'Temperature', required: true },
  { detail: 'Symptoms', required: true },
  { detail: 'Chronic Illnesses', required: false },
];
let updatedState = requiredDetails;

function getCheckedBoxes() {
  let detailName = [];
  for (
    let i = 0;
    i < requiredDetails.filter((elm) => elm.required == true).length;
    i++
  ) {
    detailName.push(
      requiredDetails.filter((elm) => elm.required == true)[i].detail
    );
  }
  return detailName;
}

function setCheckedItems(detail: string, newCheckedState: boolean) {
  updatedState[updatedState.findIndex((elm) => elm.detail == detail)].required =
    newCheckedState;
}

function onSave() {
  // <TODO> - send updated state to the backend
  console.log(updatedState);
}

export default function PatientDetailsToProvideForm() {
  let checkboxes = [];
  for (let i = 0; i < requiredDetails.length; i++) {
    checkboxes.push(
      <Checkbox
        key={requiredDetails[i].detail}
        value={requiredDetails[i].detail}
        colorScheme="red"
        onChange={(e) =>
          setCheckedItems(requiredDetails[i].detail, e.target.checked)
        }
      >
        {requiredDetails[i].detail}
      </Checkbox>
    );
  }

  return (
    <div className="patient-details_form">
      <Stack spacing={5} direction="row">
        <CheckboxGroup defaultValue={getCheckedBoxes()}>
          {checkboxes}
        </CheckboxGroup>
      </Stack>
      <Flex justify="flex-end">
        <Button colorScheme="red" onClick={onSave}>
          Save
        </Button>
      </Flex>
    </div>
  );
}
