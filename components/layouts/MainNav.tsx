
"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"
import Logo from "../Logo"
import { NavItem } from "@/types"


function MainNav() {

    const items: NavItem[] = [
        {
            title: "Courses",
            href: "/Courses",
            icon: "avatar",
            items: [
                {
                    title: "Next js",
                    href: "/dashboard/nextjs",
                    icon: "store",
                },

                {
                    title: "node js",
                    href: "/dashboard/nodejs",
                    icon: "store",
                }, {
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
            items: []
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "credit",
            items: []

        },
        {
            title: "Purchases",
            href: "/dashboard/purchases",
            icon: "dollarSign",
            items: []

        }
    ]

    return (
        <div className="hidden gap-6 lg:flex">

            <Logo />


            <div className="flex items-center text-center">

            <NavigationMenu>
                <NavigationMenuList>
                    {items?.[0]?.items ? (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="h-auto">
                                {items[0].title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">

                                    {items[0].items.map((item) => (
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
                    ) : null}
                    {items
                        ?.filter((item) => item.title !== items[0]?.title)
                        .map((item) =>
                            item?.items ? (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuTrigger className="h-auto capitalize">
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {item.items.map((item) => (
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
                            ) : (
                                item.href && (
                                    <NavigationMenuItem key={item.title}>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(navigationMenuTriggerStyle(), "h-auto")}
                                            >
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                )
                            )
                        )}
                </NavigationMenuList>
            </NavigationMenu>
            <Link href={"/blog"} legacyBehavior passHref>
                Blog
            </Link>
            

                                           
            </div>



        </div>)
}
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={String(href)}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default MainNav