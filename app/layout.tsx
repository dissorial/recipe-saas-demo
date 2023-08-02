import "@/styles/globals.css"
import { cn } from "@/utils/cn"
import { fontSans } from "@/utils/fonts"

import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { Providers } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface RootLayoutProps {
  children: React.ReactNode
}

export const revalidate = 0

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-head-element */}
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </Providers>
          <Analytics />
          <Toaster />
        </body>
      </html>
    </>
  )
}
