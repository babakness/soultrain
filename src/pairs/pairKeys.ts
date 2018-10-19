/** @module pairs/pairKeys.ts */

import { mapIterable } from '../iterables'
/**
 * Takes a tuple pair and returns the first (key) values in an array
 * @param entries array of tuples
 * @sig ([k,v]) -> k[]
 * @example
 * pairKeys([[1,2],[3,4]])
 * //=> [1,3]
 */
export const pairKeys = <K, V>( entries: Array<[K, V]> ): K[] => mapIterable( ( [ k, _ ] ) => k, entries )
