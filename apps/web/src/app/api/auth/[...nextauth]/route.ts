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
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID'] || '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
    }),

    // Naver OAuth
    NaverProvider({
      clientId: process.env['NAVER_CLIENT_ID'] || '',
      clientSecret: process.env['NAVER_CLIENT_SECRET'] || '',
    }),

    // Kakao OAuth
    KakaoProvider({
      clientId: process.env['KAKAO_CLIENT_ID'] || '',
      clientSecret: process.env['KAKAO_CLIENT_SECRET'] || '',
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
          // });
          // const user = await response.json();

          // if (response.ok && user) {
          //   return {
          //     id: user.id,
          //     email: user.email,
          //     name: user.name,
          //   };
          // }

          // 개발용 하드코딩 계정
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

  // 페이지 경로
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },

  // 콜백
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token['id'] = (user as any).id || token.sub;
        token['provider'] = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token['id'];
        (session.user as any).provider = token['provider'];
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  // 이벤트 로그
  events: {
    async signIn({ user, account }) {
      console.log('✅ User signed in:', { email: (user as any)?.email, provider: account?.provider });
    },
    async signOut({ session }) {
      console.log('🚪 User signed out:', session?.user?.email);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
