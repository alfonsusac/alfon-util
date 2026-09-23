import { formatPct } from "./util-format-time"


// Percentile functions
export function median(sortedNumbers: number[]) {
  const mid = sortedNumbers.length / 2
  const median = sortedNumbers.length % 2 === 0
    ? (sortedNumbers[ mid - 1 ] + sortedNumbers[ mid ]) / 2
    : sortedNumbers[ Math.floor(mid) ]
  return median
}

export function percentile(sorted: number[], p: number) {
  const index = (sorted.length - 1) * p
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sorted[ lower ]
  const weight = index - lower
  return sorted[ lower ] * (1 - weight) + sorted[ upper ] * weight
}

// Satistics
export function min(nums: number[]) {
  return nums.reduce((min, value) => Math.min(min, value), Infinity)
}
export function max(nums: number[]) {
  return nums.reduce((max, value) => value > max ? value : max, -Infinity)
}
export function sum(nums: number[]) {
  return nums.reduce((acc, curr) => acc += curr, 0)
}
export function avg(nums: number[]) {
  return sum(nums) / nums.length
}
export function sampleSd(nums: number[]) {
  const mean = avg(nums)
  return Math.sqrt(
    sum(nums.map(n => (n - mean) ** 2))
    / (nums.length - 1)
  )
}
export function sampleSdPct(nums: number[]) {
  return formatPct((sampleSd(nums) / avg(nums)))
}

// Pooled statistics functions
export function pooled_mean(data: { mean: number, samples: number }[]) {
  let top = 0
  let bottom = 0
  data.forEach(e => {
    top += e.mean * e.samples
    bottom += e.samples
  })
  return top / bottom
}

export function pooled_variance(data: { var: number, mean: number, samples: number, }[]) {
  const pooled_data_mean = pooled_mean(data)
  let top = 0
  let bottom = 0

  data.forEach(e => {
    top += e.samples * e.var
    top += e.samples * (e.mean - pooled_data_mean) ** 2
    bottom += e.samples
  })
  return top / bottom
}
export function pooled_sd(data: { var: number, mean: number, samples: number, }[]) {
  return Math.sqrt(pooled_variance(data))
}

// Coefficient of variation (CV)
export function cv(means: number[]) {
  return sampleSd(means) / avg(means)
}













export const meta: Meta = {
  description: "Utility functions for mathematical operations",
  examples: [
    {
      name: "essential statistics\n\nmin, max, sum, avg, and sample standard deviation",
      code: console => {
        console.log(min([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
        console.log(max([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
        console.log(sum([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
        console.log(avg([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
        console.log(sampleSd([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
        console.log(sampleSdPct([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
      }
    },
    {
      name: "percentile\n\nfind the value at a given percentile of a sorted array",
      code: console => {
        console.log(median([ 1, 2, 3, 4, 5 ]))
        console.log(median([ 1, 2, 3, 4, 5, 6 ]))
        console.log(percentile([ 1, 2, 3, 4, 5 ], 0.5))
        console.log(percentile([ 1, 2, 3, 4, 5, 6 ], 0.5))
        console.log(percentile([ 1, 2, 3, 4, 5 ], 0.2))
        console.log(percentile([ 1, 2, 3, 4, 5, 6 ], 0.2))
      }
    },
    {
      name: "coefficient of variation (CV)\n\ncalculate the CV of an array of numbers. used to measure relative variability between trials",
      code: console => {
        console.log(cv([ 2, 2, 3, 2, 3, 2, 2, 4, 2, 8, 2 ]))
      }
    },
    {
      name: "pooled statistics\n\ncalculate pooled mean, variance, and standard deviation for multiple datasets",
      code: console => {
        const data = [
          { mean: 2, var: 1, samples: 5 },
          { mean: 3, var: 2, samples: 6 }
        ]
        console.log(pooled_mean(data))
        console.log(pooled_variance(data))
        console.log(pooled_sd(data))
      }
    }
  ]
}