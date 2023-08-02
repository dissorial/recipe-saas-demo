"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function AuthButton({ session }: { session?: any }) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const handleLogout = async () => {
    toast({
      description: "Logging out...",
    })

    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      toast({
        description: "An error occurred during logout.",
      })
      console.log(error)
    } else {
      toast({
        description: "You have been logged out.",
      })
      router.refresh()
    }
  }

  return (
    <>
      {session ? (
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Sign out
        </Button>
      ) : (
        <Button asChild className="mr-2" variant="secondary">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
    </>
  )
}
