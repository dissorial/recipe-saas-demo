import { SecondaryNav } from "@/components/secondary-nav"

interface SiteLayoutProps {
  children: React.ReactNode
}

// export const dynamic = "force-dynamic"
export const revalidate = 0

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <div className="container relative py-10">
        <SecondaryNav />

        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            {children}
          </div>
        </section>
      </div>
    </>
  )
}
