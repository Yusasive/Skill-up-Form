import "next-auth";
declare module "next-auth" {
  interface User {
    id: string;  
    email: string;  
    role: string;  
  }

  interface Session extends DefaultSession {
    user: {
      id: string; 
      email: string;  
      role: string;  
      name?: string | null;  
      image?: string | null;  
    } & DefaultSession["user"];  
  }

  interface JWT {
    id: string;  
    email: string;  
    role: string;  
  }
}
