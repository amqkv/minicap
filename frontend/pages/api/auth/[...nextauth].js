import CredentialsProvider from 'next-auth/providers/credentials';
import nextAuth from 'next-auth';
import { serverURL } from '@frontend/config/index';

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const res = await fetch(serverURL + '/users/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.type = user.type;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
  // pages: {
  //   signIn: 'auth/sigin',
  // },
});
