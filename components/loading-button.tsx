"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { useMounted } from "@/hooks/useMounted"

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    // const { pending } = useFormStatus()
    const pending = false
    const mounted = useMounted()

    if (!mounted)
      return (
        <Skeleton
          className={cn(
            buttonVariants({ variant, size, className }),
            "bg-muted text-muted-foreground"
          )}
        >
          {props.children}
        </Skeleton>
      )

    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      >
        {pending && (
          <Icons.spinner
            className="w-4 h-4 mr-2 animate-spin"
            aria-hidden="true"
          />
        )}
        {props.children}
      </Button>
    )
  }
)
LoadingButton.displayName = "LoadingButton"

export { LoadingButton }