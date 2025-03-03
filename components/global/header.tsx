"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./theme-switcher"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { NavigationMobile } from "./header-mobile"

const components = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Impact",
    href: "/#impact",
  },
]

const solutions = [
  {
    title: "Donor Portal",
    href: "/donor",
    description: "Manage your medical donations and track their impact",
  },
  {
    title: "NGO Portal",
    href: "/ngo",
    description: "Access available medications and manage requests",
  },
  {
    title: "Add Medication",
    href: "/donations/add",
    description: "List new medications for donation",
  },
  {
    title: "Available Medications",
    href: "/medications",
    description: "Browse and request available medical supplies",
  },
  {
    title: "Tracking Center",
    href: "/tracking",
    description: "Real-time tracking and monitoring of medical donations",
  },
  {
    title: "QR Verification",
    href: "/tracking/scan",
    description: "Scan and verify medication authenticity",
  },
]


export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/medilink-logo.webp" alt="MediLink logo" width={50} height={50} />
            <span className="text-xl font-bold">MediLink</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {components.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {solutions.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <nav className="flex items-center space-x-4">
          <div className="md:hidden">
            <NavigationMobile components={components} solutions={solutions} />
          </div>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"