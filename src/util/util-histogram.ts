import { styleText } from "util"
import { arr } from "./util-arr"
import { max, min, percentile } from "./util-math"
import { decideTimeUnit, formatTime } from "./util-format-time"


// function get_histogram_data_from_sorted(args: {
//   processed_samples: {
//     sorted: true,
//     samples: number[],
//     min: number,
//     max: number,
//   }
//   bin_count: number,
//   modify_bins: (bin: {
//     min: number,
//     max: number,
//     count: number,
//   }) => {
//     color: string,
//   }
// }) {

//   const max = args.processed_samples.max
//   const min = args.processed_samples.min
//   const step = (max - min) / args.bin_count
//   const bins: {
//     min: number, max: number,
//     count: number,
//   }[] = arr(args.bin_count, i => {
//     return {
//       min: min + step * i,
//       max: min + step * (i + 1),
//     }
//   })

// }




// const getPercentileIndex = (samples: number[], pct: number) => {
//   return Math.floor((samples.length - 1) * pct)
// }

// type HistogramData = {
//   median: number,
//   max: number,
//   min: number,
//   step: number,
//   bins: {
//     min: number, max: number,
//     count: number,
//     medianPlacement: "before" | "median" | "after",
//     modified: number,
//     isOutlier: boolean,
//   }[]
// }

// type GetHistogramDataProps = {
//   samples: number[],
//   bin_count?: number,
//   min?: number,
//   max?: number,
//   filter?: (value: number, index: number) => boolean,
//   modifier?: (n: number) => number,
// }

// function getHistogramData(
//   args: GetHistogramDataProps
// ): HistogramData {
//   const {
//     samples,
//     bin_count = 64,      // TODO dont put optional in internal fucntion
//     filter = () => true, // TODO dont put optional in internal fucntion
//     modifier = (n) => n  // TODO dont put optional in internal fucntion
//   } = args

//   const modifiedSamples = samples
//     .toSorted((a, b) => a - b)
//     .filter(filter)

//   const max = args.max ?? Math.max(...modifiedSamples)
//   const min = args.min ?? Math.min(...modifiedSamples)

//   const step = (max - min) / bin_count
//   const bins: {
//     min: number, max: number,
//     count: number,
//     isMedian: boolean,
//     isBeforeMedian: boolean,
//     isAfterMedian: boolean,
//     isOutlier: boolean,
//   }[] = arr(bin_count + 1, i => ({
//     min: min + step * i,
//     max: min + step * (i + 1),
//     count: 0,
//     isMedian: false,
//     isBeforeMedian: false,
//     isAfterMedian: false,
//     isOutlier: false
//   }))

//   const median = modifiedSamples[ Math.floor(modifiedSamples.length / 2) ]
//   const q1 = percentile(modifiedSamples, 0.25)
//   const q3 = percentile(modifiedSamples, 0.75)
//   const iqr = q3 - q1
//   const lowerFenceValue = q1 - 1.5 * iqr
//   const upperFenceValue = q3 + 1.5 * iqr

//   modifiedSamples.map((val) => {
//     if (val < min) return
//     if (val > max) return
//     const bin = bins.at(Math.floor((val - min) / step))
//     if (!bin) {
//       // no need to print error since the min and max may be overriden
//       // console.log(`no bin at ${ Math.floor(val / step) }. trying to add value ${ val }. step ${ step }. ${ val / step }`)
//     } else {
//       bin.count++
//     }
//   })

//   bins.forEach(bin => {

//     if (median <= bin.min && median <= bin.max)
//       bin.isAfterMedian = true
//     if (median >= bin.min && median >= bin.max)
//       bin.isBeforeMedian = true
//     if (median >= bin.min && median <= bin.max)
//       bin.isMedian = true
//     if (bin.max < lowerFenceValue || bin.min > upperFenceValue) {
//       bin.isOutlier = true
//     }
//   })

//   const normalizedBins = arr(bins.length, i => ({
//     ...bins[ i ],
//     modified: modifier?.(bins[ i ].count) ?? bins[ i ].count,
//     medianPlacement: (() => {
//       if (bins[ i ].isAfterMedian) return "after"
//       if (bins[ i ].isMedian) return "median"
//       if (bins[ i ].isBeforeMedian) return "before"
//       throw new Error('median palcement cant be determined')
//     })(),
//   } satisfies HistogramData[ 'bins' ][ number ]))

//   return {
//     median,
//     step,
//     max, min,
//     bins: normalizedBins
//   } satisfies HistogramData
// }

// function getHistogramDataWithPercentile(
//   samples: number[],
//   opts?: HistogramProps
// ) {
//   return getHistogramData({
//     samples,
//     bin_count: opts?.bin_count,
//     min: opts?.min,
//     max: opts?.max,
//     modifier: opts?.modifier ?? (opts?.logarithmic ? (n => Math.log(n)) : (n => n)),
//     filter: opts?.filter ? opts.filter : (n, n_i) => {
//       if (opts?.percentileClip) {
//         const upper = 1 - opts.percentileClip
//         const lower = opts.percentileClip
//         if (n_i > getPercentileIndex(samples, upper)) return false
//         if (n_i < getPercentileIndex(samples, lower)) return false
//       }
//       return true
//     },
//   })
// }

// const blocks = "▁▂▃▄▅▆▇█"

// function buildHistogramString(args: {
//   histogram_data: HistogramData,
//   height: number,
//   minOverride?: number,
//   maxOverride?: number,
//   textInFirstRow?: boolean,
//   textNumberSf?: number,
// }) {
//   const histogram_data = args.histogram_data
//   const maxHeight = args.height
//   const max = args.maxOverride ?? histogram_data.max
//   const min = args.minOverride ?? histogram_data.min
//   const textNumberSf = args.textNumberSf ?? 3

//   const percent_per_line = Math.max(...histogram_data.bins.map(b => b.modified)) / maxHeight

//   const lines: string[] = []

//   const unit = decideTimeUnit(min)
//   const graphInfo = `(${ formatTime(min, unit, {
//     format: 'cyan',
//     sf: textNumberSf,
//   }) } - ${ formatTime(max, unit, {
//     format: 'magenta',
//     sf: textNumberSf,
//   }) }) step: ${ formatTime(histogram_data.step, unit, {
//     format: 'green',
//     sf: textNumberSf,
//   }) } | bin: ${ histogram_data.bins.length }`

//   arr(maxHeight).forEach(row => {
//     const height = maxHeight - row // 1 based
//     let line = ''
//     const upper_count_boundary = percent_per_line * (height)
//     const lower_count_boundary = percent_per_line * (height - 1)
//     histogram_data.bins.forEach(bin_data => {
//       const count = bin_data.modified
//       let blockChar = ''
//       if (count > upper_count_boundary) {
//         blockChar = blocks[ 7 ]
//       } else if (count > lower_count_boundary) {
//         const ratio_in_line = (count - lower_count_boundary) / percent_per_line
//         const char = blocks.at(Math.min(Math.ceil(ratio_in_line * 8) - 1, 7))
//         if (!char) console.log(`no block from block arr ${ Math.ceil(ratio_in_line * 8) - 1 }`)
//         blockChar = char!
//       } else {
//         blockChar = height === 1 ? blocks[ 0 ] : ' '
//       }
//       line += styleText((() => {
//         if (bin_data.medianPlacement === "before") {
//           if (bin_data.isOutlier) return "cyanBright"
//           else return "cyan"
//         }
//         if (bin_data.medianPlacement === "after") {
//           if (bin_data.isOutlier) return "magentaBright"
//           else return "magenta"
//         }
//         if (bin_data.medianPlacement === "median") {
//           return "yellow"
//         }
//         return "reset" as const
//       })()
//         , blockChar)
//     })

//     lines.push(line)
//   })

//   return {
//     data: histogram_data,
//     graph: lines.join('\n'),
//     info: graphInfo
//   }
// }


// type HistogramProps = {
//   height?: number,
//   bin_count?: number,
//   min?: number,
//   max?: number,
//   percentileClip?: number,
//   filter?: GetHistogramDataProps[ 'filter' ],
//   modifier?: GetHistogramDataProps[ 'modifier' ],
//   logarithmic?: boolean,
//   textInFirstRow?: boolean,
//   textNumberSf?: number,
//   textShort?: boolean,
// }


// export function histogram(
//   samples: number[],
//   opts?: HistogramProps
// ) {
//   const histogram_data = getHistogramDataWithPercentile(samples, opts)

//   return buildHistogramString({
//     histogram_data,
//     height: opts?.height ?? 3,
//     textInFirstRow: opts?.textInFirstRow,
//     textNumberSf: opts?.textNumberSf,
//   })
// }


// export function groupedHistogram(
//   sample_group: number[][],
//   opts?: HistogramProps
// ) {
//   const allData = sample_group.flat()


//   const filteredAllData = allData
//     .sort((a, b) => a - b)
//     .filter((n) => {
//       if (opts?.percentileClip) {
//         const upper = 1 - opts.percentileClip
//         const lower = opts.percentileClip
//         if (n > percentile(allData, upper)) return false
//         if (n < percentile(allData, lower)) return false
//       }
//       return true
//     })
//   const mint = min(filteredAllData)
//   const maxt = max(filteredAllData)


//   const histogram_data_arr = sample_group.map(
//     samples => getHistogramDataWithPercentile(samples, {
//       ...opts,
//       min: mint,
//       max: maxt,
//       filter: () => true,
//     })
//   )

//   return histogram_data_arr.map(histogram_data =>
//     buildHistogramString({
//       histogram_data,
//       height: opts?.height ?? 3,
//       minOverride: mint,
//       maxOverride: maxt,
//       textInFirstRow: true,
//     })
//   )

// }



