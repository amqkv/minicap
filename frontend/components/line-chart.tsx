import { Box } from "@chakra-ui/react";
import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { serverURL } from "@frontend/config/index";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

const data = [
    {
        name: "Page A",
        temperature: 4000,
        weight: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        temperature: 3000,
        weight: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        temperature: 2000,
        weight: 9800,
    },
];

// can i just import getServerSideProps from patient-symptoms-daily pages
export async function getDate(context: NextPageContext) {
    let data = [];
    let session = await getSession(context);
    let userId = session?.user.AccountId;

    if (session?.user.Role === USER_ROLES.patient) {
        try {
            let response = await fetch(serverURL + "/status/getAllStatus/" + userId);
            data = await response.json();
        } catch {
            console.log("There was an error. Try again");
        }
    }
    return data;
}

export default function ChartFormat() {
    return (
        <Box width="50%" height="50%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
            </LineChart>
        </Box>
    );
}
