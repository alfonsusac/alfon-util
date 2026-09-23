import { readFile } from "fs/promises"
import { cache } from "react"
import { CONTENT_PATH, walk_content_tree_unordered, type ContentTree } from "./get-content-tree"
import { get_content_meta } from "./get-content-meta"
import { extractExamples } from "./extract-examples"

export const get_content = cache(async function (
  path: string,
) {
  const [ code, raw ] = await get_content_raw_code(path)
  const extracted_examples = extractExamples(`${ CONTENT_PATH }/${ path }`)
  extracted_examples.forEach(e => e.content = `${ code }\n// ---cut-before---\n${ e.content }`)
  const meta = await get_content_meta(path, extracted_examples)
  return { path, raw, code, meta }
})


export async function get_content_raw_code(path: string) {
  // console.log(`${ CONTENT_PATH }/${ path }`)
  const raw = await readFile(`${ CONTENT_PATH }/${ path }`, { encoding: 'utf-8' })
  const code =
    `// @filename: ${ `${ CONTENT_PATH }/${ path }` }\n// ---cut-before---\n` + raw.replace(
      /^export\s+const\s+\w+\s*:\s*Meta\s*=\s*\{[\s\S]*$/m,
      ''
    ).trim()
  return [ code, raw ] as const
}



// ---

export const get_all_file_contents = cache(async function () {
  const content_list = await get_content_list()
  const entries: [ path: string, content: string ][] = []
  for (const node of content_list) {
    if (node.type === "folder") continue
    const [ code ] = await get_content_raw_code(node.path.replace(CONTENT_PATH, '').slice(1))
    entries.push([ node.path, code ])
  }
  return entries
})

// TODO make list in addition to tree above
export const get_content_list = cache(async function () {
  const content_list: Omit<ContentTree, 'children'>[] = []
  await walk_content_tree_unordered((type, name, path) => {
    content_list.push({ type, name, path })
  })
  return content_list
})