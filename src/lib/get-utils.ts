import { readdir, readFile } from "fs/promises"
import * as prettier from "prettier"
import { cache } from "react"
import { formatWithOptions } from "util"


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
  // content: string,
  // description?: string,
  // examples?: {
  //   name?: string,
  //   code?: string,
  //   output?: string[][],
  // }[]
  // imported?: Record<string, any>
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
  // const code = raw.split('\n// end')[ 0 ]
  const code = raw.replace(
    /^export\s+const\s+\w+\s*:\s*Meta\s*=\s*\{[\s\S]*$/m,
    ''
  ).trim()
  return code
}

export async function get_util_meta(context: string, filename: string, content_code: string) {
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
  for (const e of meta.examples ?? []) {
    const example_code = await format_example_code(e.code.toString(), content_code)

    // Get results
    const output: any[][] = []
    e.code({ log: (...args) => output.push(args) })

    const formatted_output = output
      .map(line => line
        .map(arg => formatWithOptions({
          colors: true,
          breakLength: 50,
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

async function format_example_code(code: string, content_code: string) {
  let example_code = code
  // Remove function wrappings
  if (/^.*?=>\s*\{/m.test(example_code) || example_code.startsWith('function')) {
    example_code = example_code.split('\n').slice(1, -1).join('\n')
  } else if (/^.*?=>\s*/m.test(example_code)) {
    example_code = example_code.replace(/^.*?=>\s*/, '')
  }

  // Normalise indent:
  const count = example_code.match(/^ */)?.[ 0 ].length ?? 0
  example_code = example_code
    .split('\n')
    .map(line => line.slice(count))
    .join('\n')

  example_code = `${ content_code }\n
    \n// ---cut-before---\n${ example_code }`

  example_code = await prettier.format(example_code, {
    parser: "typescript",
    semi: false,
    bracketSpacing: true,
    arrowParens: "avoid",
    printWidth: 50,
  })
  return example_code
}








declare global {
  export type Meta = {
    description?: string,
    details?: string,
    examples?: {
      name: string,
      code: (console: { log: (...args: any[]) => void }) => void
    }[]
  }
}
