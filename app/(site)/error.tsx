"use client"

import { CrossCircledIcon } from "@radix-ui/react-icons"

export default function Error() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex  flex-col items-center justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <CrossCircledIcon className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-semibold">Something went wrong</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
