
import {
    validPassword,
    validEmail,
    validPhoneNumber,
    validPostalCode,
    allFieldsFilled,
    validIntegerField,
} from '@frontend/functions/validation';

describe("validate password function", () => {
    it("accepts a valid password with 1 capital, 1 symbol, 1 number and of length 8 at least", () => {
        expect(validPassword("Nicholas1!")).toBe(true);
        expect(validPassword("Kelvin2@")).toBe(true);
        expect(validPassword("Steven3#")).toBe(true);

    });

    it("refuses an invalid password", () => {
        expect(validPassword("Nicholas!")).toBe(false);
        expect(validPassword("nicholas1!")).toBe(false);

        expect(validPassword("Nicholas1")).toBe(false);
        expect(validPassword("Nic1!")).toBe(false);
    });
});

describe("validate email function", () => {
    it("accepts a valid email with @ sign and ", () => {
        expect(validEmail("kelvin12@gmail.com")).toBe(true);
        expect(validEmail("kelvin@hotmail.com")).toBe(true);
        expect(validEmail("kelvin@live.concordia.com")).toBe(true);

    });

    it("refuses an invalid email", () => {
        expect(validPassword("Nicholas!")).toBe(false);
        expect(validPassword("Nicholas!@hotmail.com")).toBe(false);
        expect(validPassword("Nicho@las!")).toBe(false);
        expect(validPassword("Nicho@las!")).toBe(false);
    });
});


describe("validate phone number function", () => {
    it("accepts a valid phonenumber", () => {
        expect(validPhoneNumber("123 456 7890")).toBe(true);
        expect(validPhoneNumber("123456 7890")).toBe(true);
        expect(validPhoneNumber("1234567890")).toBe(true);

    });

    it("refuses an invalid phone number", () => {
        expect(validPhoneNumber("123#456L7890")).toBe(false);
        expect(validPhoneNumber("12345890")).toBe(false);
        expect(validPhoneNumber("12345678-90")).toBe(false);
    });
});


describe("validate postal code function", () => {
    it("accepts a valid postal code", () => {
        expect(validPostalCode("K1K 1K1")).toBe(true);
        expect(validPostalCode("k1k 1k1")).toBe(true);
    });

    it("refuses an invalid postal code", () => {
        expect(validPassword("K1K1K1")).toBe(false);
        expect(validPassword("1KK1K")).toBe(false);
        expect(validPassword("1K1 11K")).toBe(false);
        expect(validPassword("1K1 $1K")).toBe(false);
        expect(validPassword("111 111")).toBe(false);
    });
});

describe("validate integer function", () => {
   
   
   
    it("accepts a valid integer", () => {
        expect(validIntegerField("10")).toBe(true);
        expect(validIntegerField("100")).toBe(true);
    });

    it("refuses an invalid integer", () => {
        expect(validIntegerField("gasd")).toBe(false);
        expect(validIntegerField("12das213")).toBe(false);
        expect(validIntegerField("-1324")).toBe(false);

    });
});