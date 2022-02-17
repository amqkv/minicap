import { serverURL } from "@frontend/config/index";

interface SignUpParameters {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    city: string;
    email: string;
    password: string;
    phoneNumber: string;
    postalCode: string;
    accountRole: string;
}

export async function signUp({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    address,
    city,
    email,
    password,
    phoneNumber,
    postalCode,
    accountRole,
}: SignUpParameters) {
    return await fetch(serverURL + "/users/register", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            gender,
            dateOfBirth,
            address,
            city,
            email,
            password,
            phoneNumber,
            postalCode,
            accountRole,
        }),
        headers: { "Content-Type": "application/json" },
    });
}
