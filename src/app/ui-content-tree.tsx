import { get_content_root_tree, type ContentTree } from "@/lib/get-content-tree"
import { cn } from "cn"
import { MenuItem } from "./ui-menu-item-client"
import { formatWithOptions } from "util"

export async function DirList() {
  const dirs = await get_content_root_tree('./src/content')
  // console.log(formatWithOptions({ colors: true, compact: true, depth: 10 }, dirs))
  return <ContentTreeNestedList
    content_tree_list={dirs}
    base_path={''}
  />
}



export function ContentTreeNestedList(props: {
  content_tree_list: ContentTree[],
  base_path: `/${ string }` | '',
  depth?: number
}) {

  const depth_cn = cn(
    props.depth === 0 && "pl-2",
    props.depth === 1 && "pl-4",
    props.depth === 2 && "pl-6",
    props.depth === 3 && "pl-8",
    props.depth === 4 && "pl-10",
    props.depth === 5 && "pl-12",
  )

  const depth_header_cn = cn(
    "text-fg/50 h-6.5 mt-2",
    props.depth === 1 && "text-xs h-6 mt-1",
    props.depth === 2 && "text-xs h-6 mt-0.5",
    props.depth === 3 && "text-xs h-6 mt-0.5",
    props.depth === 4 && "text-xs h-6 mt-0.5",
    props.depth === 5 && "text-xs h-6 mt-0.5",
  )

  const order = { 'file': 0, 'folder': 1 }

  const sorted_list = props.content_tree_list
    .toSorted((a, b) => order[ a.type ] - order[ b.type ])

  return <>{sorted_list.map((item, item_i) => {
    if (item.type === "file")
      return <MenuItem
        className={depth_cn}
        key={item_i}
        href={`${ props.base_path }/${ item.name }`}
      >
        {item.name}
      </MenuItem>
    return <div key={item_i} className="flex flex-col mb-1">
      <MenuItem
        className={cn(depth_cn, depth_header_cn, "pointer-events-none")}
        key={item_i}
        href="#"
      >
        {[
          item.name
        ].filter(Boolean).join('/')}
      </MenuItem>
      <ContentTreeNestedList
        content_tree_list={item.children}
        base_path={`${ props.base_path }/${ item.name }`}
        depth={(props.depth ?? 0) + 1}
      />
    </div>

  })}</>

}