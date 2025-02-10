import type React from "react"
import StyledComponentsRegistry from "@/lib/registry"
import "@/styles/globals.css"

export const metadata = {
  title: "Love Story",
  description: "A personalized interactive love story",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}



import './globals.css'