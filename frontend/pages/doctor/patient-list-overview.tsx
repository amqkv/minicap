import { Box, Heading, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { serverURL } from "@frontend/config";
import { DEFAULT_PATIENT, Patient } from "@frontend/models/patient";
import PatientInfoModal from "@frontend/components/modal";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PatientInfoModalContent from "@frontend/components/doctor/patient-info-modal-content";
import { USER_ROLES } from "@frontend/utils/constants";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    let patientList: any = [];

    try {
        if (session?.user.Role === USER_ROLES.doctor) {
            const patientListResponse: any = await fetch(serverURL + "/doctors/getPatientsInfo/" + userId);
            patientList = await patientListResponse.json();
        } else {
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
    const { onOpen, isOpen, onClose } = useDisclosure();
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

    return (
        <Box my={10}>
            <Heading size="xl" m={10} my={8}>
                Patients
            </Heading>
            <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
                {patientList.map((patient: Patient) => (
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
