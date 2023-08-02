"use server"

import { Recipe } from "@/types"

import { createServerSupabaseClient, getSession } from "@/app/supabase-server"

export async function upsertRecipe(recipe: Recipe) {
  const supabase = createServerSupabaseClient()
  const session = await getSession()
  const userId = session?.user?.id

  if (!userId || !recipe) {
    return []
  }

  try {
    const { data, error } = await supabase.from("user_recipes").insert({
      user_id: userId,
      recipe: JSON.parse(JSON.stringify(recipe)),
      recipe_id: recipe.id,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    return []
  }
}
