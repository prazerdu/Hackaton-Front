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
          <GoogleOAuthProvider clientId="508255138569-ts5q61ksnrijq1idtiondlbn4rccec3s.apps.googleusercontent.com">
            {children}
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
