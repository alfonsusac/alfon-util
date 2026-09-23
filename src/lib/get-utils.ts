import { readdir, readFile } from "fs/promises"
import { cache } from "react"
import { formatWithOptions } from "util"
import { extractExamples } from "./extract-examples"


type UtilEntry = {
  filename: string,
  content: Promise<{
    description?: string,
    definition: string,
    examples?: Promise<{
      name?: string,
      code?: string,
      output?: string[][],
    }[]>
    imported?: Record<string, any>
  }>
}

export const get_util_filenames = cache(async function get_util_filenames(context: string) {
  console.log(`get_util_filenames ${ context }`)
  const files = await readdir('./src/util')
  return files
})

export const get_util = cache(async function get_util(context: string, filename: string) {
  console.log(`get_util ${ context }`)
  const raw = await readFile(`./src/util/${ filename }`, { encoding: 'utf-8' })
  const definition_code = raw.split('\n// end')[ 0 ]
  const file_import = await import(`../util/${ filename }`)
  return {
    filename: filename,
    raw,
    definition_code,
    file_import
  }
})

export async function get_util_raw_code(context: string, filename: string) {
  console.log(`get_util_raw_code ${ context }`)
  const raw = await readFile(`./src/util/${ filename }`, { encoding: 'utf-8' })
  const code = raw.replace(
    /^export\s+const\s+\w+\s*:\s*Meta\s*=\s*\{[\s\S]*$/m,
    ''
  ).trim()
  return [ code, raw ] as const
}

export function extract_examples(context: string, code: string, filename: string) {
  console.log(`extract_examples ${ context }`)
  return extractExamples(`./src/util/${ filename }`)
}


export async function get_util_meta(context: string, filename: string, content_code: string, example_codes: { name: string, content: string }[]) {
  console.log(`get_util_meta ${ context }`)
  const module = await import(`../util/${ filename }`)
  const examples: {
    name: string,
    code: string,
    output: string[]
  }[] = []

  const meta = module.meta as Meta
  if (!meta) {
    return null
  }
  let i = -1
  for (const e of meta.examples ?? []) {
    i++
    // const example_code = await format_example_code(e.code.toString(), content_code)
    let example_code = example_codes[ i ].content

    example_code = `${ content_code }\n// ---cut-before---\n${ example_code }`

    // Get results
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


    examples.push({
      name: e.name,
      code: example_code,
      output: formatted_output
    })

  }

  return {
    imported: module,
    description: module.meta?.description,
    examples: examples,
    details: meta.details
  }
}









declare global {
  export type Meta = {
    description?: string,
    details?: string,
    examples?: {
      name: string,
      code: (console: { log: (...args: any[]) => void }) => void
    }[],
  }
}
