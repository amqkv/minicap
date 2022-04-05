import { Checkbox, Stack, Button, CheckboxGroup, Flex, Box, useToast } from "@chakra-ui/react";
import { serverURL } from "@frontend/config/index";
import { RequiredDetails } from "@frontend/models/patient";
import { ChangeEvent } from "react";

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
    const toast = useToast();
    async function onSave() {
        fetch(serverURL + "/doctors/updateRequiredDetails/", {
            method: "PATCH",
            body: JSON.stringify({ ...requiredDetails, patientId: patientId }),
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                toast({
                    title: "Details updated!",
                    description: "Your patient's details to provide have been successfully updated.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Error!",
                    description: "Something went wrong while trying to update details. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    function setCheckedItems(e: ChangeEvent<HTMLInputElement>) {
        const temp = { ...requiredDetails, [e.target.value]: e.target.checked };
        requiredDetails = temp;
    }

    return (
        <Box>
            <Stack spacing={5} direction="row">
                <CheckboxGroup defaultValue={getCheckedBoxes(requiredDetails)}>
                    {Object.entries(requiredDetails).map(requiredDetail => {
                        const detailName = requiredDetail[0];
                        return (
                            <Checkbox
                                key={detailName}
                                value={detailName}
                                isChecked={requiredDetail[1]}
                                onChange={e => setCheckedItems(e)}
                                colorScheme="red">
                                {detailName.substring(0, 1).toUpperCase() + detailName.slice(1)}
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
            </Stack>
            <Flex justify="flex-end">
                <Button colorScheme="red" onClick={onSave} mt={3} px={2}>
                    Save
                </Button>
            </Flex>
        </Box>
    );
}
