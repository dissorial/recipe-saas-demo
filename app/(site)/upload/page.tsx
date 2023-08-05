"use client"

import { uploadImage } from "@/actions/upload"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Button } from "@/components/ui/button"

import { SupaAvatar } from "./avatar"

export default function UploadPage() {
  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    const updates = {
      avatarUrl,
    }

    console.log("updates", updates)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <SupaAvatar
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url)
        }}
      />
    </form>
  )
}
