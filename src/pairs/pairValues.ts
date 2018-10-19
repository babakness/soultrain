/** @module pairs/pairValues.ts */
/**
 * Takes a tuple pair and returns the second values in an array
 * @param entries array of tuples
 * @sig ([k,v]) -> v[]
 * @example
 * pairKeys([[1,2],[3,4]])
 * //=> [2,4]
 */
export const pairValues = <K, V>( entries: Array<[K, V]> ): V[] => entries.map( ( [ _, v ] ) => v )
