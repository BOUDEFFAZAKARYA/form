import { Icons } from "@/components/icons";
import { userPrivateMetadataSchema } from "@/lib/validations/auth";
import { z } from "zod";
import type {
  cartItemSchema,
  cartLineItemSchema,
  checkoutItemSchema,
} from "@/lib/validations/cart"
import { Store } from "@/db/schema";


export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
    description?: string
    items?:NavItem[]
  }

  export interface StoredFile {
    id: string
    name: string
    url: string
  }

  export interface CuratedStore {
    id: Store["id"]
    name: Store["name"]
    description?: Store["description"]
    stripeAccountId?: Store["stripeAccountId"]
    productCount?: number
  }

  export type CartItem = z.infer<typeof cartItemSchema>

export type CheckoutItem = z.infer<typeof checkoutItemSchema>


export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren
