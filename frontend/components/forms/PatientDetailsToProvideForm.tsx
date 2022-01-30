import { Checkbox, Stack, Button, CheckboxGroup, Flex } from '@chakra-ui/react';
import { serverURL } from '@frontend/config/index';

function getCheckedBoxes(requiredDetails: any) {
  let detailName = [];
  for (let i = 0; i < requiredDetails.length; i++) {
    let key = Object.keys(requiredDetails[i])[0];
    if (requiredDetails[i][key]) {
      detailName.push(key);
    }
  }
  return detailName;
}

async function onSave(requiredDetails: any) {
  // <TODO> - get patient id
  let data = { Patient_PatientId: 1 };
  let key = '';

  // Renaming the detail names
  for (let i = 0; i < requiredDetails.length; i++) {
    key = Object.keys(requiredDetails[i])[0];
    data = { ...data, [key + 'Required']: requiredDetails[i][key] };
  }

  fetch(serverURL + '/patients/updateRequiredDetails', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }).catch((err) => console.log(err));
}

export default function PatientDetailsToProvideForm({ requiredDetails }: any) {
  function setCheckedItems(index: number, key: string, newCheckedState: boolean) {
    let temp = [...requiredDetails.slice(0, index), { [key]: newCheckedState }, ...requiredDetails.slice(index + 1)];
    requiredDetails = temp;
  }

  let checkboxes = [];
  for (let i = 0; i < requiredDetails.length; i++) {
    const key = Object.keys(requiredDetails[i])[0];
    checkboxes.push(
      <Checkbox
        key={key}
        value={key}
        isChecked={requiredDetails[i][key]}
        colorScheme="red"
        onChange={(e) => setCheckedItems(i, key, e.target.checked)}
      >
        {key}
      </Checkbox>
    );
  }

  return (
    <div className="patient-details_form">
      <Stack spacing={5} direction="row">
        <CheckboxGroup defaultValue={getCheckedBoxes(requiredDetails)}>{checkboxes}</CheckboxGroup>
      </Stack>
      <Flex justify="flex-end">
        <Button colorScheme="red" onClick={() => onSave(requiredDetails)}>
          Save
        </Button>
      </Flex>
    </div>
  );
}
