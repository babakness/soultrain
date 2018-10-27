/** @module pairs/entries.ts */

import { IsArray, ValueOf } from '../helper-types'

export type ObjectTypeProps<T> = T extends any ? keyof T : never

type Entries<O> = {
  'array': Array<[string, ValueOf<O>]>
  // 'object': Array<[string, O[Exclude<keyof O, ObjectTypeProps<O>>]]>
  'object': Array<[string, ValueOf<O> ]>
  'string': O extends Iterable<infer U> ? Array<[string, U]> : never,
}[
  O extends string
    ? 'string'
    : IsArray<O, 'array', 'object'>
]

// type sf = Entries < {a: 1, b: 2} >

/**
 * Todo
 */
export const entries = <A extends string|{[k in ( string|number )]: any}>( obj: A ): Entries<A> =>
  Object.entries
    ? Object.entries( obj ) as Entries<A>
    : Object.keys( obj ).map( ( key ) => [ key, obj[ key ] ] ) as Entries<A>
