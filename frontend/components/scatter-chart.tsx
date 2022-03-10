import { Box, Center, Text } from "@chakra-ui/react";
import { ScatterChartData, ScatterChartDataDetails } from "@frontend/models/chart-data";
import { PatientStatus } from "@frontend/models/patient";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartProps {
    statuses: PatientStatus[];
    transformDataFn: (
        statuses: PatientStatus[],
        day: string
    ) => { data: ScatterChartData[]; details: ScatterChartDataDetails };
    day: string;
    title: string;
    h: number;
    w: number;
}

export default function Chart({ statuses, transformDataFn, day, title, h, w }: ChartProps) {
    const data = transformDataFn(statuses, day);
    return (
        <Box>
            {data.data.length ? (
                <Box>
                    <Center>
                        <Text fontSize="lg">{title}</Text>
                    </Center>
                    <Center>
                        <ScatterChart
                            width={w}
                            height={h}
                            margin={{
                                top: 25,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}>
                            <CartesianGrid />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name={data.details.nameX}
                                unit={data.details.unitX}
                                domain={data.details.domainX}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name={data.details.nameY}
                                unit={data.details.unitY}
                                domain={data.details.domainY}
                            />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter data={data.data} fill="#f28a8a" />
                        </ScatterChart>
                    </Center>
                </Box>
            ) : (
                <Center>
                    <Text color="#636363" fontSize="lg" mt={6}>
                        No data provided yet.
                    </Text>
                </Center>
            )}
        </Box>
    );
}
