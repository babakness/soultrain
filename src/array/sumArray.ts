/** @module array/sumArray.ts */

export function sumArray( arr: number[] ): number
/**
 * Takes an array of numbers and returns the sum value
 * @param arr array to sum values of
 * @sig number[] -> number
 * @example
 * sumArray([1,2,3,4])
 * // => 10
 */
export function sumArray( arr ) {
  return arr.reduce( ( acc, item ) => acc + item, 0 ) as number
}

export default sumArray
