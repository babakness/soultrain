/** @module array/joinArray.ts */

import { untypedCurry } from '../function'

export function joinArray<A extends string>( str: string, arr: A[] ): string
export function joinArray<A extends string>( str: string ): ( arr: A[] ) => string
/**
 * Joins item in an array on a string
 * @param str string to join array on
 * @param arr array to join on string
 * @sig str -> a[] -> str
 * @example
 * joinArray('-',['a','b'])
 * //=> 'a-b'
 */
export function joinArray( ...args ) {
  return untypedCurry( ( str, arr ) => arr.join( str ) )( ...args )
}

export default joinArray
