"use server"

import { createServerSupabaseClient, getSession } from "@/app/supabase-server"

export async function getApiLimit() {
  const [supabase, session] = await Promise.all([
    createServerSupabaseClient(),
    getSession(),
  ])

  const userId = session?.user?.id

  if (!userId) {
    return 0
  }

  try {
    const { data, error } = await supabase
      .from("user_api_limit")
      .select("api_calls")
      .eq("user_id", userId)

    if (error) {
      throw error
    }

    return data?.length > 0 ? data[0].api_calls : 0
  } catch (error) {
    console.error("Failed to get api limit", error)
    throw error
  }
}

export async function incrementUserApiCount() {
  const supabase = createServerSupabaseClient()
  const session = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const { data: currentData, error: currentError } = await supabase
    .from("user_api_limit")
    .select("api_calls")
    .eq("user_id", userId)

  if (currentError) {
    throw currentError
  }

  if (currentData && currentData.length > 0) {
    const currentApiCalls = currentData[0]?.api_calls ?? 0

    const { data: updatedData, error: updateError } = await supabase
      .from("user_api_limit")
      .update({ api_calls: currentApiCalls + 1 })
      .eq("user_id", userId)

    if (updateError) {
      throw updateError
    }

    return updatedData
  } else {
    const { data, error } = await supabase.from("user_api_limit").insert({
      user_id: userId,
      api_calls: 1,
    })

    if (error) {
      throw error
    }

    return data
  }
}
