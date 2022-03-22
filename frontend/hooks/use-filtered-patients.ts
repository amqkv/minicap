import { useState, useEffect } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import { filter } from "@frontend/functions/sorting-filtering";

export default function useFilteredPatients(patients: PatientBasicInformation[]) {
    const [sort, setSort] = useState("firstName");
    const [ascending, setAscending] = useState(true);
    const [positivesOnly, setPositivesOnly] = useState(false);
    const [negativesOnly, setNegativesOnly] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredPatients, setFilteredPatients] = useState(patients);

    // to make sure the filters functions properly
    // if the positive button is activated, then the negative button should disable, vice-versa
    function positiveNegativeFilter(clickedButton: boolean) {
        if (clickedButton) {
            setPositivesOnly(!positivesOnly);
            setNegativesOnly(false);
        } else {
            setPositivesOnly(false);
            setNegativesOnly(!negativesOnly);
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
        setFilteredPatients(filter({ searchText, arr: patients, sort, positivesOnly, negativesOnly, ascending }));
    }, [searchText, sort, positivesOnly, negativesOnly, patients, ascending]);

    // return everything needed
    return {
        changeSort,
        ascending,
        filteredPatients,
        positivesOnly,
        negativesOnly,
        searchText,
        setSearchText,
        positiveNegativeFilter,
    };
}
