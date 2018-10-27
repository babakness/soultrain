/** @module array/sumColumn.ts */

import { untypedCurry } from '../function/untypedCurry'
export function sumColumn<K extends string, V extends number>( column: K, rows: Array<{
  [k in K]: V;
}> ): number
export function sumColumn<K extends string>( column: K ): <V extends number>( rows: Array<{
  [k in K]: V;
}> ) => number
/**
 * Takes a column and a row of objects and returns the sum value at key of object
 * @param column key of object to sum
 * @param rows array of objects to sum column from
 * @sig k -> [{k1:n1,k2:n2} -> (n1+n2+n3...)
 * @example
 * sumColumn('score', [{name: 'john', 'score': 20},{name: 'larry', score: 15}])
 * // => 35
 */
export function sumColumn( ...args ) {
  return untypedCurry( ( column, rows ) => rows.reduce( ( sum, row ) => row[ column ] + sum, 0 ) )( ...args )
}
