import { arr } from "../util-arr"

export function clip_percentiles(sample: number[], percentile: number, sorted?: boolean) {

  const get_percentil_index = (samples: number[], pct: number) => {
    return Math.floor((samples.length - 1) * pct)
  }
  const sorted_samples = sorted ? sample : sample.toSorted((a, b) => a - b)

  const upper_pct = 1 - percentile
  const lower_pct = percentile

  const upper_p_i = get_percentil_index(sorted_samples, upper_pct)
  const lower_p_i = get_percentil_index(sorted_samples, lower_pct)

  const filtered_samples = sorted_samples
    .filter((n_i) => {
      if (n_i > upper_p_i) return false
      if (n_i < lower_p_i) return false
      return true
    })

  return filtered_samples
}


export const meta: Meta = {
  examples: [
    {
      name: "Clip 5% percentile off of a sorted sample",
      code: console => {
        const samples = clip_percentiles(
          [
            2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8,
            8, 8, 9, 9, 10, 10, 10, 11, 12, 12, 13, 13, 14, 15,
            18, 19, 20, 20, 21, 22, 22, 23, 24, 25, 25, 26, 27, 28,
            29, 30, 30, 31, 32, 33, 34, 35, 35, 36, 37, 38, 39, 40,
            42, 43, 44, 45, 46, 47, 48, 48, 49, 50, 50, 51, 52, 53,
            54, 55, 55, 56, 57, 58, 59, 60, 60, 61, 62, 63, 64, 65,
            67, 68, 69, 70, 71, 72, 73, 74, 75, 75, 76, 77, 78, 79,
            80, 81, 82, 83, 84, 85, 85, 86, 87, 88, 89, 90,
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
            // Higher values / outliers
            112, 118, 125, 131, 140, 147, 155, 163, 172, 185,
            201, 215, 230, 248, 265, 290, 315, 340, 375, 420,
          ],
          0.05, true
        )
        console.log(arr(11, i => {
          const step = samples.length / 11
          return samples.slice(i * step, (i + 1) * step).join(', ')
        }).join('\n'))
      }
    }
  ]
}