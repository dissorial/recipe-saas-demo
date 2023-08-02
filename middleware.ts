import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/types_db"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const redirectUrl = req.nextUrl.clone()
  if (!session && redirectUrl.pathname !== "/") {
    redirectUrl.pathname = "/sign-in"
    return NextResponse.redirect(redirectUrl)
  }
  if (session && redirectUrl.pathname == "/") {
    redirectUrl.pathname = "/recipes"
    return NextResponse.redirect(redirectUrl)
  }
  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico|sign-in|^/$).*)"],
}
