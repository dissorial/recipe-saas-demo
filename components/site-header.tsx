import Link from "next/link"
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { getSession } from "@/app/supabase-server"

export async function SiteHeader() {
  const session = await getSession()

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        {session && <MobileNav />}

        <p className="ml-2 text-sm font-medium md:hidden">Recipe Compass</p>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <AuthButton session={session} />
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <TwitterLogoIcon className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <GitHubLogoIcon className="h-5 w-5 fill-current" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
