import { Box } from "@chakra-ui/react";
import PatientInfoSimple from "models/patient-info-simple";
import PatientList from "../list";
import PatientItem from "./patient-item";

const DUMMY_ARRAY: { [key: string]: PatientInfoSimple[] } = {};

for (let i = 0; i < 5; i++) {
    const patientArray: PatientInfoSimple[] = [];
    for (let j = 0; j < 6; j++) {
        const patient: PatientInfoSimple = {
            accountId: i * 5 + j,
            firstName: `First ${i * 5 + j} `,
            lastName: `Last ${i}`,
            doctorId: i,
            doctorFirstName: `First Doc ${i * 5 + j} `,
            doctorLastName: `McDoc ${i}`,
        };
        patientArray.push(patient);
    }
    DUMMY_ARRAY[`Doc${i}`] = patientArray;
}

const PatientLists = () => {
    // Array with the roles to be used as keys
    let keys: string[] = [];
    keys = Object.keys(DUMMY_ARRAY);

    return (
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
                {keys.map(key => {
                    return (
                        <PatientList
                            style={{
                                py: 2,
                                m: 0,
                                alignItems: "left",
                            }}
                            key={key}
                            title={key}
                            length={DUMMY_ARRAY[key].length}>
                            {DUMMY_ARRAY[key].map((item: PatientInfoSimple) => (
                                <PatientItem key={item.accountId} patientInfoSimple={item} />
                            ))}
                        </PatientList>
                    );
                })}
            </Box>
        </Box>
    );
};

export default PatientLists;
