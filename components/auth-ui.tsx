"use client"

import { getURL } from "@/utils/helpers"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

import { Skeleton } from "@/components/ui/skeleton"

export function AuthUI() {
  const { supabaseClient, isLoading } = useSessionContext()

  return (
    <>
      {isLoading ? (
        <div className="mx-auto mt-8 flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="mb-4 h-12 w-[250px]" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-12 w-[250px]" />
            </div>
            <div>
              <Skeleton className="h-12 w-[250px]" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Auth
            supabaseClient={supabaseClient}
            providers={[]}
            redirectTo={`${getURL()}/auth/callback`}
            magicLink
            theme="dark"
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#404040",
                    brandAccent: "#22c55e",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  )
}
