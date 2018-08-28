import { curry } from './function'
import { assoc } from './object'
import { mapIterable } from './iterables'
import { Entry, Obj } from './helper-types'
/**
 * Takes a single key-value pair array and returns an object
 * 
 * @example
 * [ ['a', 1], ['b', 2] ].map( entryToObj ) // [ {a: 1}, { b: 2} ]
 * 
 * :: ( [ k, v ] ) -> { k : v } 
 */
export const entryToObj = curry(([key,value]) : object=> ({[key]: value}))

/**
 * Converts an array of entry pairs into an obj
 * @param entries array of pairs
 * entriesToObj([ ['a',1 ], ['b', 2]]) 
 * // => {a:1, b: 2}
 */
export const entriesToObj = <A>(entries: Entry<A>): Obj<A> => entries.reduce( (acc,[k,v]) => assoc(k as string,v,acc) ,{})

export const entries =  <O,K extends keyof O>(obj:O): [ K, O[K] ][] => Object.entries(obj) as [ K, O[K] ][] 

export const entryKeys = <K,V>(entries: [K,V][]): K[] => mapIterable( ([k,_]) => k, entries)
export const entryValues = <K,V>(entries: [K,V][]): V[] => entries.map( ([_,v]) => v )

export const keys = <V>(obj: { [k: string]: V } ): string[] => Object.keys(obj)
export const values = <V>(obj: { [k: string]: V } ): V[] => Object.values(obj)

