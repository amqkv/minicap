import List from "@frontend/components/admin/list";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import {
    Flex,
    Text,
    Box,
    Input,
    useDisclosure,
    Heading,
    Divider,
    Image,
    Select,
    useToast,
    Button,
} from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { useEffect, useState } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal";
import { successfulToast, unsuccessfulToast } from "@frontend/utils/popups";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { filter } from "@frontend/functions/sorting-filtering";
import { MAIN_COLOR } from "@frontend/utils/constants";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/immigration-officer/findUsersStatus");
    const patients: PatientBasicInformation[] = await response.json();
    const session = await getSession(context);

    return {
        props: {
            patients,
            session,
        },
    };
}

const CovidPatients = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const [searchText, setSearchText] = useState("");
    const [filteredPatients, setFilteredPatients] = useState(patients);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPatient, setSelectedPatient] = useState<PatientBasicInformation | null>(null);
    const [alphabeticalSort, setAlphabeticalSort] = useState(true);
    const [positivesOnly, setPositivesOnly] = useState(false);
    const [negativesOnly, setNegativesOnly] = useState(false);
    const toast = useToast();
    const toastId = "covid";
    const buttonProps = {
        variant: "outline",
        size: "lg",
    };
    useEffect(() => {
        setFilteredPatients(filter({ searchText, arr: patients, alphabeticalSort, positivesOnly, negativesOnly }));
    }, [searchText, alphabeticalSort, positivesOnly, negativesOnly]);

    // to make sure the filters functions properly
    // if the positive button is activated, then the negative button should disable, vice-versa
    function positiveNegativeFilter(clickedButton: boolean) {
        if (clickedButton) {
            setPositivesOnly(!positivesOnly);
            setNegativesOnly(false);
        } else {
            setPositivesOnly(false);
            setNegativesOnly(!negativesOnly);
        }
    }

    function openModal(patient: PatientBasicInformation) {
        onOpen();
        setSelectedPatient(patient);
    }

    function modalClose() {
        onClose();
        toast.close(toastId);
    }

    async function changeStatus() {
        const { hasCovid, firstName, lastName, id } = selectedPatient || {};
        const covidChange = !hasCovid;
        const { ok } = await fetch(serverURL + "/health-official/updatePatientStatus", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                covidChange,
                id,
            }),
        });

        if (ok) {
            setSelectedPatient({ ...selectedPatient, hasCovid: covidChange });
            patients.map(patient => {
                if (id === patient.id) patient.hasCovid = covidChange;
            });
        }
        const toastParameters = ok
            ? successfulToast({ firstName, lastName, covidChange })
            : unsuccessfulToast({ firstName, lastName, covidChange });

        toast.isActive(toastId) ? toast.update(toastId, toastParameters) : toast({ id: toastId, ...toastParameters });
    }

    if (session?.user.Role === USER_ROLES.hOfficial) {
        return (
            <Box padding={{ base: " 5% 0%", md: "0 15%" }}>
                {/* rendering the page title */}
                <Heading paddingBottom="15px">Covid Patients List </Heading>

                {/* rendering the search bar */}
                <Flex
                    paddingBottom={{ base: "5px", md: "40px" }}
                    // justifyContent={"space-between"}
                    alignItems="center"
                    margin="auto"
                    flexDirection={{ base: "column", md: "row" }}>
                    <Box marginRight={{ base: "0px", md: "20px" }} flex="1">
                        <Input
                            placeholder={"Enter name or email"}
                            marginBottom="20px"
                            width="100%"
                            size="lg"
                            isInvalid
                            errorBorderColor="gray.400"
                            value={searchText}
                            onChange={event => setSearchText(event.target.value)}
                        />
                        <Flex justifyContent="space-around">
                            <Button
                                {...buttonProps}
                                onClick={() => positiveNegativeFilter(true)}
                                background={positivesOnly ? MAIN_COLOR : "white"}>
                                Positive <Circle color="red" diameter={24} style={{ marginLeft: "10px" }} />
                            </Button>
                            <Button
                                {...buttonProps}
                                onClick={() => positiveNegativeFilter(false)}
                                background={negativesOnly ? MAIN_COLOR : "white"}>
                                Negative <Circle color="green" diameter={24} style={{ marginLeft: "10px" }} />
                            </Button>
                            <Button {...buttonProps} onClick={() => setAlphabeticalSort(!alphabeticalSort)}>
                                Alphabetical
                                {alphabeticalSort ? (
                                    <ArrowUpIcon marginLeft="10px" />
                                ) : (
                                    <ArrowDownIcon marginLeft="10px" />
                                )}
                            </Button>
                        </Flex>
                    </Box>
                    {/* rendering the legend component */}
                    <Legend />
                </Flex>
                <Box margin="auto">
                    <List>
                        {filteredPatients.map((patient: PatientBasicInformation) => (
                            <Flex
                                key={patient.id}
                                background="#fcfcfc"
                                borderRadius="5px"
                                boxShadow="2px 2px 15px 0.5px #8f8f8f26"
                                padding="14px"
                                alignItems="center"
                                justifyContent="space-evenly"
                                onClick={() => openModal(patient)}>
                                {/* getting info from backend */}
                                <Text fontSize="2xl" flex={3}>
                                    {patient.firstName} {patient.lastName}
                                </Text>
                                <Box flex={3} />
                                {/* change the color so that it matches the patient state from the database */}
                                <Circle color={patient.hasCovid ? "red" : "green"} diameter={24} />
                            </Flex>
                        ))}
                    </List>
                </Box>

                <Modal isOpen={isOpen} onClose={modalClose}>
                    <Box>
                        <Flex alignItems="center">
                            <Image
                                src="https://i.imgur.com/oJpKCRk.png"
                                alt="Red Person Image"
                                width="20%"
                                marginRight="5%"
                            />
                            <Box>
                                <Heading>
                                    {selectedPatient?.firstName} {selectedPatient?.lastName}
                                </Heading>
                                <Text fontSize="md">Gender: {selectedPatient?.gender}</Text>
                                <Text fontSize="md">Date of birth: {selectedPatient?.dob}</Text>
                                {/* <Text fontSize="md">Admitted on: TODO</Text> */}
                            </Box>
                        </Flex>
                    </Box>
                    <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
                    <Box padding={"5px 0"}>
                        <Heading as="h4" size="md" paddingBottom="5px">
                            More Information:
                        </Heading>
                        <Text fontSize="md" p="5px 0">
                            Address: {selectedPatient?.address} {", "}
                            {selectedPatient?.city} {selectedPatient?.postalCode}
                        </Text>
                        <Text fontSize="md" p="5px 0">
                            Email: {selectedPatient?.email}
                        </Text>
                        <Text fontSize="md" p="5px 0">
                            Telephone: {selectedPatient?.phoneNumber}
                        </Text>
                    </Box>
                    <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
                    <Flex padding={"10px 0"} justifyContent="center">
                        <Text fontSize="md" p="5px 0" flex="1">
                            Current Covid Status:
                        </Text>
                        <Select
                            size="sm"
                            flex="1"
                            value={selectedPatient?.hasCovid as any}
                            icon={<Circle color={selectedPatient?.hasCovid ? "red" : "green"} diameter={24} />}
                            onChange={changeStatus}>
                            <option value={true as any}>Positive</option>
                            <option value={false as any}>Negative</option>
                        </Select>
                    </Flex>
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default CovidPatients;
