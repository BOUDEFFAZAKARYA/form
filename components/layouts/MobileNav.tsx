"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { Icon } from '@iconify/react';
import { NavItem } from "@/types"

export function MobileNav() {

  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState(false)
  
  const Sideitems:NavItem[] =   [
    {
      title: "Courses",
      href: "/Courses",
      icon: "avatar",
      items:[
        {
        title: "Next js",
        href: "/dashboard/nextjs",
        icon: "store",
      },

      {
        title: "node js",
        href: "/dashboard/nodejs",
        icon: "store",
      },  {
        title: "Docker",
        href: "/dashboard/Docker",
        icon: "store",
      }  
    ]

    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
      items:[]
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "credit",
      items:[]

    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",
      icon: "dollarSign",
       items:[]

    }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <ViewVerticalIcon className="w-6 h-6" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="w-4 h-4 mr-2" aria-hidden="true" />
            <span className="font-bold">Zakroon</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion
              type="multiple"
              defaultValue={Sideitems.map((item) => item.title)}
              className="w-full"
            >
              {Sideitems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            segment={String(segment)}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="transition-colors text-foreground/70"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>           
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  segment: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}