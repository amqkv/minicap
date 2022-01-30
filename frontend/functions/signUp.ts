import { serverURL } from "@frontend/config/index";

interface signUpParameters {
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
}: signUpParameters) {
  return await fetch(serverURL + "/users/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      address: address,
      city: city,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      role: accountRole,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
