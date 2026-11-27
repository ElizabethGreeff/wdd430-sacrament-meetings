import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;


            const isProtected =
                pathname === "/meetings/new" || /^\/meetings\/[^/]+\/edit/.test(pathname);

            if (isProtected) {
                return isLoggedIn;
            }

            if (isLoggedIn && pathname === "/login") {
                return Response.redirect(new URL("/meetings", nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;