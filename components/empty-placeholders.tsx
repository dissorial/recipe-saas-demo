import { EyeNoneIcon, ReloadIcon, ShadowNoneIcon } from "@radix-ui/react-icons"

export function EmptyRecipePlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <ShadowNoneIcon className="h-12 w-12 text-gray-400" />

        <h3 className="mt-4 text-lg font-semibold">No saved recipes</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not saved any recipes yet.
        </p>
      </div>
    </div>
  )
}

export function LoadingPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex  flex-col items-center justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Searching recipes...</h3>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmptySearchPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <EyeNoneIcon className="h-12 w-12 text-gray-400" />

        <h3 className="mt-4 text-lg font-semibold">Nothing to display</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          Try searching for a recipe.
        </p>
      </div>
    </div>
  )
}
