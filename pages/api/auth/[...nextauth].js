import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshSpotifyToken } from "../../../lib/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-email user-top-read user-read-recently-played user-follow-read playlist-read-private",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000, // Convert to milliseconds
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const refreshedTokens = await refreshSpotifyToken(token.refreshToken);

        if (!refreshedTokens) {
          throw new Error("Failed to refresh access token");
        }

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
          // Fall back to old refresh token, but note that
          // many providers give a new refresh token with a new access token
          refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log("Signed in", message);
    },
    async signOut(message) {
      console.log("Signed out", message);
    },
    async error(message) {
      console.error("NextAuth error", message);
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});