import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma-client';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        return user;
      },
    }),
  ],
  callbacks: {
    async session({session}) {
      const isExistingUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email
        }
      })
      if(!isExistingUser){
        const user = await prisma.user.create({
          data: {
            email: session.user?.email || "",
            isVerified: true,
            avatar: session.user?.image || '',
          }
        })
        session.currentUser = user
        return session
      }
    }
  },
  session: {strategy: 'jwt'},
  jwt: { secret: process.env.NEXT_PUBLIC_JWT_SECRET },
	secret: process.env.NEXTAUTH_SECRET,
	pages: { signIn: '/login', signOut: '/login' },
};
