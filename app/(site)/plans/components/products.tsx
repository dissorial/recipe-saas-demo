"use client"

import React, { useState } from "react"
import { Price, ProductWithPrice, Subscription } from "@/types"
import { cn } from "@/utils/cn"
import { postData } from "@/utils/helpers"
import { getStripe } from "@/utils/stripe-client"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface SubscribeModalProps {
  products: ProductWithPrice[]
  subscription: Subscription | null
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

const ProductsContent: React.FC<SubscribeModalProps> = ({
  subscription,
  products,
}) => {
  const { session, isLoading } = useSessionContext()
  const user = session?.user
  const [priceIdLoading, setPriceIdLoading] = useState<string>()

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)
    if (!user) {
      setPriceIdLoading(undefined)
      return toast({
        title: "Must be logged in",
      })
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast({
        title: "Already subscribed",
      })
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return toast({
        title: "Error",
      })
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  let content = <div className="text-center">No products available.</div>

  const productDescriptions = [
    {
      name: "Premium plan",
      description: "This is a description for product 1.",
    },
    {
      name: "Super premium",
      description: "This is a description for product 2.",
    },
    {
      name: "Ultra premium",
      description: "This is a description for product 3.",
    },
  ]

  if (products.length) {
    content = (
      <div className="flex flex-col items-center justify-center gap-x-12 gap-y-8 md:flex-row">
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>
          }

          return product.prices.map((price) => (
            <Card key={price.id} className="w-full md:w-1/3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{`${formatPrice(price)} / ${
                  price.interval?.charAt(0).toUpperCase() +
                  (price.interval ? price.interval.slice(1) : "")
                }`}</div>
                <CardDescription className="mt-2 text-xs text-muted-foreground">
                  {
                    productDescriptions.find(
                      (productDescription) =>
                        productDescription.name === product.name
                    )?.description
                  }
                </CardDescription>
                <Button
                  onClick={() => handleCheckout(price)}
                  disabled={isLoading || price.id === priceIdLoading}
                  className="mt-4"
                >
                  {subscription && subscription.price_id === price.id
                    ? "You're on this plan"
                    : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>
  }

  return <DemoContainer>{content}</DemoContainer>
}

export default ProductsContent
