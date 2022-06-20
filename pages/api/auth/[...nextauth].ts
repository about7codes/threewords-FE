import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginRequest } from "../../../api/auth.api";

// NextAuth();

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
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
          const response: any = await loginRequest({
            email: credentials?.username || "",
            password: credentials?.password || "",
          });
          // console.log("HEAD: ", response.headers);

          const cookies = response.headers["set-cookie"];
          res.setHeader("Set-Cookie", cookies);

          const userData = response.data;

          if (userData && userData.user) {
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
      strategy: "jwt" as SessionStrategy,
      maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
      jwt: async ({ token, user }: { token: JWT; user?: User }) => {
        if (user) {
          // @ts-ignore
          token.id = user.user._id;
          token.token = "user.token";
          // @ts-ignore
          token.email = user.user.email;
          // token.authToken = user.authToken;
          // token.refreshToken = user.refreshToken;
          token.name = "next-auth-be";
        }
        return token;
      },
      session: ({ session, token }: { session: Session; token: JWT }) => {
        if (token) {
          // console.log("Txoken", token);
          session.id = token.id;

          session.email = token.email;
          // session.authToken = token.authToken;
          // session.refreshToken = token.refreshToken;
        }
        return session;
      },
    },
    secret: "supersecretkeyyoushouldnotcommittogithub",
    jwt: {
      secret: "supersecretkeyyoushouldnotcommittogithub",
    },
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
