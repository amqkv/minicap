import { useState, useEffect } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import { filter } from "@frontend/functions/sorting-filtering";

export default function useFilteredPatients(patients: PatientBasicInformation[]) {
    const [alphabeticalSort, setAlphabeticalSort] = useState(true);
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

    useEffect(() => {
        setFilteredPatients(filter({ searchText, arr: patients, alphabeticalSort, positivesOnly, negativesOnly }));
    }, [searchText, alphabeticalSort, positivesOnly, negativesOnly]);

    // return everything needed
    return {
        alphabeticalSort,
        setAlphabeticalSort,
        filteredPatients,
        positivesOnly,
        negativesOnly,
        searchText,
        setSearchText,
        positiveNegativeFilter,
    };
}
