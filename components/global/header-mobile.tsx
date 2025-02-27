"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface NavigationMobileProps {
  components: {
    title: string
    href: string
  }[]
  solutions: {
    title: string
    href: string
    description: string
  }[]
}

export function NavigationMobile({ components, solutions }: NavigationMobileProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>MediLink</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="solutions">
              <AccordionTrigger>Solutions</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {solutions.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm"
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="block text-muted-foreground">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {components.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="grid gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}