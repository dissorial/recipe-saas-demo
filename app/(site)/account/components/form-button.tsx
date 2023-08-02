"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Props {
  formName: string | undefined
  buttonLabel: string | null | undefined
}

export function FormButton({ formName, buttonLabel }: Props) {
  return (
    <Button
      type="submit"
      form={formName}
      className="w-full"
      onClick={() =>
        toast({
          title: "Successfully updated",
        })
      }
    >
      {buttonLabel}
    </Button>
  )
}
