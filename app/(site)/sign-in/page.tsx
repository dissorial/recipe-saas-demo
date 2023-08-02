import { redirect } from "next/navigation"

import { AuthUI } from "@/components/auth-ui"
import { getSession } from "@/app/supabase-server"

export default async function AuthenticationPage() {
  const session = await getSession()

  if (session) {
    return redirect("/recipes")
  }
  return (
    <div className="flex h-screen justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3">
        <h2 className="text-center text-3xl font-bold text-primary">
          Get started
        </h2>
        <AuthUI />
      </div>
    </div>
  )
}
