/** @module pairs/toIterablePair.ts */

import { isMapOrSet } from '../type/isMapOrSet'
import { entries } from './entries'
export function toIterablePair<A extends Map<any, any>>( obj: A ): IterableIterator<[A extends Map<infer K, any> ? K : never, A extends Map<any, infer V> ? V : never]>
export function toIterablePair<K, A extends Iterable<K>>( obj: A ): Iterable<[string, A[keyof A]]>
export function toIterablePair<A extends any[]>( obj: A ): Array<[string, A extends Array<infer U> ? U : never]>
export function toIterablePair<A extends {
  [K in string]: any;
}>( obj: A ): A extends {
  [k in string]: infer V;
} ? Array<[string, V]> : never
export function toIterablePair( obj ) {
  return isMapOrSet( obj )
    ? obj.entries()
    : entries( obj )
}
