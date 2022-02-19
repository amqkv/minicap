import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import UserInfoSimple from "@frontend/models/user-info-simple";
import classes from "@frontend/components/admin/user-row-card.module.css";
import React, { Fragment} from "react";
import UserRowCard from "@frontend/components/admin/user-row-card";
import {mutate} from "swr";
import {BOOLEANS} from "@frontend/utils/constants";

interface appProps {
    session: Number,
    userInfoSimple: UserInfoSimple;
}

const ApproveUsersRowCard = ({ session, userInfoSimple }: appProps) => {
    const userSelectedHandler = async () => {
        // handle edit
        //console.log("click");
        await fetch("/api/admin/confirm-user-account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: session,
                userId: userInfoSimple.AccountId,
                ConfirmedFlag: BOOLEANS.TRUE
            }),
        }).catch(err => {
            console.log("Error confirming user: ", err);
        });
        // Call for other fetches with SWR to revalidate the data using this route
        mutate("/api/users/pending");

    };
    const content = 
    <Fragment>
        <SimpleGrid>
            <Box>
                <p className={classes.rowFont} style={{display:"flex"}}>
                    {userInfoSimple.LastName} , {userInfoSimple.FirstName}
                </p>
            </Box>
            <Box>
                <p style={{display:"flex"}}>
                    Desired Role: {userInfoSimple.Role}
                </p>
            </Box>
        </SimpleGrid>
        <Button colorScheme="green" mt={1} style={{display: "flex", marginLeft: "auto", alignSelf: "center"}}>Approve</Button>
    </Fragment>
    return <UserRowCard onUserSelect={userSelectedHandler} userInfoSimple={userInfoSimple} content={content}/>;
};

export default ApproveUsersRowCard;
