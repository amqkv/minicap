import CredentialsProvider from 'next-auth/providers/credentials';
import nextAuth from 'next-auth';

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: credentials => {
        if (credentials.username === 'john' && credentials.password === 'test') {
          return {
            id: 2,
            name: 'john',
            email: 'fakemeial@gmail.com',
          };
        }
        return null;
      },
      // async authorize(credentials, req) {
      //   const res = await fetch('/', {
      //     method: 'POST',
      //     body: JSON.stringify(credentials),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   const user = await res.json();

      //   if (res.ok && user) {
      //     return user;
      //   }
      // return null;
      // },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
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
