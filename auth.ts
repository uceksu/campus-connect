import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authorizeCredentials } from "@/lib/auth";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (process.env.NODE_ENV === "production" && !NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable in production.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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

        return await authorizeCredentials({
          email: cred.email,
          password: cred.password,
        });
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
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.role === "ADMIN" || token.role === "SUPER_ADMIN") {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
});