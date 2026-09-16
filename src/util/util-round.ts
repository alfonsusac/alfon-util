export function round(val: number, dpsf = 2, mode: 'dp' | 'sf' = 'dp') {
  if (mode === 'sf')
    return Number(val.toPrecision(dpsf))
  const factor = 10 ** dpsf
  return Math.round((val + Number.EPSILON) * factor) / factor
}







export const meta: Meta = {
  examples: [
    {
      name: "Round Numbers",
      code: console => {
        console.log(round(3.14159))
        console.log(round(3.14159, 3))
        console.log(round(3.14159, 3, 'sf'))
        console.log(round(123456789, 3, 'sf'))
        console.log(round(123456789, 3, 'dp'))
        console.log(round(1.005, 2))
      }
    },
  ]
}