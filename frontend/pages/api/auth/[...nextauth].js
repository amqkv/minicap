import CredentialsProvider from 'next-auth/providers/credentials';
import nextAuth from 'next-auth';
import { serverURL } from '@frontend/config/index';

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const res = await fetch(serverURL + '/users/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        let user = await res.json();

        if (res.ok && user) {

          const fetchUser = await fetch(serverURL + "/users/getUser", {
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + user.accessToken }
          })
          user = Object.assign(user, await fetchUser.json())
          return user
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user
      }

      return token
    },
    session: ({ session, token }) => {
      const user = token.user
      delete user.Password;

      if (token) {
        session.id = token.id;
        session.user = user
      }

      return session;
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
  pages: {
    signIn: '/auth/signin',
  },
});
