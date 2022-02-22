import classes from "./patient-item.module.css";
import { ListItem, Box } from "@chakra-ui/react";
import { ReactFragment } from "react";
import PatientInfoSimple from "models/patient-info-simple";

interface AppProps {
    onPatientSelect: ({}: PatientInfoSimple) => void;
    patientInfoSimple: PatientInfoSimple;
    content?: ReactFragment;
}

const PatientItem = ({ onPatientSelect, patientInfoSimple, content = "" }: AppProps) => {
    const onClickHandler = () => {
        onPatientSelect(patientInfoSimple);
    };
    if (content === "") {
        // default
        content = (
            <p className={classes.rowFont}>
                {patientInfoSimple.lastName}, {patientInfoSimple.firstName}
            </p>
        );
    }
    return (
        <ListItem paddingEnd={4} py={2}>
            <Box
                className={classes.cardShadow}
                w={"full"}
                rounded={"md"}
                paddingStart={14}
                py={3}
                display={{ md: "flex" }}
                onClick={onClickHandler}>
                {content}
            </Box>
        </ListItem>
    );
};

export default PatientItem;
