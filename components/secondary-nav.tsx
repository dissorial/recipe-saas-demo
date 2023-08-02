"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const navItems = [
  {
    name: "Recipes",
    href: "/recipes",
  },
  {
    name: "Saved",
    href: "/my-recipes",
  },
  {
    name: "Plans",
    href: "/plans",
  },
  {
    name: "Account",
    href: "/account",
  },
]

interface SecondaryNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SecondaryNav({ className, ...props }: SecondaryNavProps) {
  const pathname = usePathname()
  const { session } = useSessionContext()

  return (
    <div className="relative">
      {session && (
        <ScrollArea className="max-w-[600px] lg:max-w-none">
          <div className={cn("mb-4 flex items-center", className)} {...props}>
            {navItems.map((navItem) => (
              <Link
                href={navItem.href}
                key={navItem.href}
                className={cn(
                  "flex items-center px-4",
                  pathname?.startsWith(navItem.href)
                    ? "font-bold text-primary"
                    : "font-medium text-muted-foreground"
                )}
              >
                {navItem.name}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      )}
    </div>
  )
}
