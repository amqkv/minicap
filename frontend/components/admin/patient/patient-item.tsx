import classes from "./patient-item.module.css";
import { ListItem, Box } from "@chakra-ui/react";
import PatientInfoSimple from "models/patient-info-simple";

interface AppProps {
    patientInfoSimple: PatientInfoSimple;
}

const PatientItem = ({ patientInfoSimple }: AppProps) => {
    return (
        <ListItem paddingEnd={4} py={2}>
            <Box
                className={classes.cardShadow}
                w={"full"}
                rounded={"md"}
                paddingStart={14}
                py={3}
                display={{ md: "flex" }}>
                <p className={classes.rowFont}>
                    {patientInfoSimple.lastName}, {patientInfoSimple.firstName}
                </p>
            </Box>
        </ListItem>
    );
};

export default PatientItem;
