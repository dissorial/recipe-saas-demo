"use client"

import { useState } from "react"
import { upsertRecipe } from "@/actions/upsert-recipe-supabase"
import { Recipe } from "@/types"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function SaveRecipe({ recipe }: { recipe: Recipe }) {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await upsertRecipe(recipe)
      toast({
        title: "Saved!",
      })
      setIsSaved(true)
    } catch (error) {
      console.error(error)
      setIsSaved(false)
      setErrorMessage("Failed to save recipe. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-between space-y-2 sm:flex-row">
        <h3 className="text-center text-lg font-medium">{recipe?.name}</h3>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="sm"
          variant="secondary"
        >
          {isSaving ? (
            <div className="flex flex-row items-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </div>
          ) : errorMessage ? (
            <div className="text-red-500">{errorMessage}</div>
          ) : isSaved ? (
            <div>Saved</div>
          ) : (
            <div>Save</div>
          )}
        </Button>
      </div>
      <Separator />
    </>
  )
}
