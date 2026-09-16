import { CodeBlock, ConsoleBlock, MutedText } from "@/app/components"
import { get_util, get_util_filenames, get_util_meta, get_util_raw_code } from "@/lib/get-utils"
import { Markdown } from "@/ui/markdown"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateStaticParams() {
  const utils = await get_util_filenames("util-page-gsp")
  return utils.map(u => ({ slug: u }))
}

export default function UtilPage(props: PageProps<'/utils/[slug]'>) {
  return <Suspense fallback="Loading...">
    <UtilPageSuspensed {...props} />
  </Suspense>
}

async function UtilPageSuspensed(props: PageProps<'/utils/[slug]'>) {
  const slug = (await props.params).slug
  const utils = await get_util_filenames("UtilPageSuspensed")
  const util_filename = utils.find(u => u === slug)
  if (!util_filename) return notFound()
  const util = await get_util("UtilPageSuspensed", slug)
  const util_content = await get_util_raw_code("UtilPageSuspensed", slug)
  const util_meta = await get_util_meta("UtilPageSuspensed", slug, util_content)
  return <>
    <header>
      <p className="text-sm">
        /util/{util.filename}
      </p>
      <h1 className="text-3xl font-medium tracking-tight">
        {util.filename}
      </h1>
      <p className="max-w-120">
        {util_meta?.description ?? <MutedText>no description provided.</MutedText>}
      </p>
    </header>

    <section className="flex flex-col gap-2">
      <CodeBlock code={util_content} lang="tsx" />
      {util_meta?.details &&
        <Markdown
          className="my-6"
          md={util_meta.details}
        />
      }
    </section>

    {util_meta &&
      <section className="flex flex-col gap-2">
        <h2 className="text-xl">Usage</h2>
        <div className="flex flex-col gap-12">
          {util_meta.examples?.map((e, e_i) => {
            return <div className="flex flex-col gap-2" key={e_i}>
              {e.name}
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