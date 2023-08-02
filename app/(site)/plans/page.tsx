import { Subscription } from "@/types"

import {
  getActiveProductsWithPrices,
  getSubscription,
} from "@/app/supabase-server"

import ProductsContent from "./components/products"

export const revalidate = 0

export default async function PlansPage() {
  const [products, subscription] = await Promise.all([
    getActiveProductsWithPrices(),
    getSubscription(),
  ])

  return (
    <div className="items-center justify-center gap-6 rounded-lg p-8">
      <ProductsContent
        subscription={subscription as Subscription}
        products={products}
      />
    </div>
  )
}
