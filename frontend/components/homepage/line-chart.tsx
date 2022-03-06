import { Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { StatusDataProps } from "./types/types";




// TODO: fix any
export default function Chart({ data }: any) {
    data.forEach((d: StatusDataProps) => {
        d.StatusTime = moment(d.StatusTime).format('L');
    })
    data.reverse();
    return (
        <Box w={"90%"} h={"50%"}>
            <LineChart
                width={900}
                height={700}
                data={data}
                margin={{
                    top: 50,
                    right: 50,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="StatusTime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Weight" stroke="#82ca9d" />
            </LineChart>            
        </Box>
    );
}
