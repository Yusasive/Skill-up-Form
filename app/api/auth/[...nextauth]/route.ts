import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/mongodb';
import { Db } from 'mongodb';

type AdminUser = {
  _id: string;
  email: string;
  password: string;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials received:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          return null;
        }

        const { db }: { db: Db } = await connectToDatabase();

        let admin = await db.collection<AdminUser>('admins').findOne({ email: credentials.email });

        if (!admin) {
          console.log('Admin not found. Creating a new admin...');

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const result = await db.collection('admins').insertOne({
            email: credentials.email,
            password: hashedPassword,
          });

          admin = {
            _id: result.insertedId.toString(),
            email: credentials.email,
            password: hashedPassword,
          };

          console.log('New admin created:', admin);
        }

        const isValidPassword = await bcrypt.compare(credentials.password, admin.password);
        if (!isValidPassword) {
          console.log('Invalid password');
          return null;
        }

        console.log('Authorization successful');
        return { id: admin._id.toString(), email: admin.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
