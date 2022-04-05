import { Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";
import { pastConditionsProps } from "@frontend/functions/create-status";

interface ChartProps {
    data: unknown[];
    w: number | undefined;
    h: number | undefined;
}

export default function Chart({ data, w, h }: ChartProps) {
    data.forEach((d: unknown) => {
        (d as pastConditionsProps).StatusTime = moment((d as pastConditionsProps).StatusTime).format("L");
    });
    return (
        <ResponsiveContainer minWidth={w} minHeight={h}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="StatusTime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temperature" stroke="#8884d8" activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Weight" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}
