"use server"

import { createServerSupabaseClient, getSession } from "@/app/supabase-server"

export async function deleteRecipe(recipeId: string) {
  const [supabase, session] = await Promise.all([
    createServerSupabaseClient(),
    getSession(),
  ])

  const userId = session?.user?.id

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    const { data, error } = await supabase.from("user_recipes").delete().match({
      recipe_id: recipeId,
      user_id: userId,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to delete recipe", error)
    throw error
  }
}
