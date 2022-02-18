import { Button } from "@chakra-ui/react";
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
        });
        // Call for other fetches with SWR to revalidate the data using this route
        mutate("/api/users/pending");

    };
    const content = 
    <Fragment>
        <p className={classes.rowFont}>
            {userInfoSimple.LastName} , {userInfoSimple.FirstName}
        </p>
        <Button colorScheme="green" style={{display: 'flex', marginLeft: 'auto'}}>Confirm</Button>
    </Fragment>
    return <UserRowCard onUserSelect={userSelectedHandler} userInfoSimple={userInfoSimple} content={content}/>;
};

export default ApproveUsersRowCard;
