import { Project, SyntaxKind, VariableDeclarationKind, Node, type CallExpression } from 'ts-morph'

function add_source_file_at_path(filepath: string) {
  try {
    const project = new Project()
    const sourceFile = project.addSourceFileAtPath(filepath)
    return sourceFile
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === "ENOENT") {
      return "not-found"
    }
    throw error
  }
}


export function extractExamples(filePath: string) {
  // claude coded this.
  const sourceFile = add_source_file_at_path(filePath)
  if (sourceFile === "not-found") return "not-found"

  const metaDeclaration = sourceFile
    .getVariableDeclarations()
    .find(decl => {
      if (decl.getName() !== 'meta') return false

      const varStatement = decl.getVariableStatementOrThrow()
      const isExported = varStatement.isExported()
      const isConst = varStatement.getDeclarationKind() === VariableDeclarationKind.Const
      const typeNode = decl.getTypeNode()
      const hasMetaType = typeNode?.getText() === 'Meta'

      return isExported && isConst && hasMetaType
    })

  if (!metaDeclaration) {
    return []
    // throw new Error('Could not find `export const meta: Meta = {...}` declaration')
  }

  const metaObject = metaDeclaration.getInitializerIfKindOrThrow(
    SyntaxKind.ObjectLiteralExpression
  )

  const examplesProp = metaObject
    .getProperties()
    .find(
      (p): p is import('ts-morph').PropertyAssignment =>
        p.isKind(SyntaxKind.PropertyAssignment) && p.getName() === 'examples'
    )

  if (!examplesProp) {
    return []
    // throw new Error('Could not find "examples" property on meta object')
  }

  const examplesArray = examplesProp.getInitializerIfKindOrThrow(
    SyntaxKind.ArrayLiteralExpression
  )

  return examplesArray.getElements().map((el, i) => {
    const obj = el.asKindOrThrow(
      SyntaxKind.ObjectLiteralExpression,
      `examples[${ i }] is not an object literal`
    )

    const nameProp = obj
      .getPropertyOrThrow('name')
      .asKindOrThrow(SyntaxKind.PropertyAssignment, `examples[${ i }].name is not a simple property`)
    const name = nameProp
      // .getInitializerIfKindOrThrow(SyntaxKind.StringLiteral, `examples[${ i }].name is not a string literal`)
      .getInitializerIfKindOrThrow(SyntaxKind.StringLiteral)
      .getLiteralValue()

    const codeMember = obj.getPropertyOrThrow('code')

    let fn: Node
    if (codeMember.isKind(SyntaxKind.MethodDeclaration)) {
      fn = codeMember
    } else if (codeMember.isKind(SyntaxKind.PropertyAssignment)) {
      fn = codeMember.getInitializerOrThrow()
    } else {
      throw new Error(`examples[${ i }].code has unexpected kind: ${ codeMember.getKindName() }`)
    }

    const content = extractFunctionBody(fn)

    return { name, content }
  })
}

function dedent(text: string): string {
  const lines = text.split('\n')

  // ignore blank lines when computing the minimum indent
  const indents = lines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^[ \t]*/)?.[ 0 ].length ?? 0)

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0

  return lines
    .map(line => (line.trim().length > 0 ? line.slice(minIndent) : ''))
    .join('\n')
    .trim()
}

function extractFunctionBody(fn: Node): string {
  stripConsoleLogWrapping(fn)

  // Arrow function: could have a block body `{ ... }` or an inline expression body
  if (fn.isKind(SyntaxKind.ArrowFunction)) {
    const body = fn.getBody()

    if (body.isKind(SyntaxKind.Block)) {
      const fullText = body.getText() // includes surrounding { }
      const inner = fullText.slice(1, -1) // strip braces
      return dedent(inner)
    }

    // inline expression body, e.g. `user => user.role`
    return body.getText().trim()
  }

  // `function (console) { ... }`
  if (fn.isKind(SyntaxKind.FunctionExpression)) {
    const body = fn.getBody()
    if (!body) throw new Error('FunctionExpression has no body')
    const fullText = body.getText()
    return dedent(fullText.slice(1, -1))
  }

  // method shorthand: `code(console) { ... }`
  if (fn.isKind(SyntaxKind.MethodDeclaration)) {
    const body = fn.getBodyOrThrow()
    const fullText = body.getText()
    return dedent(fullText.slice(1, -1))
  }

  throw new Error(`Unsupported function kind: ${ fn.getKindName() }`)
}






function isConsoleLogCall(node: Node): node is CallExpression {
  if (!Node.isCallExpression(node)) return false

  const expr = node.getExpression()
  return (
    Node.isPropertyAccessExpression(expr) &&
    expr.getExpression().getText() === 'console' &&
    expr.getName() === 'log'
  )
}

function stripConsoleLogWrapping(root: Node) {
  let foundOne = true
  while (foundOne) {
    foundOne = false
    const calls = root.getDescendantsOfKind(SyntaxKind.CallExpression)

    for (const call of calls) {
      if (!isConsoleLogCall(call)) continue

      const args = call.getArguments()
      const parent = call.getParent()

      if (Node.isExpressionStatement(parent) && parent.getExpression() === call) {
        // Plain join, no manual indentation — formatText() will fix indentation for us
        const replacement = args.map(a => a.getText()).join('\n')
        parent.replaceWithText(replacement)
      } else {
        const replacement = args.map(a => a.getText()).join(', ')
        call.replaceWithText(replacement)
      }

      foundOne = true
      break
    }
  }

  // Let TypeScript's formatter fix indentation now that the AST has proper
  // sibling statements, instead of trying to compute indentation by hand
  root.getSourceFile().formatText({
    indentSize: 2,
  })
}