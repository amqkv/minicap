import { PatientBasicInformation } from "@frontend/models/patient";

interface filter {
    searchText: string;
    arr: PatientBasicInformation[];
    sort: string;
    filterValue: string;
    filterKey: string;
    ascending: boolean;
}
export function filter({ searchText, arr, sort, filterValue, filterKey, ascending }: filter) {
    const lowerCaseSearchtext = searchText.toLowerCase();
    const filteredArr = [];

    function compare(a: any, b: any) {
        // filtered normally a to z
        if (a[sort].toString().toLowerCase() < b[sort].toString().toLowerCase()) {
            return -1;
        }
        if (a[sort].toString().toLowerCase() > b[sort].toString().toLowerCase()) {
            return 1;
        }
        return 0;
    }

    function compareReverse(a: any, b: any) {
        // filtered normally a to z
        if (a[sort].toString().toLowerCase() < b[sort].toString().toLowerCase()) {
            return 1;
        }
        if (a[sort].toString().toLowerCase() > b[sort].toString().toLowerCase()) {
            return -1;
        }
        return 0;
    }

    for (let i = 0; i < arr.length; i++) {
        const patient = arr[i] as any;
        if (
            patient.firstName?.toLowerCase().includes(lowerCaseSearchtext) ||
            patient.lastName?.toLowerCase().includes(lowerCaseSearchtext) ||
            patient.email?.toLowerCase().includes(lowerCaseSearchtext) ||
            (patient.firstName + " " + patient.lastName).toLowerCase().includes(lowerCaseSearchtext)
        ) {
            if (filterKey === "") {
                filteredArr.push(patient);
            } else if (filterKey !== "" && patient[filterKey].toString() === filterValue) {
                filteredArr.push(patient);
            }
        }
    }
    ascending ? filteredArr.sort(compare) : filteredArr.sort(compareReverse);
    return filteredArr;
}
