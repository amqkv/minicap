import { Checkbox, Stack, Button, CheckboxGroup, Flex, Box } from "@chakra-ui/react";
import { serverURL } from "@frontend/config/index";
import { RequiredDetails } from "@frontend/models/patient";

interface AppProps {
    requiredDetails: RequiredDetails;
    patientId: number;
}

function getCheckedBoxes(requiredDetails: RequiredDetails) {
    let detailName = [];
    const filtered = Object.entries(requiredDetails).filter(detail => detail[1]);
    detailName = Object.keys(Object.fromEntries(filtered));
    return detailName;
}

export default function PatientDetailsToProvideForm({ requiredDetails, patientId }: AppProps) {
    async function onSave() {
        fetch(serverURL + "/patients/" + patientId + "/updateRequiredDetails/", {
            method: "PATCH",
            body: JSON.stringify(requiredDetails),
            headers: { "Content-Type": "application/json" },
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function setCheckedItems(newCheckedState: boolean, key: string) {
        let temp = { ...requiredDetails, [key]: newCheckedState };
        requiredDetails = temp;
    }

    return (
        <Box>
            <Stack spacing={5} direction="row">
                <CheckboxGroup defaultValue={getCheckedBoxes(requiredDetails)}>
                    {Object.entries(requiredDetails).map(requiredDetail => {
                        let detailName = requiredDetail[0];
                        return (
                            <Checkbox
                                key={detailName}
                                value={detailName}
                                isChecked={requiredDetail[1]}
                                onChange={e => setCheckedItems(e.target.checked, detailName)}
                                colorScheme="red">
                                {detailName.substring(0, 1).toUpperCase() + detailName.slice(1)}
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
            </Stack>
            <Flex justify="flex-end">
                <Button colorScheme="red" onClick={onSave} mt={3}>
                    Save
                </Button>
            </Flex>
        </Box>
    );
}
