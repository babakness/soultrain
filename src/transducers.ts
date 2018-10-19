/** @module transducers.ts */

import { Predicate } from './helper-types'
export const mapEntryValues = <VA, VB>( fn: ( a: VA ) => VB ) => <K>( entries: Array<[K, VA]> ): Array<[K, VB]> => entries.map( ( [ k, v ] ) => [ k, fn( v ) ] as [K, VB] )
export const mapEntryKeys = <KA, KB>( fn: ( a: KA ) => KB ) => <V>( entries: Array<[KA, V]> ): Array<[KB, V]> => entries.map( ( [ k, v ] ) => [ fn( k ), v ] as [KB, V] )
export const filterEntryValues = <V>( fn: Predicate<V> ) => <K>( entries: Array<[K, V]> ): Array<[K, V]> => entries.filter( ( [ k, v ] ) => fn( v ) )
export const filterEntryKeys = <K>( fn: Predicate<K> ) => <V>( entries: Array<[K, V]> ): Array<[K, V]> => entries.filter( ( [ k, v ] ) => fn( k ) )
