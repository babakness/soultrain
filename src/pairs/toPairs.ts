/** @module pairs/toPairs.ts */

import { IsArray, ValueOf } from '../helper-types'
import { ObjectTypeProps } from './entries'
import { toIterablePair } from './toIterablePair'

type ToPairs<O> = {
  'array': Array<[string, ValueOf<O>]>;
  'object': Array<[string, O[Exclude<keyof O, ObjectTypeProps<O>>]]>;
  'iterable': O extends Iterable<infer U> ? Array<[string, U]> : never;
  'iterable2': O extends IterableIterator<[infer U, infer V]> ? Array<[U, V]> : never;
  'done': [];
}[O extends IterableIterator<[any, any]> ? 'iterable2' : O extends Iterable<any> ? 'iterable' : IsArray<O, 'array', 'object'>]

export function toPairs<A extends Map<any, any>>( obj: A ): Array<[A extends Map<infer K, any> ? K : never, A extends Map<any, infer V> ? V : never]>
export function toPairs<K, A extends Iterable<K>>( obj: A ): Array<[string, A[keyof A]]>
export function toPairs<A extends any[]>( obj: A ): Array<[string, A extends Array<infer U> ? U : never]>
/**
 * Todo
 */
export function toPairs<A extends {
  [K in string]: any;
}>( obj: A ): A extends {
  [k in string]: infer V;
} ? Array<[string, V]> : never
export function toPairs( obj ) {
  const arr: Array<[any, any]> = []
  for ( const r of toIterablePair( obj ) ) {
    arr.push( r )
  }
  return arr
}
