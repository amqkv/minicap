import { ContactPerson } from "@frontend/components/patient/types/contact-person";
import { serverURL } from "@frontend/config";

export default async function deleteContactPerson(person: ContactPerson, id: number) {
    return await fetch(serverURL + "/contact-person/deleteTrackContacts", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...person,
            id,
        }),
    });
}
