import { get_util_filenames, get_util_raw_code } from "@/lib/get-utils"
import { transformerTwoslash } from "@shikijs/twoslash"
import { Suspense } from "react"
import { codeToHtml, type BundledLanguage } from "shiki"
import { createTwoslasher } from "twoslash"

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

const twoslasher = createTwoslasher({
  extraFiles: await (async () => {
    const filenames = await get_util_filenames('createTwoslasher')
    const entries: [ string, string ][] = []
    for (const filesname of filenames) {
      const [ content, raw ] = await get_util_raw_code('createTwoslasher', filesname)
      entries.push([ filesname, content ])
    }
    return Object.fromEntries(entries)
  })()
})



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
