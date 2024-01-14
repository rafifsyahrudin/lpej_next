import { Role } from "@prisma/client";
import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";
import { UserAdapter, AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    nip: string;
    nama: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string | number;
      nip: string;
      nama: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    nip: string;
    nama: string;
    role: Role;
  }
}
