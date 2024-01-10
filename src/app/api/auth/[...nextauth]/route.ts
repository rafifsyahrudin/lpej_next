import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        nip: { label: "nip", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const foundPegawai = await prisma.pegawai.findUnique({
          where: {
            nip: credentials.nip,
          },
          include: {
            user: true,
          },
        });

        if (!foundPegawai) {
          return null;
        }

        if (
          !bcrypt.compareSync(credentials.password, foundPegawai.user.password)
        ) {
          return null;
        }

        return {
          id: foundPegawai.id,
          nip: foundPegawai.nip,
          nama: foundPegawai.nama,
          role: foundPegawai.user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.nip = user.nip;
        token.nama = user.nama;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.nip = token.nip;
        session.user.nama = token.nama;
        session.user.role = token.role;
      }

      return session;
    },
  },
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  // custom pages
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
