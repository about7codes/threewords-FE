import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "../../../api/auth.api";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "XCredentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("RAN Authorize");
        // Add logic here to look up the user from the credentials supplied
        // console.log("Xcredentials", credentials);
        const userData: any = await loginRequest({
          email: credentials?.username || "",
          password: credentials?.password || "",
        });
        // console.log("XuserData", userData);
        if (userData && userData.user) {
          //   console.log("User ReturnedXX");
          return { ...userData };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // console.log("CB user: ", user);
        // @ts-ignore
        token.id = user.user._id;
        // @ts-ignore
        token.email = user.user.email;
        token.authToken = user.authToken;
        token.refreshToken = user.refreshToken;
        token.name = "next-auth-be";
        // token = { ...token, ...user };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        console.log("Txoken", token);
        session.id = token.id;

        session.email = token.email;
        session.authToken = token.authToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  secret: "supersecretkeyyoushouldnotcommittogithub",
  jwt: {
    secret: "supersecretkeyyoushouldnotcommittogithub",
  },
});
