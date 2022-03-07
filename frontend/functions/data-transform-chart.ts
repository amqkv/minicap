import { PieChartData, ScatterChartData, ScatterChartDataDetails } from "@frontend/models/chart-data";
import { Patient, PatientStatus, StatusDataProps } from "@frontend/models/patient";
import { DAY } from "@frontend/utils/constants";
import moment from "moment";

// Extracting all statuses from patients object
export function extractStatuses(patientList: Patient[]) {
    const statusesArr: PatientStatus[] = [];
    patientList.map(patient => {
        patient.status.map(status => {
            statusesArr.push(status);
        });
    });
    return statusesArr;
}

// Transforming the symptoms data to plug into the pie chart
export function transformSymptomsData(statuses: PatientStatus[], day: string) {
    const data: PieChartData[] = [];
    const allSymptoms: string[] = [];
    let currentStatus: string[] = [];
    let currentSymptom = "";
    let total = 0;

    // Going through all statuses and counting the recurring ones
    statuses.map(status => {
        if (dayCondition(status, day)) {
            currentStatus = status.symptoms.value.split(",").map(value => value.trim());
            total += currentStatus.length;
            currentStatus.map(symptom => {
                currentSymptom = symptom.toLowerCase();
                if (!allSymptoms.includes(currentSymptom)) {
                    data.push({ name: currentSymptom.charAt(0).toUpperCase() + currentSymptom.slice(1), value: 1 });
                    allSymptoms.push(currentSymptom);
                } else {
                    data.map(elm => {
                        if (elm.name.toLowerCase() === currentSymptom) {
                            elm.value++;
                        }
                    });
                }
                currentStatus = [];
                currentSymptom = "";
            });
        }
    });

    // Returning only the most common symptoms (7 most common)
    data.sort((first, second) => (first.value < second.value ? 1 : second.value < first.value ? -1 : 0));
    if (data.length > 7) {
        for (let i = 0; i < 6; i++) {
            total -= data[i].value;
        }
        data[6] = { name: "Other", value: total };
        return data.slice(0, 7);
    }
    return data;
}

// Transforming the weight & temperature data to plug into the scatter chart only for statuses updated today
export function transformWeightTempData(statuses: PatientStatus[], day: string) {
    const data: ScatterChartData[] = [];
    let highestWeight = 0;
    let highestTemp = 0;
    let lowestWeight = 100000;

    // Formatting the weight & temperature data object + finding the domain ranges
    statuses.map(status => {
        if (dayCondition(status, day)) {
            data.push({ x: status.weight.value, y: status.temperature.value });
        }
        if (status.weight.value > highestWeight) highestWeight = status.weight.value;
        if (status.temperature.value > highestTemp) highestTemp = status.temperature.value;
        if (status.weight.value < lowestWeight) lowestWeight = status.weight.value;
    });

    const details: ScatterChartDataDetails = {
        nameX: "Weight",
        nameY: "Temperature",
        unitX: "lbs",
        unitY: "°C",
        domainX: [lowestWeight - 10, highestWeight + 10],
        domainY: [30, highestTemp + 2],
    };
    return { data, details };
}

// Filtering the statuses according to the day
export function dayCondition(status: PatientStatus, day: string) {
    if (day === DAY.TODAY) {
        return (
            0 <= status.lastUpdated - parseInt(moment().format("hh")) &&
            status.lastUpdated - parseInt(moment().format("hh")) < 24
        );
    } else if (day === DAY.YESTERDAY) {
        return (
            24 <= status.lastUpdated - parseInt(moment().format("hh")) &&
            status.lastUpdated - parseInt(moment().format("hh")) < 48
        );
    } else if (day === DAY.ALL) {
        return true;
    }
    return false;
}

// Transforming the status history object to plug into the line chart
export function formatPatientStatusData(statuses: PatientStatus[]) {
    const statusHistory: StatusDataProps[] = [];
    statuses.map(status => {
        statusHistory.push({
            Temperature: status.temperature.value,
            StatusTime: status.statusTime,
            Weight: status.weight.value,
            Symptoms: status.symptoms.value,
        });
    });
    statusHistory.reverse();
    return statusHistory;
}
