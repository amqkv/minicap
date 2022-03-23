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
        if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
            return -1;
        }
        if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
            return 1;
        }
        return 0;
    }

    function compareReverse(a: any, b: any) {
        // filtered normally a to z
        if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
            return 1;
        }
        if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
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
            // commenting this here because we may want to fitler by city, address etc, but right now, our database has dumb info like Donk City.
            //so yeah the fitlering is a bit messed up if we leep it
            // patient.phoneNumber?.toLowerCase().includes(lowerCaseSearchtext) ||
            // patient.address?.toLowerCase().includes(lowerCaseSearchtext) ||
            // patient.postalCode?.toLowerCase().includes(lowerCaseSearchtext) ||
            // patient.city?.toLowerCase().includes(lowerCaseSearchtext) ||
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
