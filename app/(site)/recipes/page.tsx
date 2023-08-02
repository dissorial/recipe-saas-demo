import { Metadata } from "next"
import { Subscription } from "@/types"

import { getSubscription } from "@/app/supabase-server"

import { RecipePageContent } from "./components/page-content"

export const metadata: Metadata = {
  title: "My recipes",
  description: "My saved recipes",
}

export const revalidate = 0

export default async function RecipePage() {
  const subscription = await getSubscription()

  return <RecipePageContent subscription={subscription as Subscription} />
}
