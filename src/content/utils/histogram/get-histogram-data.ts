import { min } from "@/util/util-math"
import { max } from "../math/statistics"
import { arr } from "../util-arr"
import { random } from "../util-random-seed"

function get_histogram_data(args: {
  samples: number[],
  bin_count: number,
  logarithmic_bins?: boolean,
  min?: number,
  max?: number,
  binning_fn?: (count: number) => number[],
}) {
  const maxv = args.max || max(args.samples)
  const minv = args.min || min(args.samples)
  const samples = args.samples
  const step = ((maxv - minv) / args.bin_count)

  const boundaries = args.binning_fn?.(args.bin_count)
    ?? arr(args.bin_count + 1, i => minv + step * i)

  const bins: {
    min: number,
    max: number,
    count: number
  }[] = []

  for (let i = 0; i < boundaries.length - 1; i++) {
    bins.push({ min: boundaries[ i ], max: boundaries[ i + 1 ], count: 0 })
  }

  samples.forEach(val => {
    if (val < minv || val > maxv) return
    const bin_index = val === maxv ? -1 : Math.floor((val - minv) / step)
    const bin = bins.at(bin_index)
    if (bin) bin.count++
  })

  return bins
}


{
  console.table(get_histogram_data({
    samples: [
      0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ].map(v => v / 10000),
    bin_count: 10,
  }))
}
{
  console.table(get_histogram_data({
    samples: [
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
    bin_count: 10,
  }))
}
{
  const rng = random(124)
  console.table(get_histogram_data({
    samples: arr(100000, _ => (rng()) / 1000),
    bin_count: 5,
  }))
}
{
  const rng = random(122)
  console.table(get_histogram_data({
    samples: arr(1000, _ => (Math.round(rng() * 10) / 100000)),
    bin_count: 10,
  }))
}