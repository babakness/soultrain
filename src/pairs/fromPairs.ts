/** @module pairs/fromPairs.ts */

import { Pairs } from '../helper-types'
import { assoc_ } from '../object'
/**
 * Converts an array of entry pairs into an obj
 * @param entries array of pairs
 * @example
 * fromPairs([ ['a',1 ], ['b', 2]])
 * // => {a:1, b: 2}
 */
export const fromPairs = <K extends string | number, V>( entries: Pairs<K, V> ): Record<string, V> => entries.reduce( ( acc, [ k, v ] ) => assoc_( k as string, v, acc ), {} )

// interface KeyValuePair<K, V> extends Array<K | V> {
//   0: K
//   1: V
// }

// const _fromPairs = untypedCurry( <V>( kv: Array<KeyValuePair<string, V>> ) =>
//   kv.reduce(
//     ( acc, [ k, v ] ) => assign( acc, {[ k ]: v} ) ,
//     {},
//   ),
// )

// export function fromPairs <V>( kv: Array<KeyValuePair<string, V>> ): { [index: string]: V }
// export function fromPairs <V>( kv: Array<KeyValuePair<number, V>> ): { [index: number]: V }
// export function fromPairs( ...args ) {
//   return _fromPairs( ...args )
// }

export default fromPairs
