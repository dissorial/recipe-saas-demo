"use client"

import { useRouter } from "next/navigation"
import { postData } from "@/utils/helpers"
import { Session } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"

interface Props {
  session: Session
}

export default function ManageSubscriptionButton({ session }: Props) {
  const router = useRouter()
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      })
      router.push(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
  }

  return (
    <Button
      disabled={!session}
      onClick={redirectToCustomerPortal}
      className="w-full"
      size="sm"
    >
      Open customer portal
    </Button>
  )
}
