import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import UserInfoSimple from "@frontend/models/user-info-simple";
import classes from "@frontend/components/admin/user-row-card.module.css";
import React, { Fragment } from "react";
import UserRowCard from "@frontend/components/admin/user-row-card";
import { mutate } from "swr";
import { BOOLEANS } from "@frontend/utils/constants";

interface appProps {
    session: number;
    userInfoSimple: UserInfoSimple;
}

const ApproveUsersRowCard = ({ session, userInfoSimple }: appProps) => {
    const userConfirmHandler = async () => {
        // handle confirm
        await fetch("/api/admin/confirm-user-account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: session,
                userId: userInfoSimple.AccountId,
                ConfirmedFlag: BOOLEANS.TRUE,
            }),
        });
        // Call for other fetches with SWR to revalidate the data using this route
        mutate("/api/users/pending");
    };
    const userRejectHandler = async () => {
        // handle reject
        await fetch("/api/admin/reject-user-account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: session,
                userId: userInfoSimple.AccountId,
                rejectedFlag: BOOLEANS.TRUE,
            }),
        });
        // Call for other fetches with SWR to revalidate the data using this route
        mutate("/api/users/pending");
    };
    const content = (
        <Fragment>
            <SimpleGrid>
                <Box>
                    <p className={classes.rowFont} style={{ display: "flex" }}>
                        {userInfoSimple.LastName} , {userInfoSimple.FirstName}
                    </p>
                </Box>
                <Box>
                    <p style={{ display: "flex" }}>Desired Role: {userInfoSimple.Role}</p>
                </Box>
            </SimpleGrid>
            <Button
                id={"reject-user-button"}
                colorScheme="red"
                mt={1}
                style={{ display: "flex", marginLeft: "auto", alignSelf: "center" }}
                onClick={userRejectHandler}>
                Reject
            </Button>
            <Button
                id={"confirm-user-button"}
                colorScheme="green"
                mt={1}
                style={{ display: "flex", marginLeft: "2px", alignSelf: "center" }}
                onClick={userConfirmHandler}>
                Approve
            </Button>
        </Fragment>
    );
    return <UserRowCard userInfoSimple={userInfoSimple} content={content} />;
};

export default ApproveUsersRowCard;
