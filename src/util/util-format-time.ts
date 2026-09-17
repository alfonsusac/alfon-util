import { styleText } from "util"
import { round } from "./util-round"


export function decideTimeUnit(ms: number) {
  if (ms >= 1000)
    return 's'
  if (ms >= 1)
    return 'ms'
  if (ms >= 0.001)
    return 'us'
  return 'ns'
}


export function formatTime(
  ms: number,
  override?: "s" | "ms" | "us" | "ns" | "ps",
  opts?: {
    format?: Parameters<typeof styleText>[ 0 ],
    sf?: number
  }
) {
  const { format = 'yellow', sf = 6 } = opts ?? {}
  const sRes = styleText(format, round(ms / 1e3, sf, 'sf') + '') + 's'
  const msRes = styleText(format, round(ms, sf, 'sf') + '') + 'ms'
  const usRes = styleText(format, round(ms * 1e3, sf, 'sf') + '') + 'us'
  const nsRes = styleText(format, round(ms * 1e6, sf, 'sf') + '') + 'ns'
  if (override === 's') return sRes
  if (override === 'ms') return msRes
  if (override === 'us') return usRes
  if (override === 'ns') return nsRes
  if (ms >= 1000)
    return sRes
  if (ms >= 1)
    return msRes
  if (ms >= 0.001)
    return usRes
  return nsRes
}


export function formatPct(
  num: number,
  alreadyMultipliedBy100 = true
) {
  if (alreadyMultipliedBy100) return styleText("yellow", round(num, 3, 'sf') + '') + "%"
  return styleText('yellow', round(num * 100, 3, 'sf') + '') + '%'
}


export function formatFasterSlower(
  from: number,
  target: number
) {
  const ratio = from / target
  if (ratio > 1) return styleText('green', `${ round(ratio, 2, 'sf') }x slower`)
  if (ratio < 1) return styleText('red', `${ round(target / from, 2, 'sf') }x faster`)
  return '1x'
}





export const meta: Meta = {
  description: "Utilities for formatting time values, percentages, and performance comparisons",
  details: `Used to format time values for debugging purposes, i.e for developers since it doesn't use proper localised number format
- \`formatTime\`
  - automatically decides the appropriate time unit based on the input value
  - higlights number part into yellow using \`styleText\`
- \`decideTimeUnit\`
  - determines the appropriate time unit for a given time value in milliseconds
  - can be used to display consistent time units across different values
- \`formatPct\`
  - formats a number as a percentage
  - can handle numbers that are already multiplied by 100
- \`formatFasterSlower\`
  - compares two numbers and indicates which one is faster or slower
  - returns colored string indicating the relative speed between two numbers
  - (from ÷ target) if slower, (target ÷ from) if faster
  - green if slower, red if faster
  `,
  examples: [
    {
      name: "\`formatTime\` example",
      code: console => {
        console.log(formatTime(1234))
        console.log(formatTime(0.000567))
        console.log(formatTime(987654321, 's'))
      }
    },
    {
      name: "using \`decideTimeUnit\`",
      code: console => {
        const unit = decideTimeUnit(0.0001624)
        console.log(
          formatTime(0.0001624, unit),
          formatTime(0.0732894, unit),
          formatTime(1.585298, unit)
        )
      }
    },
    {
      name: "\`formatPct\` example\n- rounded to 3 significant figures by default",
      code: console => {
        console.log(formatPct(0.123))
        console.log(formatPct(0.456, false))
      }
    },
    {
      name: "\`formatFasterSlower\` example",
      code: console => {
        console.log(formatFasterSlower(0.005215, 0.002024))
        console.log(formatFasterSlower(0.002423, 0.009948))
        console.log(formatFasterSlower(0.004, 0.004))
      }
    }
  ]
}