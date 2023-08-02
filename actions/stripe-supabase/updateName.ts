"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { Database } from "@/types_db"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import { getSession } from "@/app/supabase-server"

const updateName = async (formData: FormData) => {
  const newName = formData.get("name") as string
  const supabase = createServerActionClient<Database>({ cookies })
  const session = await getSession()
  const user = session?.user
  const { error } = await supabase
    .from("users")
    .update({ full_name: newName })
    .eq("id", user?.id)
  if (error) {
    console.log(error)
  }
  revalidatePath("/account")
}

export default updateName
