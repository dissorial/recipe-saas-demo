"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { Database } from "@/types_db"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

const updateEmail = async (formData: FormData) => {
  const newEmail = formData.get("email") as string
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.auth.updateUser({ email: newEmail })
  if (error) {
    console.log(error)
  }
  revalidatePath("/account")
}

export default updateEmail
