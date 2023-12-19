import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith('/collection');
      if (isProtected) {
        if (isLoggedIn) return true;
        return false; //redireciona para o login
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/collection', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;