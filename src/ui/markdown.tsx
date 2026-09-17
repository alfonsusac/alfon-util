import { fromMarkdown } from "mdast-util-from-markdown"
import { formatWithOptions } from "util"

type RootContent = ReturnType<typeof fromMarkdown>[ 'children' ][ 0 ]

export function Markdown(props: {
  md: string,
  log?: boolean,
  className?: string,
}) {
  const tree = fromMarkdown(props.md)
  props.log && console.log(formatWithOptions({ colors: true, depth: 10 }, tree))
  return <div className={("md" + ' ' + props.className)}>
    <RenderChildren children={tree.children} />
  </div>
}



function RenderChildren(props: {
  children: RootContent[]
}) {
  return <>{
    props.children.map((child, child_i) => {
      return <RenderNode key={child_i} content={child} />
    })
  }</>
}



function RenderNode<T extends RootContent>(props: {
  content: T
}) {
  const Component = markdownComponents[ props.content.type ]

  if (!Component)
    throw new Error(`Markdown component of type "${ props.content.type }" is not yet implemented!`)

  return <Component node={props.content} />
}



const markdownComponents = ({
  list: props => {
    if (props.node.ordered) return <ol className="ol">
      <RenderChildren children={props.node.children} />
    </ol>
    return <ul className="ul">
      <RenderChildren children={props.node.children} />
    </ul>
  },
  listItem: props => {
    return <li className="li">
      <RenderChildren children={props.node.children} />
    </li>
  },
  paragraph: props => {
    return <p className="p">
      <RenderChildren children={props.node.children} />
    </p>
  },
  text: props => {
    return <>{props.node.value}</>
  },
  inlineCode: props => {
    return <code className="code">{props.node.value}</code>
  }


} satisfies {
  [ key in RootContent[ 'type' ] ]?: (props: {
    node: Extract<RootContent, { type: key }>
  }) => React.JSX.Element
}) as {
    [ key in RootContent[ 'type' ] ]?: (props: {
      node: RootContent
    }) => React.JSX.Element
  }