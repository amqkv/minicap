import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      FirstName: String;
      LastName: String;
      Email: String;
      Birthdate: String;
      UserId: Number;
      PhoneNumber: String;
      Address: String;
      City: String;
      Gender: String;
      AccessToken: String;
    };
  }
}
