import { ContactPerson } from "@frontend/components/patient/types/contact-person";
import { serverURL } from "@frontend/config";
import { validEmail, validPhoneNumber, allFieldsFilled } from "@frontend/functions/validation";

export default async function trackContacts(formValues: ContactPerson[], accountId: number | undefined) {
    try {
        if (
            !formValues.every(value => validEmail(value.email)) ||
            !formValues.every(value => validPhoneNumber(value.phoneNumber)) ||
            !formValues.every(allFieldsFilled) ||
            !accountId ||
            formValues.length === 0
        ) {
            throw "error";
        }
        await fetch(serverURL + "/contact-person/postTrackContacts/" + accountId, {
            method: "POST",
            body: JSON.stringify({ contacts: formValues }),
            headers: { "Content-Type": "application/json" },
        });
        return true;
    } catch {
        return false;
    }
}
