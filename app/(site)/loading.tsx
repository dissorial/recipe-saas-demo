"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

export default function Loading() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex  flex-col items-center justify-center text-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <DotsHorizontalIcon className="mr-2 h-8 w-8 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  )
}
