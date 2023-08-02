import Image from "next/image"
import { Recipe, nutrientNames, nutrientUnits } from "@/types"
import { cn } from "@/utils/cn"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SaveRecipe } from "./save-recipe"

interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recipe: Recipe
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function RecipeCard({
  recipe,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: RecipeCardProps) {
  return (
    <>
      <Dialog>
        <div className={cn("mx-auto space-y-3 px-4", className)} {...props}>
          <div className="overflow-hidden rounded-md">
            <DialogTrigger asChild>
              <Image
                src={recipe?.image ?? "/images/placeholder.png"}
                alt={recipe.name}
                width={width}
                loading="lazy"
                height={height}
                className={cn(
                  "h-auto w-auto cursor-pointer object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </DialogTrigger>
          </div>

          <div className="space-y-1 text-sm">
            <h3 className="font-medium leading-none">{recipe?.name}</h3>
          </div>
        </div>
        <DialogContent className="sm:max-w-[600px]">
          <Tabs defaultValue="recipe">
            <TabsList>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
            </TabsList>
            <TabsContent value="recipe" className="flex flex-col">
              <SaveRecipe recipe={recipe} />

              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  <div className="space-y-2 py-2">
                    <h3 className="text-lg font-medium">Tags</h3>
                    <div className="space-y-2">
                      {recipe?.tags?.map((tag, index) => {
                        return (
                          <Badge key={index} className="mr-2">
                            {tag}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 py-2">
                    <h3 className="text-lg font-medium">Instructions</h3>
                    {recipe?.steps?.map((step, index) => {
                      return (
                        <div
                          key={index}
                          className="align-center flex items-start justify-center py-1"
                        >
                          <div className="w-full text-sm text-muted-foreground">
                            {`${index + 1}.  ${step}`}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="ingredients">
              <ScrollArea className="h-[400px]">
                <div className="">
                  {recipe?.ingredients?.map((ingredient, index) => {
                    return (
                      <div
                        className="flex items-center border-b py-2 pr-4"
                        key={index}
                      >
                        <div className="w-3/5 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {ingredient.name}
                          </p>
                        </div>
                        <div className="ml-auto  text-right">
                          <p className="text-sm text-muted-foreground">
                            Qty: {ingredient.servingSize.qty}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Unit: {ingredient.servingSize.units}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="nutrients">
              <ScrollArea className="h-[400px]">
                <div className="">
                  {Object.entries(recipe?.nutrients || {}).map(
                    ([key, value]) => {
                      const unit = nutrientUnits[key]
                      const name = nutrientNames[key] || key
                      return (
                        <div
                          className="flex items-center border-b py-2 pr-4"
                          key={key}
                        >
                          <div className="w-3/5 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {name}
                            </p>
                          </div>
                          <div className="ml-auto  text-right">
                            <p className="text-sm text-muted-foreground">
                              {value} {unit}
                            </p>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
