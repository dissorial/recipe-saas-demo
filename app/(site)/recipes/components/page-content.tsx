"use client"

import { useState } from "react"
import { Metadata } from "next"
import { getApiLimit, incrementUserApiCount } from "@/actions/api-limits"
import { Recipe, Recipes, Subscription } from "@/types"
import { SEARCH_LIMITS } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  EmptySearchPlaceholder,
  LoadingPlaceholder,
} from "@/components/empty-placeholders"
import { RecipeCard } from "@/app/(site)/recipes/components/recipe-card"

const FormSchema = z.object({
  query: z.string(),
})

export function RecipePageContent({
  subscription,
}: {
  subscription: Subscription | null
}) {
  const [recipeData, setRecipeData] = useState<Recipes>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = data.query
    try {
      const count = await getApiLimit()
      const productName = subscription?.prices?.products?.name
      const searchLimit = productName
        ? SEARCH_LIMITS[productName]
        : SEARCH_LIMITS["Default"]

      if (count !== null && count >= searchLimit) {
        toast({
          title: "Search limit reached",
          description: "Please upgrade your plan to continue",
        })
        return
      }
      await incrementUserApiCount()

      const response = await fetch(`/api/recipes`, {
        method: "POST",
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setRecipeData(data)
    } catch (error) {
      console.log("error")
    }
  }

  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <div className="col-span-3 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <div className="mx-auto w-4/5 space-y-6 sm:w-1/2 lg:w-1/3">
                    <h2 className="text-center text-2xl font-semibold tracking-tight">
                      Find recipes
                    </h2>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                      >
                        <FormField
                          control={form.control}
                          name="query"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="E.g. chicken, beef, fish, etc."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Search
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>

                <div className="border-none p-0 outline-none">
                  {isLoading ? (
                    <LoadingPlaceholder />
                  ) : recipeData.length > 0 ? (
                    <>
                      <Separator className="mx-auto my-4 w-1/2" />
                      <div className="relative">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {recipeData.map((recipe: Recipe) => (
                            <RecipeCard
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
                    <EmptySearchPlaceholder />
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
