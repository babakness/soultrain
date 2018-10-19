/** @module array/sumArray.ts */

/**
 * Takes an array of number and returns the sum value
 * @param arr array to sum values of
 * @sig number[] -> number
 * @example
 * sumArray([1,2,3,4])
 * // => 10
 */
export const sumArray = ( arr: number[] ): number => arr.reduce( ( acc, item ) => acc + item, 0 )

export default sumArray
