import { UseToastOptions } from "@chakra-ui/react";

const errorPopupBase: UseToastOptions = {
    title: "Error!",
    status: "error",
    isClosable: true,
    position: "top",
};
const successPopupBase: UseToastOptions = {
    title: "Success!",
    status: "success",
    isClosable: true,
    position: "top",
};

const registerDescription = {
    generalError: "There is an error with your sign up attempt. Try again",
    success: "User has been created. Please login.",
    emailError: "There already exists an account with the same email. Please sign in",
};

const signinErrorDescription = "There was an error in login. Try again";

export const registerGeneralErrorPopup = { ...errorPopupBase, description: registerDescription.generalError };
export const registerSuccessPopup = { ...successPopupBase, description: registerDescription.success };
export const registerEmailErrorPopup = { ...errorPopupBase, description: registerDescription.emailError };

export const signinErrorPopup = { ...errorPopupBase, description: signinErrorDescription };
