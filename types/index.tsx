import { Icons } from "@/components/icons";
import { userPrivateMetadataSchema } from "@/lib/validations/auth";
import { z } from "zod";

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

