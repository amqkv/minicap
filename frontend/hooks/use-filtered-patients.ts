import { useState, useEffect } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import { filter } from "@frontend/functions/sorting-filtering";

export default function useFilteredPatients(patients: PatientBasicInformation[]) {
    const [sort, setSort] = useState("firstName");
    const [ascending, setAscending] = useState(true);
    const [filterValue, setFilterValue] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredPatients, setFilteredPatients] = useState(patients);

    // to make sure the filters functions properly
    // if the positive button is activated, then the negative button should disable, vice-versa
    function changeFilter(key: string, value: string) {
        if (filterKey === key) {
            setFilterKey("");
        } else {
            setFilterValue(value);
            setFilterKey(key);
        }
    }

    function changeSort(sortKey: string) {
        if (sort === sortKey) {
            setAscending(!ascending);
        } else {
            setSort(sortKey);
            setAscending(true);
        }
    }

    useEffect(() => {
        setFilteredPatients(filter({ searchText, arr: patients, sort, filterValue, filterKey, ascending }));
    }, [searchText, sort, patients, ascending, filterValue, filterKey]);

    // return everything needed
    return {
        sort,
        changeSort,
        ascending,
        filteredPatients,
        setSearchText,
        filterValue,
        filterKey,
        changeFilter,
    };
}
