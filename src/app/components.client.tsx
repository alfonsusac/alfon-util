"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"



export function SidebarLinkButton(props: {
  href: string,
  children: ReactNode,
}) {
  const pathname = usePathname()
  const active = pathname === props.href
  return (
    <Link
      href={props.href}
      className={"button line-clamp-1 break-all" + (active ? " button-active" : "")}
    >
      {props.children}
    </Link>
  )
}


export function HomePageButton() {
  const pathname = usePathname()
  if (pathname === "/") return <></>
  return <Link href="/" className="button">
    {'<-'} Home
  </Link>
}