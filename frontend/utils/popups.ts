import { UseToastOptions } from "@chakra-ui/react";

//signin & register popups
export const errorPopupBase: UseToastOptions = {
    title: "Error!",
    status: "error",
    isClosable: true,
    duration: 3000,
    position: "top",
};
export const successPopupBase: UseToastOptions = {
    title: "Success!",
    status: "success",
    isClosable: true,
    duration: 3000,
    position: "top",
};

const registerDescription = {
    generalError: "There is an error with your sign up attempt. Try again",
    success: "User has been created. Please login.",
    emailError: "There already exists an account with the same email. Please sign in",
    integerError: "The field must be an integer.",
};

const signinErrorDescription = "There was an error in login. Try again";
const patientSymptomsDescription = "There was an error while filling the form. Try again";

export const registerGeneralErrorPopup = { ...errorPopupBase, description: registerDescription.generalError };
export const registerSuccessPopup = { ...successPopupBase, description: registerDescription.success };
export const registerEmailErrorPopup = { ...errorPopupBase, description: registerDescription.emailError };
export const registerIntegerErrorPopup = { ...errorPopupBase, description: registerDescription.integerError };
export const signinErrorPopup = { ...errorPopupBase, description: signinErrorDescription };
export const patientSymptoms = { ...errorPopupBase, description: patientSymptomsDescription };

//health official popups
interface toastInterface {
    firstName: string | undefined;
    lastName: string | undefined;
    covidChange?: boolean;
}

export function successfulToast({ firstName, lastName, covidChange }: toastInterface) {
    return {
        ...successPopupBase,
        description: `${firstName} ${lastName} is now COVID ${covidChange ? "Positive" : "Negative"}`,
        title: "Successful COVID Status Changed",
    };
}

export function unsuccessfulToast({ firstName, lastName }: toastInterface) {
    return {
        ...errorPopupBase,
        description: `Updating ${firstName} ${lastName}'s COVID status has failed`,
        title: "Unsuccessful COVID Status Changed",
    };
}

export const trackPersonSuccess = { ...successPopupBase, description: "Your form was successfully submitted!" };

export const trackPersonFailure = {
    ...errorPopupBase,
    description: "There was an error with your form. Please try again.",
};

export function deleteTrackPersonSuccess(firstName: string | undefined, lastName: string | undefined) {
    return { ...successPopupBase, description: firstName + " " + lastName + " was successfully deleted!" };
}
export function deleteTrackPersonFailure(firstName: string | undefined, lastName: string | undefined) {
    return {
        ...errorPopupBase,
        description: firstName + " " + lastName + " was unsuccessfully deleted! Please try again.",
    };
}

export function sendEmailTrackPersonSuccess(firstName: string | undefined, lastName: string | undefined) {
    return { ...successPopupBase, description: firstName + " " + lastName + " was successfully notified by email!" };
}
export function sendEmailTrackPersonFailure(firstName: string | undefined, lastName: string | undefined) {
    return {
        ...errorPopupBase,
        description: firstName + " " + lastName + " was unsuccessfully notified by email! Please try again.",
    };
}
