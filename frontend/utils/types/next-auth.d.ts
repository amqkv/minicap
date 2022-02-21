import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            accessToken: string;
            AccountId: number;
            FirstName: string;
            LastName: string;
            Gender: string;
            DateOfBirth: string;
            Email: string;
            Address: string;
            City: string;
            PhoneNumber: string;
            PostalCode: string;
            Role: string;
            ConfirmedFlag: boolean; // ,might need to be handled differently, but does not break anything right now (2022-08-18: merge main into SOEN77)
        };
    }
}
