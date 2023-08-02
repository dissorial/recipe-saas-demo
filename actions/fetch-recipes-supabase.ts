"use server"

import { type Json } from "@/types_db"

import { createServerSupabaseClient, getSession } from "@/app/supabase-server"

export async function fetchRecipes(): Promise<Json[]> {
  const supabase = createServerSupabaseClient()
  const session = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("user_recipes")
      .select("recipe")
      .eq("user_id", userId)

    if (error) {
      throw error
    }

    const recipes = data.map((item) => item.recipe)

    return recipes
  } catch (error) {
    return []
  }
}
