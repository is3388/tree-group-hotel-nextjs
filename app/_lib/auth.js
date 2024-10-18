import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // can have multiple providers such as Github, Facebook, Instagram, LinkedIn
  ],
  callbacks: {
    // when user hit the /account route, authorized will be called
    // if it is unauthorized, it auto redirects to signin page
    authorized({ auth, request }) {
      // auth is the current session
      return !!auth?.user; // see if a user exists and turns into boolean T or F
    },
  },
  pages: { // tell authentication go to custom page not the prebuilt page that only has Google signin logo
    signIn: '/login'
  }
};

export const { // auth for current session, signIn/signOut for handling user connects to Google buttons
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

/*  for your own credentials
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})
*/
