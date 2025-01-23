import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string; 
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string; 
      name?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
