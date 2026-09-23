import { get_content, get_content_list } from "@/lib/get-content"
import { CodeBlock } from "@/ui/code-block"
import { Markdown } from "@/ui/markdown"
import { Suspense } from "react"
import { ConsoleBlock } from "../components"
import { CONTENT_PATH } from "@/lib/get-content-tree"

export async function generateStaticParams() {
  const content_list = await get_content_list()
  const params = content_list
    .filter(node => node.type === "file")
    .map(node => {
      return { slug: node.path.replace(CONTENT_PATH, '').slice(1).split('/') }
    })
  console.log(params)
  return params
}

export default function EntryPage(props: PageProps<'/[...slugs]'>) {
  return <>
    <Suspense fallback={<>Loading...</>}>
      <EntryPageAsync {...props} />
    </Suspense>
  </>
}

async function EntryPageAsync(props: PageProps<"/[...slugs]">) {
  const params = await props.params
  const slugs = params.slugs
  const path = slugs.join('/')
  const { code, meta, raw } = await get_content(path)

  return <>
    <header>
      <p className="text-sm">
        /{path}
      </p>
      <h1 className="text-3xl font-medium tracking-tight">
        {slugs.at(-1)}
      </h1>
      <p className="max-w-120">
        {meta?.description}
      </p>
    </header>

    <section className="flex flex-col gap-2">
      <CodeBlock code={code} lang="tsx" className="max-h-[calc(100vh-30rem)] min-h-60" />
      {meta?.details &&
        <Markdown
          className="my-6"
          md={meta.details}
        />
      }
    </section>

    {meta &&
      <section className="flex flex-col gap-2">
        <h2 className="text-xl">Usage</h2>
        <div className="flex flex-col gap-12">
          {meta.examples?.map((e, e_i) => {
            return <div className="flex flex-col gap-2" key={e_i}>
              <Markdown md={e.name} />
              <div className="flex flex-col">
                <CodeBlock code={e.code ?? ''} lang="tsx" />
                <ConsoleBlock output={e.output ?? []} borderTop={false} />
              </div>
            </div>
          })}
        </div>
      </section>
    }

  </>
}