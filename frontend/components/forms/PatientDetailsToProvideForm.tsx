import { Checkbox, Stack, Button, CheckboxGroup, Flex } from '@chakra-ui/react';
import { serverURL } from '@frontend/config/index';
import { useEffect, useState } from 'react';

function getCheckedBoxes(requiredDetails: any) {
  let detailName = [];
  for(let i = 0; i < requiredDetails.length; i++){
    let key = Object.keys(requiredDetails[i])[0]
    if(requiredDetails[i][key]){
      detailName.push(key)
    }
  }
  return detailName;
}

async function onSave() {
  // <TODO> - send updated state to the backend

}


export default function PatientDetailsToProvideForm() {
  const [requiredDetails, setRequiredDetails]: any = useState([{}]);

  // On first render - fetch the form data
  useEffect(() => {
    fetch(serverURL + '/patients/getRequiredDetails/1')
      .then((res) => {
        res.json().then((data) => {
          let keys = Object.keys(data[0]);
          let temp = [];
          console.log(data[0].Id);
          for (let i = 1; i < keys.length; i++) {
            if (keys[i].includes('Required')) {
              temp.push({
                [keys[i].replace('Required', '')]: data[0][keys[i]],
              });
            }
          }
          setRequiredDetails(temp);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  function setCheckedItems(
    index: number,
    key: string,
    newCheckedState: boolean,
    requiredDetails: any
  ) {
    let temp = [
      ...requiredDetails.slice(0, index),
      {[key] : newCheckedState},
      ...requiredDetails.slice(index + 1)
    ]
    console.log(temp)
    // setRequiredDetails(temp)
  }

  let checkboxes = [];
  for (let i = 0; i < requiredDetails.length; i++) {
    let key = Object.keys(requiredDetails[i])[0];
    checkboxes.push(
      <Checkbox
        key={key}
        value={key}
        isChecked={requiredDetails[i][key]}
        colorScheme="red"
        onChange={(e) =>
          setCheckedItems(
            i,
            key,
            e.target.checked,
            requiredDetails
          )
        }
      >
        {key}
      </Checkbox>
    );
  }

  return (
    <div className="patient-details_form">
      <Stack spacing={5} direction="row">
        <CheckboxGroup defaultValue={getCheckedBoxes(requiredDetails)}>
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
