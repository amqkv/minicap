import { Box } from "@chakra-ui/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { BarChart, CartesianGrid, YAxis, Tooltip, Legend, Bar } from "recharts";

interface DashboardChartsProps {
    role: string | undefined;
    data?: unknown[];
}

export default function DashboardCharts({ role, data }: DashboardChartsProps) {
    if (data) {
        switch (role) {
            case USER_ROLES.patient:
                return <></>;
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
