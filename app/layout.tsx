import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"

const lexend = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Data Structures Visualizer",
  description: "Interactive visualizations of common data structures",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  )
}


import './globals.css'