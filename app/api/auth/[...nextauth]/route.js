import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectToDb from '@utils/database';
import User from '@models/user';

// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// });

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.User.email,
        })

        session.user.id = sessionUser._id.toString();

    },
    async signIn({ profile }) {
        try {
            await connectToDb();

            // Check if user already exists
            const userExists = await User.findOne({ email: profile.email })

            //If not exists, then create a new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture

                })
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export { handler as GET, handler as POST };