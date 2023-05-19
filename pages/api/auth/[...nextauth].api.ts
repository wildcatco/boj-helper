import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/libs/db/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider as string;
      const email = user.email as string;

      const userExists = await prisma.user.findUnique({
        where: {
          email_provider: {
            email,
            provider,
          },
        },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            email,
            provider,
          },
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      const provider = account?.provider as string;
      const email = profile?.email as string;
      if (email && provider) {
        const user = await prisma.user.findUnique({
          where: {
            email_provider: {
              email,
              provider,
            },
          },
        });
        if (user?.id) {
          token.sub = user.id;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
