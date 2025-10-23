"use client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <div className="flex min-h-screen w-screen">
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">{children}</div>
        </main>
      </div>
  )
}
