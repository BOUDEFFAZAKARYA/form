import * as React from "react"
import { type Option } from "@/types"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { type Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Filter rows"
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
        >
          <PlusCircledIcon className="w-4 h-4 mr-2" aria-hidden="true" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <Badge
                variant="secondary"
                className="px-1 font-normal rounded-sm lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="px-1 font-normal rounded-sm"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="px-1 font-normal rounded-sm"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} aria-hidden="true" />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="w-4 h-4 mr-2 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}