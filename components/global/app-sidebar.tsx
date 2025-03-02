"use client"

import { 
  Pill, 
  Home, 
  PackageSearch, 
  Building2, 
  Users2, 
  ClipboardList, 
  Activity, 
  QrCode,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSection } from "@/components/navigation/nav-section"
import { NavProfile } from "@/components/navigation/nav-profile";
import ManageProfile from "@/components/supaauth/manage-profile";
import Image from "next/image";
import { useAuth } from "@/lib/context/auth-context";


const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  }
]

const donorItems = [
  {
    title: "Donor Dashboard",
    href: "/donor",
    icon: Building2,
    description: "Manage your donations",
  },
  {
    title: "Add Medication",
    href: "/donations/add",
    icon: Pill,
    description: "List new medications",
  },
  {
    title: "My Donations",
    href: "/donations",
    icon: PackageSearch,
    description: "View and manage donations",
  }
]

const ngoItems = [
  {
    title: "NGO Dashboard",
    href: "/ngo",
    icon: Users2,
    description: "NGO management portal",
  },
  {
    title: "Available Medications",
    href: "/medications",
    icon: PackageSearch,
    description: "Browse available medications",
  },
  {
    title: "My Requests",
    href: "/requests",
    icon: ClipboardList,
    description: "Manage medication requests",
  }
]

const trackingItems = [
  {
    title: "Active Shipments",
    href: "/tracking",
    icon: Activity,
    description: "Track active deliveries",
  },
  {
    title: "Scan QR Code",
    href: "/tracking/scan",
    icon: QrCode,
    description: "Scan medication QR codes",
  }
]

const adminItems = [
  {
    title: "Admin Dashboard",
    href: "/admin/dashboard",
    icon: ShieldCheck,
    description: "Platform administration",
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users2,
    description: "Manage platform users",
  },
  {
    title: "Verifications",
    href: "/admin/verification",
    icon: ClipboardList,
    description: "Verify organizations",
  }
]

export function AppSidebar() {

  const { user } = useAuth()

  if (!user) return null
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <Image 
            src="/medilink-logo.webp" 
            alt="MediLink" 
            width={80} 
            height={80}
          />
          <h1 className="text-sm font-semibold">MediLink</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-2">
          <NavSection 
            label="Navigation" 
            items={navigationItems} 
          />
          <NavSection 
            label="Donor Tools"
            items={donorItems}
            collapsible
            icon={Building2}
            collapsibleTitle="Donor Portal"
          />
          <NavSection 
            label="NGO Tools"
            items={ngoItems}
            collapsible
            icon={Users2}
            collapsibleTitle="NGO Portal"
          />
          <NavSection 
            label="Tracking"
            items={trackingItems}
            collapsible
            icon={Activity}
            collapsibleTitle="Tracking Tools"
          />
          <NavSection 
            label="Administration"
            items={adminItems}
            collapsible
            icon={ShieldCheck}
            collapsibleTitle="Admin Tools"
          />
        </div>
      </SidebarContent>
      <SidebarFooter className="px-2">
          <NavProfile user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
          // {/* <ManageProfile /> */}

  )
} 