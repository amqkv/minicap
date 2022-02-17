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
            Confirmed: false;
        };
    }
}
