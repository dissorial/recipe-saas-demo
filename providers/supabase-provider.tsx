"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createClientComponentClient())
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") router.refresh()
    })

    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    fetchSession()

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
