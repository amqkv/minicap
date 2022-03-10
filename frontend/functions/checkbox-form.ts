import { requiredDetails } from "@frontend/components/forms/types/types";

export function checkboxForms(requiredDetails: requiredDetails, event: any) {
    let statusValues: any = {};
    // assigning values depending on what field is shown
    // for 3 checkbox
    if (requiredDetails.Temperature && requiredDetails.Weight && requiredDetails.Symptoms) {
        statusValues.temperature = event.target[0].value;
        statusValues.weight = event.target[1].value;
        statusValues.symptoms = event.target[2].value;
    }

    // for checkbox weight and symptoms
    else if (requiredDetails.Weight && requiredDetails.Symptoms) {
        statusValues.weight = event.target[0].value;
        statusValues.symptoms = event.target[1].value;
    }
    // for checkbox temperature and symptoms
    else if (requiredDetails.Temperature && requiredDetails.Symptoms) {
        statusValues.temperature = event.target[0].value;
        statusValues.symptoms = event.target[1].value;
    }
    // for checkbox temperature and weight
    else if (requiredDetails.Temperature && requiredDetails.Weight) {
        statusValues.temperature = event.target[0].value;
        statusValues.weight = event.target[1].value;
    }

    // for checkbox temperature ONLY
    else if (requiredDetails.Temperature) {
        statusValues.temperature = event.target[0].value;
    }

    // for checkbox weight ONLY
    else if (requiredDetails.Weight) {
        statusValues.weight = event.target[0].value;
    }

    // for checkbox symptoms ONLY
    else if (requiredDetails.Symptoms) {
        statusValues.symptoms = event.target[0].value;
    }

    return statusValues;
}
