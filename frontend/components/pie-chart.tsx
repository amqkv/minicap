import { Box, Center, Text } from "@chakra-ui/react";
import { transformSymptomsData } from "@frontend/functions/data-transform-chart";
import { PieChartLabel } from "@frontend/models/chart-data";
import { PatientStatus } from "@frontend/models/patient";
import { PieChart, Pie, Cell, Legend } from "recharts";

interface ChartProps {
    statuses: PatientStatus[];
    title: string;
    h: number;
    w: number;
    day: string;
}
const COLORS = ["#f28a8a", "#988dc7", "#fae282", "#50b3de", "#656c96", "#82ca9d", "#7c93d9"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieChartLabel) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="#525252" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function Chart({ statuses, title, h, w, day }: ChartProps) {
    const data = transformSymptomsData(statuses, day);
    return (
        <Box minW={400} minH={200}>
            {data.length ? (
                <Box>
                    <Center>
                        <Text my={2} mb={4} fontSize="lg">
                            {title}
                        </Text>
                    </Center>
                    <Center>
                        <PieChart width={w} height={h}>
                            <Legend layout="vertical" verticalAlign="top" align="right" />
                            <Pie
                                data={data}
                                isAnimationActive={false}
                                // cx="45%"
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </Center>
                </Box>
            ) : (
                <Center height={h}>
                    <Text color="#636363" fontSize="lg">
                        No data provided yet.
                    </Text>
                </Center>
            )}
        </Box>
    );
}
