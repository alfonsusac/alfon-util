import type { Dirent } from "fs"
import { readdir } from "fs/promises"
import { cache } from "react"

export type ContentTree = {
  type: "file",
  path: string,
  name: string,
} | {
  type: "folder",
  path: string,
  name: string,
  children: ContentTree[]
}

export const CONTENT_PATH = './src/content'


// Path relative to runtime's path
export const get_content_root_tree = cache(async function (
  path: string = CONTENT_PATH,
): Promise<ContentTree[]> {
  const dirs = await readdir(path, { withFileTypes: true })
  const content_trees: ContentTree[] = []
  for (const dir of dirs) {
    content_trees.push(await get_content_tree(dir))
  }
  return content_trees
})

export const get_content_tree = cache(async function (
  dir: Dirent<string>
): Promise<ContentTree> {
  if (dir.isDirectory()) {
    const content_trees = await get_content_root_tree(dir.parentPath + '/' + dir.name)
    return {
      type: "folder",
      name: dir.name,
      path: dir.parentPath + '/' + dir.name,
      children: content_trees
    }
  } else {
    return {
      type: "file",
      name: dir.name,
      path: dir.parentPath + '/' + dir.name,
    }
  }
})

export const walk_content_tree_unordered = cache(async function (
  on_node: (type: ContentTree[ 'type' ], name: string, path: string) => void
) {
  const ct = await get_content_root_tree(CONTENT_PATH)
  const _walk = (node: ContentTree) => {
    on_node(node.type, node.name, node.path)
    if (node.type === 'folder')
      for (const c of node.children) {
        void _walk(c)
      }
  }
  for (const c of ct) {
    void _walk(c)
  }
})
