import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        // Call your C# backend API for authentication
        const res = await fetch(
          "https://localhost:7167/api/User/authenticate",
          {
            method: "POST",
            body: JSON.stringify({
              UserName: credentials.userName,
              Password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        console.log("Response Status:", res.status);

        const user = await res.json();

        console.log("User Data;", user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("User authentication successful:", user);
          return {
            id: user.id,
            token: user.token,
            fullName: user.fullName,
            email: user.email,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  csrf: true,
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - user", user); // Log the user object
      // Initial sign in
      if (user) {
        token.userId = user.id;
        token.accessToken = user.token; // Assuming your C# backend returns a token
        token.name = user.fullName;
        token.email = user.email;
      }
      console.log("JWT Callback - Token", token); // Log the token
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      session.accessToken = token.accessToken; // Attach the token to the session object
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Error page
  },
});

export { handler as GET, handler as POST };
