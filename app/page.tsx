"use client"

import { useState } from "react"
import Image from "next/image"
import { Subscription } from "@/types"
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
import { Textarea } from "@/components/ui/textarea"
import { LoadingPlaceholder } from "@/components/empty-placeholders"

const FormSchema = z.object({
  query: z.string(),
})

export default function SomePage({
  subscription,
}: {
  subscription: Subscription | null
}) {
  const [imageData, setImageData] = useState<string>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = data.query
    try {
      const response = await fetch(`/api/dezgo`, {
        method: "POST",
        body: JSON.stringify({ query }),
      })
      const blob = await response.blob()
      const objectURL = URL.createObjectURL(blob)

      setImageData(objectURL)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("imagedata", typeof imageData)

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
                      Generate images
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
                                  placeholder="Astronaut on the moon"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Generate
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>

                <div className="border-none p-0 outline-none">
                  <div className="mx-auto w-full">
                    {isLoading ? (
                      <LoadingPlaceholder />
                    ) : (
                      <>
                        {imageData && (
                          <>
                            <Image
                              src={imageData}
                              alt="Generated image"
                              width={300}
                              height={300}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
