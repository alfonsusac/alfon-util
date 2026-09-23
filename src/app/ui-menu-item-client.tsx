"use client"

import { cn } from "cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, ReactNode } from "react"


const itemCn = cn("button line-clamp-1 break-all")

export function MenuItem(props: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  const active = pathname === props.href
  return (
    <Link
      href={props.href}
      className={cn(itemCn, active && "button-active", props.className)}
      style={props.style}
    >
      {props.children}
    </Link>
  )
}
