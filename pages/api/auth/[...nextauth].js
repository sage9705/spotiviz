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
          scope: "user-read-email user-top-read user-read-recently-played user-follow-read playlist-read-private user-read-private playlist-read-collaborative",
        },
      },
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`,
    }),
  ],
  
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000, 
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      try {
        const refreshedTokens = await refreshSpotifyToken(token.refreshToken);

        if (!refreshedTokens) {
          throw new Error("Failed to refresh access token");
        }

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
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
});