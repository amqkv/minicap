import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: String;
      email: String;
      type: String;
      id: Number;
    };
  }
}
