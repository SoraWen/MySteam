import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google api client有問題");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", //as string
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const email = session.user?.email;
      console.log(session);
      if (email) {
        try {
          const { data } = await axios.get(
            `http://localhost:3005/users?email=${email}`
          );
          if (data.length === 0) {
            //data.lenht 找與登入者mail對照db.json的mail是否存在
            await axios.post("http://localhost:3005/users", {
              name: session.user?.name,
              email: session.user?.email,
              wishlist: [],
            });
          }
        } catch (error) {
          console.error("Failed to save user:", error);
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
//export default handler;
// await axios.post("http://localhost:3005/users", {
//
//         name: session.user?.name,
//         email: session.user?.email,
//       });
