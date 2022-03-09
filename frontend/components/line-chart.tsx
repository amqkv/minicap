import { Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment";
import { StatusDataProps } from "@frontend/models/patient";

interface ChartProps {
    data: StatusDataProps[];
    w: number;
    h: number;
}

export default function Chart({ data, w, h }: ChartProps) {
    data.forEach((d: StatusDataProps) => {
        d.StatusTime = moment(d.StatusTime).format("L");
    });
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