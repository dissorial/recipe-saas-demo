import Link from "next/link"
import { redirect } from "next/navigation"
import updateEmail from "@/actions/stripe-supabase/updateEmail"
import updateName from "@/actions/stripe-supabase/updateName"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ManageSubscriptionButton from "@/app/(site)/account/components/manage-subscription"
import {
  getSession,
  getSubscription,
  getUserDetails,
} from "@/app/supabase-server"

import { FormButton } from "./components/form-button"

export const revalidate = 0

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ])

  const user = session?.user

  if (!session) {
    return redirect("/signin")
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100)

  return (
    <section className="flex flex-col justify-center gap-x-4 gap-y-6 p-4 lg:flex-row">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Your plan</CardTitle>
          <CardDescription>
            {subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : "You are not currently subscribed to any plan."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice} / ${subscription?.prices?.interval}`
            ) : (
              <Button asChild className="w-full" variant="secondary" size="sm">
                <Link href="/plans">Explore plans</Link>
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <ManageSubscriptionButton session={session} />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Your name</CardTitle>
          <CardDescription>
            Please enter your full name, or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form id="nameForm" action={updateName}>
            <Input
              type="text"
              name="name"
              className="rounded-md bg-zinc-800 p-3"
              defaultValue={userDetails?.full_name ?? ""}
              placeholder="Your name"
              maxLength={64}
            />
          </form>
        </CardContent>
        <CardFooter>
          <FormButton formName="nameForm" buttonLabel="Update name" />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Your email</CardTitle>
          <CardDescription>
            Please enter the email address you want to use to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form id="emailForm" action={updateEmail}>
            <Input
              type="text"
              name="email"
              className="rounded-md bg-zinc-800 p-3"
              defaultValue={user ? user.email : ""}
              placeholder="Your email"
              maxLength={64}
            />
          </form>
        </CardContent>
        <CardFooter>
          <FormButton formName="emailForm" buttonLabel="Update email" />
        </CardFooter>
      </Card>
    </section>
  )
}
