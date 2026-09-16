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

export function CodeBlock(props: {
  code: string,
  lang: BundledLanguage,
}) {
  let code = props.code.trim()

  if (code.includes('// ---cut-before---\n')) {
    code = code.split('// ---cut-before---\n')[ 1 ]
  }

  const bare_code = <div>
    <pre className="shiki">
      <code>
        {code.split('\n').map((line, line_i) => {
          return <span key={line_i} className="line">
            {line}{'\n'}
          </span>
        })}
      </code>
    </pre>
  </div>

  return <div
    className="flex flex-col border border-fg/10  relative"
  >
    <div className="flex justify-end absolute top-0 right-0">
      <button className="button text-xs self-start m-0! leading-6">Copy</button>
    </div>
    <div className="p-4 overflow-auto text-sm">
      <Suspense fallback={bare_code}>
        <CodeBlockWithShiki
          code={code}
          untransformed_code={props.code}
          lang={props.lang}
        />
      </Suspense>
    </div>
  </div>
}

async function CodeBlockWithShiki(props: {
  code: string,
  untransformed_code: string
  lang: BundledLanguage,
}) {
  const html = await codeToHtml(props.code, {
    lang: props.lang,
    theme: "github-dark-dimmed",
  })

  return <Suspense fallback={
    <div dangerouslySetInnerHTML={{ __html: html }} />
  }>
    <CodeBlockWithShikiTwoslash {...props} />
  </Suspense>
}

const twoslasher = createTwoslasher()

async function CodeBlockWithShikiTwoslash(props: {
  code: string,
  untransformed_code: string
  lang: BundledLanguage,
}) {
  const html = await codeToHtml(props.untransformed_code, {
    lang: props.lang,
    theme: "github-dark-dimmed",
    transformers: [
      transformerTwoslash({ twoslasher })
    ]
  })
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}


export async function ConsoleBlock(props: {
  output: string[],
  borderTop?: boolean,
}) {
  return <div className={"p-4 text-sm font-mono border border-fg/10 " + (props.borderTop ? "" : "border-t-0")}>
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
