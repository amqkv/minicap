// export function validPhoneNumber(phoneNumber: string) {
//   return /^((\+1)?[\s-]?)?\(?[2-9]\d\d\)?[\s-]?[2-9]\d\d[\s-]?\d\d\d\d/.test(phoneNumber);
// }

export function validPassword(password: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
}

export function validEmail(email: string) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export function validPostalCode(postalCode: string) {
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
}

export function allFieldsFilled(fieldObj: any) {
  for (var key in fieldObj) {
    if (fieldObj[key] === "" || fieldObj[key] === undefined || fieldObj[key] === null) return false;
  }
  return true;
}
