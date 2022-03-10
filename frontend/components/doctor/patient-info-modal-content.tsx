import { Box, Flex, Divider, Heading, Text, Image, Button, useToast, Center } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Patient } from "@frontend/models/patient";
import { serverURL } from "@frontend/config/index";
import PatientDetailsToProvideForm from "../forms/patient-details-to-provide-form";
import PatientStatus from "./patient-status";
import LineChart from "@frontend/components/line-chart";
import { formatPatientStatusData } from "@frontend/functions/data-transform-chart";
import { useSession } from "next-auth/react";
import { BOOLEANS } from "@frontend/utils/constants";
import PatientInfoModalSwiper from "./patient-info-modal-swiper";
import { useState } from "react";
import { KeyedMutator } from "swr";

export default function PatientInfoModalContent({
    patient,
    onMutate,
    onClose,
}: {
    patient: Patient;
    onMutate: KeyedMutator<unknown>;
    onClose: () => void;
}) {
    const toast = useToast();
    const { data: session } = useSession();
    const [currentStatus, setCurrentStatus] = useState(0);
    const reviewHandler = async () => {
        await fetch("/api/status/review-status", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusId: patient.status[currentStatus].statusId,
            }),
        });

        onMutate();
    };

    const reviewAllHandler = async () => {
        await fetch("/api/status/review-status/all", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                patientId: patient.patientId,
            }),
        });
        onClose();
        onMutate();
    };
    async function modifyPriority() {
        await fetch(serverURL + "/doctors/updatePriority/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: session?.user.AccountId,
                patientId: patient.patientId,
                isPrioritized: patient.isPrioritized ? BOOLEANS.FALSE : BOOLEANS.TRUE,
            }),
        })
            .then(() => {
                toast({
                    title: "Priority modified",
                    description: "Your patient's priority has been successfully modified.",
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
                    description: "Something went wrong while trying to update the priority. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }

    return (
        <Box>
            <Flex>
                <Box flex="1.5">
                    <Image
                        src="https://images-ext-2.discordapp.net/external/pTKakmU5qrrmG0himz_tGUYOY4uXKwtSFmck1JV1Vcs/https/i.imgur.com/oJpKCRk.png"
                        alt="Patient Picture"
                        boxSize="100px"
                        width="150px"
                        mb={3}
                    />
                </Box>
                <Box pl={2} flex="3">
                    <Box fontWeight="semibold" isTruncated mx={2} mt="1">
                        <Text fontSize="xl">
                            <Flex justifyContent={"space-between"}>
                                {patient.basicInformation.firstName} {patient.basicInformation.lastName}
                                {patient.isPrioritized ? (
                                    <WarningTwoIcon mb={1} w={7} h={7} color="red.500" pr={2} />
                                ) : null}
                            </Flex>
                        </Text>
                    </Box>
                    <Box display="flex" alignItems="baseline" mx={2}>
                        <Box color={"gray.500"} fontWeight="bold" letterSpacing="wide" fontSize="sm">
                            <Text textTransform="capitalize">
                                {patient.basicInformation.gender} ({patient.basicInformation.age})
                            </Text>
                            <Text>{patient.basicInformation.dob}</Text>
                            <Text>Height: {patient.basicInformation.height} cm</Text>
                            <Button colorScheme="red" variant="outline" size="xs" my={2} onClick={modifyPriority}>
                                {patient.isPrioritized ? "Remove High Priority" : "Flag as High Priority"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Divider />
            <Box m="14px" className="section desired-details">
                <Box mb="10px" className="header">
                    <Heading size="md"> Desired Details</Heading>
                </Box>
                <Box>
                    <PatientDetailsToProvideForm
                        requiredDetails={patient.requiredDetails}
                        patientId={patient.patientId}
                    />
                </Box>
            </Box>
            <Divider />
            <Box m="14px" className="section desired-details">
                <Box mb="10px" className="header">
                    <Flex>
                        <Heading size="md" flex="3">
                            {" "}
                            Details updated{" "}
                            {patient.status[0].lastUpdated > 1
                                ? patient.status[0].lastUpdated.toFixed(0)
                                : patient.status[0].lastUpdated.toFixed(1)}{" "}
                            hr(s) ago:{" "}
                        </Heading>
                    </Flex>
                </Box>
                <PatientInfoModalSwiper
                    patient={patient}
                    setCurrentStatus={setCurrentStatus}
                    reviewHandler={reviewHandler}
                />
                <Center mt={4} mb={4}>
                    <Button backgroundColor={"#FF4545BD"} onClick={reviewAllHandler}>
                        Mark all as Reviewed
                    </Button>
                </Center>

                <Divider />
                <Center>
                    <Heading mt={6} size={"md"}>
                        Progression of Weight and Temperature{" "}
                    </Heading>
                </Center>
                <Center>
                    <Box mt={4}>
                        <LineChart data={formatPatientStatusData(patient.status)} w={550} h={300} />
                    </Box>
                </Center>
            </Box>
        </Box>
    );
}
