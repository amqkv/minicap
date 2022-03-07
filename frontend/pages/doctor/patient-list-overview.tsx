import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import PatientInfoModal from "@frontend/components/modal/modal";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientChartsOverview from "@frontend/components/doctor/patient-charts-overview";
import { serverURL } from "@frontend/config";
import { DEFAULT_PATIENT, Patient } from "@frontend/models/patient";
import {
    Box,
    Text,
    Heading,
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
    useDisclosure,
    useToast,
    Input,
    InputLeftElement,
    Button,
    InputGroup,
    Center,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    let patientList: Patient[] = [];

    try {
        if (session?.user.Role === USER_ROLES.doctor) {
            const patientListResponse: any = await fetch(serverURL + "/doctors/getPatientsInfo/" + userId);
            patientList = await patientListResponse.json();
        }
    } catch {}
    return {
        props: {
            session,
            patientList,
        },
    };
}

export default function DoctorDashboard({ patientList }: { patientList: Patient[] }) {
    const [selectedPatient, setSelectedPatient] = useState<Patient>(DEFAULT_PATIENT);
    const [filterOption, setFilterOption] = useState("none");
    const [patientListToMap, setPatientListToMap] = useState(patientList);
    const [noSearchResult, setNoSearchResult] = useState(false);
    const [noFilterResult, setNoFilterResult] = useState(false);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const highTemperaturePatientList = patientList.filter(patient => patient.status[0].temperature.value >= 38);
    // <TODO> filter patient list according to flagged patients
    const flaggedPatientList: Patient[] = patientList.filter(patient => patient.isPrioritized);
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (session?.user.Role !== USER_ROLES.doctor) {
            toast({
                title: "Access denied",
                description: "You do not have the permissions to view that page.",
                position: "top",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            router.push("/");
        }
    }, [router, session?.user.Role, toast]);

    function handleClick(selectedPatient: Patient) {
        setSelectedPatient(selectedPatient);
        onOpen();
    }

    function filterPatients(value: string) {
        setFilterOption(value);
        let filteredList: Patient[] = [];
        switch (value) {
            case "temperature":
                setPatientListToMap(highTemperaturePatientList);
                filteredList = highTemperaturePatientList;
                break;
            case "flag":
                setPatientListToMap(flaggedPatientList);
                filteredList = flaggedPatientList;
                break;
            case "none":
                setPatientListToMap(patientList);
                filteredList = patientList;
                break;
        }
        setNoFilterResult(!filteredList.length ? true : false);
    }

    function onSearch(e: any) {
        e.preventDefault();
        const searchedName: string = e.target.value;
        let listToSearch: Patient[] = [];
        switch (filterOption) {
            case "temperature":
                listToSearch = highTemperaturePatientList;
                break;
            case "flag":
                listToSearch = flaggedPatientList;
                break;
            case "none":
                listToSearch = patientList;
                break;
        }
        const searchResults = listToSearch.filter(elm =>
            `${elm.basicInformation.firstName?.toLowerCase()} ${elm.basicInformation.lastName?.toLowerCase()}`.includes(
                searchedName.toLowerCase()
            )
        );
        setPatientListToMap(searchResults);
        setNoSearchResult(!searchResults.length ? true : false);
    }
    return (
        <Box my={10}>
            <Heading size="xl" mx={10} mt={8}>
                Patients
            </Heading>
            <PatientChartsOverview patientList={patientList} />
            {/* Search bar */}
            <Box mx={10} mb={3}>
                <InputGroup>
                    <InputLeftElement size="xs">
                        <Search2Icon color={"gray.400"} />
                    </InputLeftElement>
                    <Input
                        onChange={onSearch}
                        placeholder={"Search patient name..."}
                        flex="3.9"
                        mr={2}
                        pl={10}
                        name="search"
                        borderColor={"gray.400"}
                        _placeholder={{ color: "gray.600" }}
                    />
                    <Button flex="0.1" colorScheme={"red"} minWidth={"70px"} type={"submit"}>
                        Search
                    </Button>
                </InputGroup>
            </Box>
            {/* Filter options */}
            <Box mx={10}>
                <RadioGroup my={4} onChange={e => filterPatients(e)} value={filterOption} colorScheme={"red"}>
                    <Stack direction="row">
                        <Text>
                            <b>Filter by:</b> &nbsp;
                        </Text>
                        <Radio value="none">None</Radio>
                        <Radio value="temperature">High Temperature</Radio>
                        <Radio value="flag">Flagged</Radio>
                    </Stack>
                </RadioGroup>
            </Box>

            <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
                {noSearchResult || noFilterResult ? (
                    <Center>
                        <Text fontSize="xl" color="gray.500" mt={10}>
                            No patient to show.
                        </Text>
                    </Center>
                ) : (
                    patientListToMap.map((patient: Patient) => (
                        <Box onClick={() => handleClick(patient)} key={`patient-${patient.patientId}`}>
                            <PatientInfoCard patient={patient} />
                        </Box>
                    ))
                )}
            </SimpleGrid>
            <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                <PatientInfoModalContent patient={selectedPatient} />
            </PatientInfoModal>
        </Box>
    );
}
