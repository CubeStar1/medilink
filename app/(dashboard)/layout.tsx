import { Metadata } from "next"
import { AppSidebar } from "@/components/global/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"

export const metadata: Metadata = {
  title: "Dashboard - Medicine Chain",
  description: "Medicine Chain Dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <main className="">
        <Breadcrumbs />
        {/* <Header /> */}
        {children}
      </main>
    </SidebarInset>
  </SidebarProvider>
  )
} 