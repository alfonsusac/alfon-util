"use client"
import { cn } from "cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type CSSProperties, type ReactNode } from "react"



// export function SidebarLinkButton(props: {
//   href: string,
//   children: ReactNode,
//   className?: string,
//   style?: CSSProperties
// }) {
//   const pathname = usePathname()
//   const active = pathname === props.href
//   return (
//     <Link
//       href={props.href}
//       className={cn(
//         "button line-clamp-1 break-all",
//         active && "button-active",
//         props.className
//       )}
//       style={props.style}
//     >
//       {props.children}
//     </Link>
//   )
// }


export function HomePageButton() {
  const pathname = usePathname()
  if (pathname === "/") return <></>
  return <Link href="/" className="button">
    {'<-'} Home
  </Link>
}