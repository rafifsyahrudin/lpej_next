import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/sign-in")) {
        const token = await getToken({
            req
        })
    
        if (token) {
            return NextResponse.redirect(req.nextUrl.origin)   
        }
    }
}