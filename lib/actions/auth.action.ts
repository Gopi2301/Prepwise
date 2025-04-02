'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { toast } from "sonner";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds


export async function signUp(params:SignUpParams){
    const {uid, name, email} = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success:false,
                message:"User already exists"
            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        })
    } catch (e:any  ) {
        console.log("Error signing up:", e);
        if(e.code === 'auth/email-already-in-use'){
            return{
                success: false,
                message: "Email already in use"
            }
        }
        return {
            success: false,
            message: e.message
        }
    }
}

export async function signIn(params:SignInParams){
    const {email, password} = params;
    try {
        const userRecord= await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                success: false,
                message: "User does noe exist, Create an account"
            }
        }
        toast.success('Signed in successfully')
        await setSessionCookie(idToken);
        
    } catch (error) {
        console.log("Error signing in:", error);
        return{
            success: false,
            message: "Failed to login into an account"
        }
    }
}
export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK,
    })
    cookieStore.set('session',sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path:'/',
        sameSite: 'lax'
    })
}