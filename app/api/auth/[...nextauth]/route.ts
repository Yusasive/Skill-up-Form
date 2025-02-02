import NextAuth, { NextAuthOptions, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import type { Db, ObjectId } from "mongodb";

type AdminUser = {
  _id: ObjectId; 
  email: string;
  password: string;
  role: string;
};

interface CustomJWT extends JWT {
  id?: string; 
  email?: string;
  role?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }
        const { db }: { db: Db } = await connectToDatabase();
        const admin = await db.collection<AdminUser>("admins").findOne({
          email: credentials.email,
        });
        if (!admin) {
          throw new Error("No user found with this email.");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }
        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: CustomJWT;
      user?: { id: string; email: string; role: string };
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: CustomJWT }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
