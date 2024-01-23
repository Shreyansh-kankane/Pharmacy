import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from '@/utils/db';

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
            role: { label: 'Role', type: 'role'}
          },
          authorize: async (credentials) => {
            const db = await connectToDatabase(process.env.MONGODB_URI);
            const users = db.collection(credentials.role || 'customer');
            const user = await users.findOne({ email: credentials.email });

            if (user && user.password === credentials.password && user.role === credentials.role) {
              return Promise.resolve(user);
            } else {
              return Promise.resolve(null);
            }
          },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user){
                token.id = user._id;
                token.role = user.role; // Set role as returned from user.role from mongo database
                token.address = user.address;
                token.phone = user.phone;
            }
            return token;
        },
    
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role; // Set role as returned from user.role from mongo database
            session.user.address = token.address;
            session.user.phone = token.phone;
            return session;
        },

    },
    pages:{
        signIn: '/login',
    }
}
export default NextAuth(authOptions);

