import { Metadata } from "next"
import { fetchRecipes } from "@/actions/fetch-recipes-supabase"
import { Recipe } from "@/types"

import { Separator } from "@/components/ui/separator"
import { EmptyRecipePlaceholder } from "@/components/empty-placeholders"
import { UserRecipeCard } from "@/app/(site)/my-recipes/components/user-recipes"

export const metadata: Metadata = {
  title: "My recipes",
  description: "My saved recipes",
}

export const revalidate = 0

export default async function MyRecipesPage() {
  const userRecipes: Recipe[] = (await fetchRecipes()) as unknown as Recipe[]

  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <div className="col-span-3 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <div className="mx-auto space-y-1">
                    <h2 className="text-center text-2xl font-semibold tracking-tight">
                      Your saved recipes
                    </h2>
                  </div>
                </div>

                <div className="border-none p-0 outline-none">
                  {userRecipes.length > 0 ? (
                    <>
                      <Separator className="mx-auto my-4 w-1/2" />
                      <div className="relative ">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {userRecipes.map((recipe: Recipe) => (
                            <UserRecipeCard
                              key={recipe.id}
                              recipe={recipe}
                              className="w-[250px]"
                              aspectRatio="portrait"
                              width={250}
                              height={330}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <EmptyRecipePlaceholder />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
