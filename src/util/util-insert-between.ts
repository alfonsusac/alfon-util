export function insertBetween<A, B, D extends number = 1>(
  input: A[],
  what: (i: number, d: number) => B,
  depth?: D
) {
  return input
    .map((e, i) => i === input.length - 1
      ? [ e ]
      : [ e, what(i, ((i + 1) * 2) - 1) ]
    )
    .flat(depth)
}









export const meta: Meta = {
  examples: [
    {
      name: "Insert separators",
      code: console => {
        const result = insertBetween(
          [ "A", "B", "C" ],
          (i, d) => `separator-${ i }-${ d }`
        )
        console.log(result)
      }
    },
    {
      name: "Insert multiple separators",
      code: console => {
        const result = insertBetween(
          [ "A", "B", "C", "D", "E" ],
          (i, d) => [ i, d ],
          2
        )
        console.log(result)
      }
    },
  ]
}