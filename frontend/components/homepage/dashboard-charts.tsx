import { Box, Flex, Heading, ListItem, UnorderedList, useBreakpointValue } from "@chakra-ui/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { BarChart, CartesianGrid, YAxis, Tooltip, Legend, Bar } from "recharts";
import Chart from "@frontend/components/line-chart";
interface DashboardChartsProps {
    role: string | undefined;
    data?: unknown[];
}

export default function DashboardCharts({ role, data }: DashboardChartsProps) {
    const size = useBreakpointValue({ base: 300, md: 700 })

    if (data) {

        switch (role) {
            case USER_ROLES.patient:
                return (
                        <Box flex="0.5" margin={"10px 10px 0px 50px"} w={{ sm: "50%", base: "60%" }}>
                            <Heading size={"lg"}>Your Status Chart:</Heading>
                            <Chart data={data} w={size} h={size} />
                        </Box>
                );
            case USER_ROLES.admin:
                return <></>;
            case USER_ROLES.doctor:
                return <></>;
            case USER_ROLES.hOfficial:
                return <></>;
            case USER_ROLES.iOfficer:
                return (
                    <Box margin="50px 0">
                        <BarChart
                            width={300}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="COVID Positive Patients" fill="red" barSize={50} />
                            <Bar dataKey="COVID Negative Patients" fill="green" barSize={50} />
                        </BarChart>
                    </Box>
                );
            default:
                return <></>;
        }
    }
    return <></>;
}
