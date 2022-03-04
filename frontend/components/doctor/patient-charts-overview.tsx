import { Box, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { extractStatuses, transformWeightTempData } from "@frontend/functions/data-transform-chart";
import { Patient } from "@frontend/models/patient";
import { DAY } from "@frontend/utils/constants";
import PieChart from "@frontend/components/pie-chart";
import ScatterChart from "@frontend/components/scatter-chart";

export default function PatientChartsOverview({ patientList }: { patientList: Patient[] }) {
    return (
        <Flex>
            <Box flex="2">
                <Tabs colorScheme="red">
                    <Center>
                        <TabList>
                            <Tab>Today</Tab>
                            <Tab>Yesterday</Tab>
                            <Tab>All time</Tab>
                        </TabList>
                    </Center>
                    <TabPanels>
                        <TabPanel>
                            <PieChart
                                statuses={extractStatuses(patientList)}
                                title="All patients' symptoms"
                                h={400}
                                w={450}
                                day={DAY.TODAY}
                            />
                        </TabPanel>
                        <TabPanel>
                            <PieChart
                                statuses={extractStatuses(patientList)}
                                title="All patients' symptoms"
                                h={400}
                                w={450}
                                day={DAY.YESTERDAY}
                            />
                        </TabPanel>
                        <TabPanel>
                            <PieChart
                                statuses={extractStatuses(patientList)}
                                title="All patients' symptoms"
                                h={400}
                                w={450}
                                day={DAY.ALL}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Box flex="2">
                <Tabs colorScheme="red">
                    <Center>
                        <TabList>
                            <Tab>Today</Tab>
                            <Tab>Yesterday</Tab>
                            <Tab>All time</Tab>
                        </TabList>
                    </Center>
                    <TabPanels>
                        <TabPanel>
                            <ScatterChart
                                statuses={extractStatuses(patientList)}
                                transformDataFn={transformWeightTempData}
                                day={DAY.TODAY}
                                title={"Patients' Temperature and Weight Today"}
                                h={350}
                                w={350}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ScatterChart
                                statuses={extractStatuses(patientList)}
                                transformDataFn={transformWeightTempData}
                                day={DAY.YESTERDAY}
                                title={"Patients' Temperature and Weight Yesterday"}
                                h={350}
                                w={350}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ScatterChart
                                statuses={extractStatuses(patientList)}
                                transformDataFn={transformWeightTempData}
                                day={DAY.ALL}
                                title={"Patients' Temperature and Weight of All Time"}
                                h={350}
                                w={350}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    );
}
