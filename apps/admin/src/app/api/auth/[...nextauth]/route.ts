/**
 * Description : route.ts - 📌 NextAuth API 라우트 (Web 앱)
 * Author : Shiwoo Min
 * Date : 2025-09-17
 * Path : apps/web/src/app/api/auth/[...nextauth]/route.ts
 */
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth 설정
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID'] || '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
    }),

    // 이메일/비밀번호 로그인
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'user@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // TODO: 실제 API 호출로 사용자 인증
          // const response = await fetch(`${process.env.API_URL}/auth/login`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     email: credentials.email,
          //     password: credentials.password,
          //   }),
          // })

          // const user = await response.json()

          // if (response.ok && user) {
          //   return {
          //     id: user.id,
          //     email: user.email,
          //     name: user.name,
          //   }
          // }

          // 임시 하드코딩된 사용자 (개발용)
          if (credentials.email === 'admin@connectwon.com' && credentials.password === 'admin123') {
            return {
              id: '1',
              email: 'admin@connectwon.com',
              name: 'Admin User',
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  // 세션 설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  // JWT 설정
  jwt: {
    secret: process.env['NEXTAUTH_SECRET'] || 'default_secret_value',
  },

  // 페이지 경로 커스터마이징
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },

  // 콜백 함수들 - 타입 확장 사용으로 깔끔하게
  callbacks: {
    async jwt({ token, user, account }) {
      // 첫 로그인 시 사용자 정보를 토큰에 저장
      if (user && account) {
        token['id'] = user.id;
        token['provider'] = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        Object.assign(session.user ?? {}, {
          id: token["id"],
          provider: token["provider"],
        });
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // 로그인 후 리다이렉트 경로 설정
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
  },

  // 이벤트 핸들러
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('User signed in:', { user: user.email, provider: account?.provider });
    },

    async signOut({ session, token }) {
      console.log('User signed out:', session?.user?.email);
    },
  },
};

// NextAuth 핸들러 생성
const handler = NextAuth(authOptions);

// App Router에서 HTTP 메서드별로 export
export { handler as GET, handler as POST };
