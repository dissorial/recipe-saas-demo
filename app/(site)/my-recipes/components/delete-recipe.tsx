"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteRecipe } from "@/actions/delete-recipe-supabase"
import { Recipe } from "@/types"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function DeleteRecipe({ recipe }: { recipe: Recipe }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteRecipe(recipe.id)
      toast({
        title: "Recipe deleted",
      })
      setIsDeleted(true)
      router.refresh()
    } catch (error) {
      toast({
        title: "Failed to delete recipe",
      })
      console.error(error)
      setIsDeleted(false)
      setErrorMessage("Failed to delete recipe.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-between space-y-2 sm:flex-row">
        <h3 className="text-center text-lg font-medium">{recipe?.name}</h3>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          size="sm"
          variant="destructive"
        >
          {isDeleting ? (
            <div className="flex flex-row items-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </div>
          ) : errorMessage ? (
            <div className="text-red-500">{errorMessage}</div>
          ) : isDeleted ? (
            <div>Deleted</div>
          ) : (
            <div>Delete</div>
          )}
        </Button>
      </div>
      <Separator />
    </>
  )
}
