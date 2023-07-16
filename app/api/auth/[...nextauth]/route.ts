import NextAuth from "next-auth/next";
import GoogleProvider  from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import type { NextAuthOptions } from "next-auth";

export const authoptions:NextAuthOptions ={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        })
    ]
}

const handler = NextAuth(authoptions)

export {handler as GET,handler as POST}

