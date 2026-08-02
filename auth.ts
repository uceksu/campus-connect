import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authorizeCredentials } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";

class WrongPasswordError extends CredentialsSignin {
  code = "wrong_password";
}

class UserNotFoundError extends CredentialsSignin {
  code = "user_not_found";
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (process.env.NODE_ENV === "production" && !NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable in production.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // refresh JWT once per day
  },
  pages: {
    signIn: "/portal-admin/login",
    error: "/portal-admin/login",
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cred = credentials as { email?: string; password?: string } | undefined;
        if (!cred?.email || !cred?.password) {
          return null;
        }

        try {
          return await authorizeCredentials({
            email: cred.email,
            password: cred.password,
          });
        } catch (error: any) {
          if (error.message === "Wrong password") {
            throw new WrongPasswordError();
          }
          if (error.message === "User not found") {
            throw new UserNotFoundError();
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        const role = (user as { role?: string }).role;
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          token.role = role;
          token.permissions = (user as { permissions?: string[] }).permissions || [];
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.role === "ADMIN" || token.role === "SUPER_ADMIN") {
          session.user.role = token.role;
          (session.user as any).permissions = (token.permissions as string[]) || [];
        }
      }
      return session;
    },
  },
});