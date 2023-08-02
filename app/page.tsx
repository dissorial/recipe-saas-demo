import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function IndexPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center">
      <PageHeader className="pb-8">
        <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
          <span className="sm:inline">
            Featuring detailed nutritional information
          </span>
        </div>
        <PageHeaderHeading>Find the perfect recipes</PageHeaderHeading>
        <PageHeaderDescription className="mt-4">
          Search through a curated list of low-carb/keto recipes and save
          valuable time.
        </PageHeaderDescription>
        <div className="pb-8 pt-4 md:pb-10">
          <Button asChild>
            <Link href="/sign-in">Get started</Link>
          </Button>
        </div>
      </PageHeader>
    </div>
  )
}
