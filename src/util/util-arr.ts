export function arr(length: number): number[]
export function arr<T>(length: number, init: ((i: number) => T) | undefined): T[]
export function arr<T>(length: number, init?: ((i: number) => T) | undefined) {
  return Array.from({ length }, (_, i) => init ? init(i) : i)
}

export function loop(length: number): number[] {
  return arr(length)
}








export const meta: Meta = {
  description: "a simple array.from wrapper",
  examples: [
    {
      name: "Loop from 0 to 5",
      code: console => {
        loop(3).forEach(i => console.log(i))
        for (const i of loop(3)) {
          console.log(i)
        }
      }
    },
    {
      name: "Creates pre-filled array",
      code: console => {
        console.log(arr(10, i => String.fromCharCode(65 + i)))
        console.log(arr(10, i => Math.random().toString(36).slice(2, 6)))
      }
    },
  ]
}