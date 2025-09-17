/// <reference types="next" />
/// <reference types="next/image-types/global" />
// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    provider?: string;
  }
}
