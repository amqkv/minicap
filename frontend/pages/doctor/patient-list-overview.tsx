import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import PatientInfoModal from "@frontend/components/modal";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
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
    Spinner,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";
import usePatientInfo from "@frontend/hooks/use-patient-info";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    let patientList: Patient[] = [];

    try {
        if (session?.user.Role === USER_ROLES.doctor) {
            const patientListResponse: any = await fetch(serverURL + "/doctors/get-patients-info/" + userId);
            patientList = await patientListResponse.json();
            console.log(session.user);
            console.log(patientList[0].status);
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
    const flaggedPatientList: Patient[] = [];
    const { data: session } = useSession();
    const router = useRouter();
    const toast = useToast();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const {
        patientList,
        highTemperaturePatientList,
        reviewedPatientList,
        unreviewedPatientList,
        mutate,
        isLoading,
        isError,
    } = usePatientInfo(session?.user.AccountId);

    const [selectedPatient, setSelectedPatient] = useState<Patient>(DEFAULT_PATIENT);
    const [filterOption, setFilterOption] = useState("none");

    // <TODO> filter patient list according to flagged patients

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
    }

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <p> There is an error loading the data</p>}
            {!!patientList && (
                <Box my={10}>
                    <Heading size="xl" m={10} my={8}>
                        Patients
                    </Heading>
                    <Box mx={10}>
                        <RadioGroup my={4} onChange={e => filterPatients(e)} value={filterOption} colorScheme={"red"}>
                            <Stack direction="row">
                                <Text>
                                    <b>Filter by:</b> &nbsp;
                                </Text>
                                <Radio value="none">None</Radio>
                                <Radio value="temperature">High Temperature</Radio>
                                <Radio value="flag">Flagged</Radio>
                                <Radio value="true">Reviewed</Radio>
                                <Radio value="false">Unreviewed</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>

                    <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
                        {/* Changed the way list are shown, otherwise these lists don't update on changes */}
                        {filterOption === "none" &&
                            patientList?.map((patient: Patient) => (
                                <PatientInfoCard
                                    patient={patient}
                                    clickHandler={() => handleClick(patient)}
                                    key={`patient-${patient.patientId}`}
                                />
                            ))}
                        {filterOption === "temperature" &&
                            highTemperaturePatientList?.map((patient: Patient) => (
                                <PatientInfoCard
                                    patient={patient}
                                    clickHandler={() => handleClick(patient)}
                                    key={`patient-${patient.patientId}`}
                                />
                            ))}
                        {filterOption === "flag" &&
                            flaggedPatientList?.map((patient: Patient) => (
                                <PatientInfoCard
                                    patient={patient}
                                    clickHandler={() => handleClick(patient)}
                                    key={`patient-${patient.patientId}`}
                                />
                            ))}
                        {filterOption === "true" &&
                            reviewedPatientList?.map((patient: Patient) => (
                                <PatientInfoCard
                                    patient={patient}
                                    clickHandler={() => handleClick(patient)}
                                    key={`patient-${patient.patientId}`}
                                />
                            ))}
                        {filterOption === "false" &&
                            unreviewedPatientList?.map((patient: Patient) => (
                                <PatientInfoCard
                                    patient={patient}
                                    clickHandler={() => handleClick(patient)}
                                    key={`patient-${patient.patientId}`}
                                />
                            ))}
                    </SimpleGrid>

                    <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                        <PatientInfoModalContent patient={selectedPatient} onMutate={mutate} onClose={onClose} />
                    </PatientInfoModal>
                </Box>
            )}
        </>
    );
}
