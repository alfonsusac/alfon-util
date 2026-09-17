import { get_util_filenames } from "@/lib/get-utils"
import { SidebarLinkButton } from "./components.client"
import { Suspense, type ComponentProps } from "react"
import { cn } from "cn"
import { codeToHtml, type BundledLanguage } from "shiki"
import { createTwoslasher } from "twoslash"
import { transformerTwoslash } from '@shikijs/twoslash'
import Anser from "anser"


const c = (props: { className?: string }, ...c: any) => cn(props.className, ...c)

export function MutedText(props: ComponentProps<"span">) {
  return <span {...props} className={c(props, "text-fg/40")} />
}

export async function UtilList() {
  const utils = await get_util_filenames("components:util-list")
  return <>
    {
      utils.map(util => {
        return <SidebarLinkButton
          href={`/utils/${ util }`}
          key={util}
        >
          {util}
        </SidebarLinkButton>
      })
    }
  </>
}



export async function ConsoleBlock(props: {
  output: string[],
  borderTop?: boolean,
}) {
  return <div className={"p-4 text-sm font-mono border border-fg/10 overflow-x-auto " + (props.borderTop ? "" : "border-t-0")}>
    {props.output.map((line, line_id) => {
      const tokens = Anser.ansiToJson(line, {
        json: true,
        use_classes: true,
      })

      return <div key={line_id} className="flex gap-2">
        <span className="opacity-25">{'> '}</span>
        <div className="whitespace-pre">
          {tokens.map((token, token_id) => {
            return <span key={token_id}
              className={`${ token.fg } `}
            >
              {token.content}
            </span>
          })}
        </div>

      </div>
    })}
  </div>
}
