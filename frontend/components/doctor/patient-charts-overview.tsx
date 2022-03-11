import { Box, Center, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { extractStatuses, transformWeightTempData } from "@frontend/functions/data-transform-chart";
import { Patient } from "@frontend/models/patient";
import { DAY } from "@frontend/utils/constants";
import PieChart from "@frontend/components/pie-chart";
import Table from "@frontend/components/doctor/patient-overview-table";
import ScatterChart from "@frontend/components/scatter-chart";
import { CSSProperties, useState } from "react";

export default function PatientChartsOverview({ patientList }: { patientList: Patient[] }) {
    const today = new Date().toISOString().slice(0, 10);
    const datePickerStyle: CSSProperties = { border: "2px solid #e6e6e6", padding: "5px 10px", borderRadius: "10px" };
    const [pieChartDate, setPieChartDate] = useState(today);
    const [scatterChartDate, setScatterChartDate] = useState(today);

    function pickDate(date: string, chart: string) {
        if (chart === "pie") {
            setPieChartDate(date);
        }
        if (chart === "scatter") {
            setScatterChartDate(date);
        }
    }

    return (
        <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
            <Box m={10} mt={5}>
                <Table patientList={patientList} />
            </Box>
            <Box>
                <Tabs colorScheme="red">
                    <Center>
                        <TabList>
                            <Tab>Specific day</Tab>
                            <Tab>All time</Tab>
                        </TabList>
                    </Center>

                    <TabPanels>
                        <TabPanel>
                            <PieChart
                                statuses={extractStatuses(patientList)}
                                title="All patients' symptoms"
                                h={250}
                                w={500}
                                day={pieChartDate}
                            />
                            <Center height="40px">
                                <label htmlFor="SymptomDate">Date picked:&emsp;</label>
                                <input
                                    id="pieChartInput"
                                    type="date"
                                    name="SymptomDate"
                                    max={today}
                                    onChange={e => pickDate(e.target.value, "pie")}
                                    defaultValue={today}
                                    style={datePickerStyle}
                                />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <PieChart
                                statuses={extractStatuses(patientList)}
                                title="All patients' symptoms"
                                h={250}
                                w={500}
                                day={DAY.ALL}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Box>
                <Tabs colorScheme="red">
                    <Center>
                        <TabList>
                            <Tab>Specific date</Tab>
                            <Tab>All time</Tab>
                        </TabList>
                    </Center>
                    <TabPanels>
                        <TabPanel>
                            <ScatterChart
                                statuses={extractStatuses(patientList)}
                                transformDataFn={transformWeightTempData}
                                day={scatterChartDate}
                                title={"Patients' Temperature and Weight Today"}
                                h={275}
                                w={400}
                            />
                            <Center>
                                <label htmlFor="WeightTempDate">Date picked:&emsp;</label>
                                <input
                                    id="scatterChartInput"
                                    type="date"
                                    name="WeightTempDate"
                                    max={today}
                                    onChange={e => pickDate(e.target.value, "scatter")}
                                    defaultValue={today}
                                    style={datePickerStyle}
                                />
                            </Center>
                        </TabPanel>
                        <TabPanel>
                            <ScatterChart
                                statuses={extractStatuses(patientList)}
                                transformDataFn={transformWeightTempData}
                                day={DAY.ALL}
                                title={"Patients' Temperature and Weight of All Time"}
                                h={275}
                                w={400}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </SimpleGrid>
    );
}
