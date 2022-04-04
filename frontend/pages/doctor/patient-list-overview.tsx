import PatientInfoModal from "@frontend/components/modal/modal";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import PatientChartsOverview from "@frontend/components/doctor/patient-charts-overview";
import { serverURL } from "@frontend/config";
import { DEFAULT_PATIENT, FILTER_OPTIONS, Patient } from "@frontend/models/patient";
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
    Spinner,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";
import usePatientInfo from "@frontend/hooks/use-patient-info";
import PatientList from "@frontend/components/doctor/patient-list";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    let patientList: Patient[] = [];

    try {
        if (session?.user.Role === USER_ROLES.doctor) {
            const patientListResponse: any = await fetch(serverURL + "/doctors/get-patients-info/" + userId);
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

export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState<Patient>(DEFAULT_PATIENT);
    const [filterOption, setFilterOption] = useState("none");
    const [searchTerm, setSearchTerm] = useState("");
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const {
        patientList,
        highTemperaturePatientList,
        flaggedPatientList,
        reviewedPatientList,
        unreviewedPatientList,
        mutate,
        isLoading,
        isError,
    } = usePatientInfo(session?.user.AccountId);

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

    function filterPatients(value: string) {
        setFilterOption(value);
    }

    function onSearch(e: any) {
        e.preventDefault();
        const searchedName: string = e.target.value;
        setSearchTerm(searchedName);
    }
    return (
        <>
            {isLoading && <Spinner />}
            {isError && <p> There is an error loading the data</p>}
            {!!patientList && (
                <>
                    <Box my={10}>
                        <Heading size="xl" m={10} my={8}>
                            Patients
                        </Heading>
                        <Box minHeight="415px">
                            <PatientChartsOverview patientList={patientList} />
                        </Box>
                        <Box mx={10} mb={3}>
                            <InputGroup>
                                <InputLeftElement size="xs">
                                    <Search2Icon color={"gray.400"} />
                                </InputLeftElement>
                                <Input
                                    onChange={onSearch}
                                    value={searchTerm}
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
                        <Box mx={10}>
                            <RadioGroup
                                my={4}
                                onChange={e => filterPatients(e)}
                                value={filterOption}
                                colorScheme={"red"}>
                                <Stack direction={["column", "column", "row", "row"]}>
                                    <Text>
                                        <b>Filter by:</b> &nbsp;
                                    </Text>
                                    <Radio value={FILTER_OPTIONS.NONE}>None</Radio>
                                    <Radio value={FILTER_OPTIONS.TEMPERATURE}>High Temperature</Radio>
                                    <Radio value={FILTER_OPTIONS.FLAG}>Flagged</Radio>
                                    <Radio value={FILTER_OPTIONS.REVIEWED}>Reviewed</Radio>
                                    <Radio value={FILTER_OPTIONS.UNREVIEWED}>Unreviewed</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>

                        <SimpleGrid templateColumns={"repeat(auto-fit, minmax(370px, 1fr))"} columnGap={5} rowGap={5}>
                            {/* Changed the way list are shown, otherwise these lists don't update on changes */}
                            {filterOption === FILTER_OPTIONS.NONE && (
                                <PatientList
                                    patientList={patientList}
                                    searchTerm={searchTerm}
                                    setSelectedPatient={setSelectedPatient}
                                    onOpen={onOpen}
                                />
                            )}
                            {filterOption === FILTER_OPTIONS.TEMPERATURE && (
                                <PatientList
                                    patientList={highTemperaturePatientList}
                                    searchTerm={searchTerm}
                                    setSelectedPatient={setSelectedPatient}
                                    onOpen={onOpen}
                                />
                            )}
                            {filterOption === FILTER_OPTIONS.FLAG && (
                                <PatientList
                                    patientList={flaggedPatientList}
                                    searchTerm={searchTerm}
                                    setSelectedPatient={setSelectedPatient}
                                    onOpen={onOpen}
                                />
                            )}
                            {filterOption === FILTER_OPTIONS.REVIEWED && (
                                <PatientList
                                    patientList={reviewedPatientList}
                                    searchTerm={searchTerm}
                                    setSelectedPatient={setSelectedPatient}
                                    onOpen={onOpen}
                                />
                            )}
                            {filterOption === FILTER_OPTIONS.UNREVIEWED && (
                                <PatientList
                                    patientList={unreviewedPatientList}
                                    searchTerm={searchTerm}
                                    setSelectedPatient={setSelectedPatient}
                                    onOpen={onOpen}
                                />
                            )}
                        </SimpleGrid>
                    </Box>
                </>
            )}
            <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                <PatientInfoModalContent patient={selectedPatient} onMutate={mutate} onClose={onClose} />
            </PatientInfoModal>
        </>
    );
}
