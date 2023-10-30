import Link from "next/link"
import type { User } from "@clerk/nextjs/server"
import {
  AvatarIcon,
  DashboardIcon,
  ExitIcon,
  GearIcon,
} from "@radix-ui/react-icons"

import { getUserEmail } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MainNav from "./MainNav"
import { MobileNav } from "./MobileNav"
import ThemeSwitcher from "../ThemeSwitcher"


interface SiteHeaderProps {
  user: User | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email = getUserEmail(user)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center h-16">
        <MobileNav  />
        <MainNav  />

        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-2">
          <ThemeSwitcher />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative w-8 h-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <AvatarIcon
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                        Account
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <DashboardIcon
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <GearIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <ExitIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
                <span className="sr-only">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}