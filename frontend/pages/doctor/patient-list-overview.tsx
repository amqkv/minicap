import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import PatientInfoModal from "@frontend/components/modal";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import { serverURL } from "@frontend/config";
import { DEFAULT_PATIENT, Patient } from "@frontend/models/patient";
import { Box, Text, Heading, Radio, RadioGroup, SimpleGrid, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";

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
    const { onOpen, isOpen, onClose } = useDisclosure();
    const highTemperaturePatientList = patientList.filter(patient => patient.status[0].temperature.value >= 38);
    // <TODO> filter patient list according to flagged patients
    const flaggedPatientList: Patient[] = [];
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
    }, [router, session?.user.Role]);

    function handleClick(selectedPatient: Patient) {
        setSelectedPatient(selectedPatient);
        onOpen();
    }

    function filterPatients(value: string) {
        setFilterOption(value);
        switch (value) {
            case "temperature":
                setPatientListToMap(highTemperaturePatientList);
                break;
            case "flag":
                setPatientListToMap(flaggedPatientList);
                break;
            case "none":
                setPatientListToMap(patientList);
                break;
        }
    }

    return (
        <Box my={10}>
            <Heading size="xl" mx={10} mt={8}>
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
                    </Stack>
                </RadioGroup>
            </Box>

            <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
                {patientListToMap.map((patient: Patient) => (
                    <Box onClick={() => handleClick(patient)} key={`patient-${patient.patientId}`}>
                        <PatientInfoCard patient={patient} />
                    </Box>
                ))}
            </SimpleGrid>
            <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                <PatientInfoModalContent patient={selectedPatient} />
            </PatientInfoModal>
        </Box>
    );
}
