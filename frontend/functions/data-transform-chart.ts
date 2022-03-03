import { PieChartData } from "@frontend/models/chart-data";
import { Patient, PatientStatus } from "@frontend/models/patient";

// Extracting all statuses from patients object
export function extractSymptoms(patientList: Patient[]) {
    const statusesArr: PatientStatus[] = [];
    patientList.map(patient => {
        patient.status.map(status => {
            statusesArr.push(status);
        });
    });
    return statusesArr;
}

// Transforming the symptoms data to plug into the pie chart
export function transformSymptomsData(statuses: PatientStatus[]) {
    const data: PieChartData[] = [];
    const allSymptoms: string[] = [];
    let currentStatus: string[] = [];
    let currentSymptom = "";
    let total = 0;

    // Going through all statuses and counting the recurring ones
    statuses.map(status => {
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
