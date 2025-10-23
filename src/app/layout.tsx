import type { Metadata } from "next"
import "./globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Ninna Hub",
  description: "Plataforma de Inovação Aberta",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script src='https://www.noupe.com/embed/019a0dadfeca7be39f9b8a6460010c08e808.js'> </script>
        </ThemeProvider>
      </body>
    </html>
  )
}
