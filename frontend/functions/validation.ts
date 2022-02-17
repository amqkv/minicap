export function validPhoneNumber(phoneNumber: string) {
    return /^\d{3}[-. ]?\d{3}[-. ]?\d{4}$/.test(phoneNumber);
}

export function validPassword(password: string) {
    //return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
}

export function validEmail(email: string) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export function validPostalCode(postalCode: string) {
    return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
}

export function allFieldsFilled(fieldObj: any) {
    for (const key in fieldObj) {
        if (fieldObj[key] === "" || fieldObj[key] === undefined || fieldObj[key] === null) return false;
    }
    return true;
}
