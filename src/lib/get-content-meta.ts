import { formatWithOptions } from "util"

export async function get_content_meta(path: string, extracted_examples_with_original_code: { name: string, content: string }[]) {
  const module = await import(`../content/${ path }`)
  const meta = module.meta as Meta
  if (!meta)
    return null

  const description = module.meta?.description

  const examples = await Promise.all(
    (meta.examples ?? [])
      .map(async (e, e_i) => {
        let example_code = extracted_examples_with_original_code[ e_i ].content

        // Get Logged Results. Mimic console.log
        const output: any[][] = []
        e.code({ log: (...args) => output.push(args) })
        const formatted_output = output
          .map(line => line
            .map(arg => formatWithOptions({
              compact: true,
              colors: true,
              breakLength: 50,
              depth: 10,
            }, arg)).join(' '))
        return ({
          name: e.name,
          code: example_code,
          output: formatted_output
        })
      })
  )

  return {
    imported: module,
    description,
    details: meta.details,
    examples,
  }
}