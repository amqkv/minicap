import { Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment";
import { pastConditionsProps } from "@frontend/functions/create-status";

interface ChartProps {
    data: unknown[];
    w: number;
    h: number;
}

export default function Chart({ data, w, h }: ChartProps) {
    data.forEach((d: unknown) => {
        (d as pastConditionsProps).StatusTime = moment((d as pastConditionsProps).StatusTime).format('L');
    })
    return (
        <Box w={w} h={h}>
            <LineChart width={w} height={h} data={data}>
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
