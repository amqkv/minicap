import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: String;
      AccountId: Number;
      FirstName: String;
      LastName: String;
      Gender: String;
      DateOfBirth: String;
      Email: String;
      Address: String;
      City: String;
      PhoneNumber: String;
      PostalCode: String;
      Role: string;
      Confirmed: false;
    };
  }
}
