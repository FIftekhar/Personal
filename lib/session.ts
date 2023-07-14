import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        LinkedInProvider({
            clientId: '', // process.env.LINKEDIN_CLIENT_ID
            clientSecret: '' // process.env.LINKEDIN_CLIENT_SECRET
        })
    ],
    // jwt: {
    //     encode: ({ secret, token }) => {

    //     },
    //     decode: async ({ secret, token }) => {

    //     }
    // },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    callbacks: {
        async session({ session }) {
            return session;
        },
        async signIn({ user }: {user: AdapterUser | User}) {
            try {
                // get the user if they exist
                // create the user if they dont exist
                return true; // user was created or retrieved
            } catch (error: any) {
                console.log(error)
                
                // return false when the sign in method fails and user cannot be created
                return false;
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;
    
    return session;
}