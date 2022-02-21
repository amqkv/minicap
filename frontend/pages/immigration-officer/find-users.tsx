import List from "@frontend/components/admin/list";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box, Input, useDisclosure, Button, Heading, Divider, Image } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { useEffect, useState } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/immigration-officer/findUsersStatus");
    const patients: PatientBasicInformation[] = await response.json();
    const session = await getSession(context);
    console.log(session);

    return {
        props: {
            patients,
            session,
        },
    };
}

function filterByText({ searchText, arr }: { searchText: string; arr: PatientBasicInformation[] }) {
    const lowerCaseSearchtext = searchText.toLowerCase();
    let filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (
            arr[i].firstName?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].lastName?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].email?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].phoneNumber?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].address?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].postalCode?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].city?.toLowerCase().includes(lowerCaseSearchtext)
        ) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
}

const UserListPage = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const [searchText, setSearchText] = useState("");
    const [filteredPatients, setFilteredPatients] = useState(patients);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPatient, setSelectedPatient] = useState<PatientBasicInformation | null>(null);

    useEffect(() => {
        setFilteredPatients(filterByText({ searchText, arr: patients }));
    }, [searchText]);

    function openModal(patient: PatientBasicInformation) {
        onOpen();
        setSelectedPatient(patient);
    }

    if (session?.user.Role === USER_ROLES.iOfficer) {
        return (
            <Box padding={{ base: " 5% 0%", md: "0 15%" }}>
                {/* rendering the search bar */}
                <Flex
                    width="90%"
                    paddingBottom={{ base: "5px", md: "40px" }}
                    justifyContent={"space-between"}
                    alignItems="center"
                    margin="auto"
                    flexDirection={{ base: "column", md: "row" }}>
                    <Input
                        placeholder={"Enter name or email"}
                        marginRight={{ base: "0px", md: "20px" }}
                        marginBottom={{ base: "10px", md: "0" }}
                        width="100%"
                        size="lg"
                        isInvalid
                        errorBorderColor="gray.400"
                        value={searchText}
                        onChange={event => setSearchText(event.target.value)}
                    />
                    {/* rendering the legend component */}
                    <Legend />
                </Flex>
                <Box width="90%" margin="auto">
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

                <Modal isOpen={isOpen} onClose={onClose}>
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
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default UserListPage;
