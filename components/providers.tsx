"use client"

import * as React from "react"
import SupabaseProvider from "@/providers/supabase-provider"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SupabaseProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </SupabaseProvider>
  )
}
