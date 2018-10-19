/** @module pairs/fromPairs.ts */

import { Pairs } from '../helper-types'
import { assoc } from '../object'
/**
 * Converts an array of entry pairs into an obj
 * @param entries array of pairs
 * @example
 * fromPairs([ ['a',1 ], ['b', 2]])
 * // => {a:1, b: 2}
 */
export const fromPairs = <K extends string | number, V>( entries: Pairs<K, V> ): Record<string, V> => entries.reduce( ( acc, [ k, v ] ) => assoc( k as string, v, acc ), {} )
