import { Box } from "@chakra-ui/react";
import { ScatterChartData, ScatterChartDataDetails } from "@frontend/models/chart-data";
import { PatientStatus } from "@frontend/models/patient";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartProps {
    statuses: PatientStatus[];
    transformDataFn: (statuses: PatientStatus[]) => { data: ScatterChartData[]; details: ScatterChartDataDetails };
}

export default function Chart({ statuses, transformDataFn }: ChartProps) {
    const data = transformDataFn(statuses);
    return (
        <Box>
            <ScatterChart
                width={400}
                height={400}
                margin={{
                    top: 20,
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
        </Box>
    );
}
