import { Box, ListItem, Text } from "@chakra-ui/react";
import UserInfoSimple from "@frontend/models/user-info-simple";
import classes from "./user-row-card.module.css";

interface AppProps {
    onUserSelect: ({}: UserInfoSimple) => void;
    userInfoSimple: UserInfoSimple;
}

// TODO Generalize Card component to reuse with Doctor-Patient Admin page
const UserRowCard = ({ onUserSelect, userInfoSimple }: AppProps) => {
    const onClickHandler = () => {
        onUserSelect(userInfoSimple);
    };

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
                <p className={classes.rowFont}>
                    {userInfoSimple.LastName}, {userInfoSimple.FirstName}
                </p>
            </Box>
        </ListItem>
    );
};

export default UserRowCard;
