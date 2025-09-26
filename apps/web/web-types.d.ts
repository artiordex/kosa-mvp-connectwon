/**
 * Description : web-types - 📌 WEB 컴포넌트 관련 타입 선언
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    provider?: string;
  }

  interface JWT {
    id?: string;
    provider?: string;
  }
}
