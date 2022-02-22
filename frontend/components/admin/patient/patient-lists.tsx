import { Box, Spinner, useDisclosure } from "@chakra-ui/react";
import usePatientDoctorData from "@frontend/hooks/use-patient-doctor-data";
import PatientInfoSimple from "models/patient-info-simple";
import { Fragment, useState } from "react";
import PatientList from "../list";
import PatientItem from "./patient-item";
import PatientModal from "./patient-modal";

interface AppProps {
    sessionId: number;
}

const PatientLists = ({ sessionId }: AppProps) => {
    // Array with the roles to be used as keys

    const { patientInfo, unassignedPatientInfo, isError, isLoading } = usePatientDoctorData();

    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to deal with the modal visibility

    const doctorList = patientInfo?.map(item => {
        return {
            doctorId: item.doctorId,
            lastName: item.lastName,
            firstName: item.firstName,
            numberOfPatients: item.patients.length,
        };
    });

    const [patientSelected, setPatientSelected] = useState<PatientInfoSimple>({
        accountId: 0,
        firstName: "",
        lastName: "",
        patientId: 0,
        doctorId: 0,
    });

    const patientSelectedHandler = (patient: PatientInfoSimple) => {
        setPatientSelected(patient);
        onOpen();
    };
    return (
        <Fragment>
            {isLoading && <Spinner />}
            {isError && <p id="error-message"> There is an error </p>}

            {!isError && !isLoading && (
                <Box px={{ base: 0, sm: 1, md: 4, lg: 1 }} py={20}>
                    <Box
                        overflowY={{ base: "auto", md: "scroll" }}
                        overflowX={"hidden"}
                        maxHeight="70vh"
                        paddingX={4}
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                                borderRadius: "8px",
                                backgroundColor: `#D5D4D4`,
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: `#7A7777`,
                            },
                        }}>
                        {/* User List created for each role */}

                        <PatientList
                            style={{
                                py: 2,
                                m: 0,
                                alignItems: "left",
                            }}
                            key={0}
                            title="Unassigned Patients"
                            length={unassignedPatientInfo.length}>
                            {unassignedPatientInfo.map(item => (
                                <PatientItem
                                    onPatientSelect={patientSelectedHandler}
                                    key={item.accountId}
                                    patientInfoSimple={item}
                                />
                            ))}
                        </PatientList>

                        {patientInfo.map(doctor => {
                            return (
                                <PatientList
                                    style={{
                                        py: 2,
                                        m: 0,
                                        alignItems: "left",
                                    }}
                                    key={doctor.accountId}
                                    title={`${doctor.lastName}, ${doctor.firstName}`}
                                    length={doctor.patients.length}>
                                    {doctor.patients.map(item => (
                                        <PatientItem
                                            onPatientSelect={patientSelectedHandler}
                                            key={item.accountId}
                                            patientInfoSimple={item}
                                        />
                                    ))}
                                </PatientList>
                            );
                        })}
                    </Box>
                </Box>
            )}
            {isOpen && (
                <PatientModal
                    sessionId={sessionId}
                    doctorList={doctorList}
                    isOpen={isOpen}
                    onClose={onClose}
                    patientInfo={patientSelected}
                />
            )}
        </Fragment>
    );
};

export default PatientLists;
