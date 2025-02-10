import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials" 
import { SignJWT, jwtVerify } from "jose";


export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,

  callbacks: {
    async redirect() {
      return String(process.env.APP_URL);
    },
  },
  jwt: {
    async encode({ secret, token, maxAge }) {
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + (maxAge ?? 30 * 24 * 60 * 60);
      return await new SignJWT({ ...token, iat, exp })
        .setProtectedHeader({ alg: "HS512", typ: "JWT" })
        .sign(new TextEncoder().encode(secret as string));
    },
    async decode({ secret, token }) {
      return jwtVerify(
        token as string,
        new TextEncoder().encode(secret as string),
        {
          algorithms: ["HS512"],
          typ: "JWT",
        }
      ).then(({ payload }) => payload);
    },
  },
  cookies: {
    sessionToken: {
      options: {
        domain: ".vercel.app",
      },
    },
  },

  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // let user = null

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // Optionally, this is also the place you could do a user registration
        //   throw new Error("Invalid credentials.")
        // }

        // return user object with their profile data
        return {
          id: "1",
          name: "John Doe",
          email: String(credentials.email),
        };
      },
    }),
  ],
});