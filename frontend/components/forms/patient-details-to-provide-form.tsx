import { Checkbox, Stack, Button, CheckboxGroup, Flex, Box } from "@chakra-ui/react";
import serverURL from "@frontend/config/index";

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
    let patientId = 3;

    fetch(serverURL + "/patients/" + patientId + "/updateRequiredDetails/", {
        method: "POST",
        body: JSON.stringify(requiredDetails),
        headers: { "Content-Type": "application/json" },
    }).catch(err => console.log(err));
}

export default function PatientDetailsToProvideForm({ requiredDetails }: any) {
    function setCheckedItems(index: number, key: string, newCheckedState: boolean) {
        let temp = [
            ...requiredDetails.slice(0, index),
            { [key]: newCheckedState },
            ...requiredDetails.slice(index + 1),
        ];
        requiredDetails = temp;
    }

    return (
        <Box>
            <Stack spacing={5} direction="row">
                <CheckboxGroup defaultValue={getCheckedBoxes(requiredDetails)}>
                    {requiredDetails.map((requiredDetail: any, index: number) => {
                        let key = Object.keys(requiredDetail);
                        return (
                            <Checkbox
                                key={key[0]}
                                value={key[0]}
                                isChecked={requiredDetail[key[0]]}
                                colorScheme="red"
                                onChange={e => setCheckedItems(index, key[0], e.target.checked)}>
                                {key[0]}
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
            </Stack>
            <Flex justify="flex-end">
                <Button colorScheme="red" onClick={() => onSave(requiredDetails)}>
                    Save
                </Button>
            </Flex>
        </Box>
    );
}
