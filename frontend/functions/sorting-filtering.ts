import { PatientBasicInformation } from "@frontend/models/patient";

interface filter {
    searchText: string;
    arr: PatientBasicInformation[];
    sort: string;
    positivesOnly: boolean;
    negativesOnly: boolean;
    ascending: boolean;
}
export function filter({ searchText, arr, sort, positivesOnly, negativesOnly, ascending }: filter) {
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
        if (
            arr[i].firstName?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].lastName?.toLowerCase().includes(lowerCaseSearchtext) ||
            arr[i].email?.toLowerCase().includes(lowerCaseSearchtext) ||
            // commenting this here because we may want to fitler by city, address etc, but right now, our database has dumb info like Donk City.
            //so yeah the fitlering is a bit messed up if we leep it
            // arr[i].phoneNumber?.toLowerCase().includes(lowerCaseSearchtext) ||
            // arr[i].address?.toLowerCase().includes(lowerCaseSearchtext) ||
            // arr[i].postalCode?.toLowerCase().includes(lowerCaseSearchtext) ||
            // arr[i].city?.toLowerCase().includes(lowerCaseSearchtext) ||
            (arr[i].firstName + " " + arr[i].lastName).toLowerCase().includes(lowerCaseSearchtext)
        ) {
            if (positivesOnly && arr[i].hasCovid) {
                filteredArr.push(arr[i]);
            } else if (negativesOnly && !arr[i].hasCovid) {
                filteredArr.push(arr[i]);
            } else if (!positivesOnly && !negativesOnly) {
                filteredArr.push(arr[i]);
            }
        }
    }
    ascending ? filteredArr.sort(compare) : filteredArr.sort(compareReverse);
    return filteredArr;
}
