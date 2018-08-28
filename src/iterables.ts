import { untypedCurry, pipeline } from './function'
import { toArray, reverse, joinArray } from './array'

/**
 * mapIterable
 */
export const _mapIterable = untypedCurry((fn,itr) => {
  const arr: any[] = []
  for (let i of itr) {
    arr.push(fn(i))
  }
  return arr
})

/**
 * Takes a function f and an iterable i and returns an array with f mapped over i
 * :: ( f -> a -> b ) -> Iterable<a> -> b[]
 */
export function mapIterable<A,B>(fn: (item: A) => B, itr: Iterable<A> | NodeListOf<Node>): B[]
export function mapIterable<A,B>(fn: (item: A) => B) : (itr: Iterable<A> | NodeListOf<Node>) => B[]
export function mapIterable(...args) {
  return _mapIterable(...args)
}


export const _mapIterableWithIndex = untypedCurry((fn,itr) => {
  const arr: any[] = []
  let index = 0
  for (let i of itr) {
    arr.push(fn(i,index++))
  }
  return arr
})

/**
 * Takes a function f and an iterable i and returns an array with f mapped over i with index. Curried
 * :: ( f -> (a,i) -> b ) -> Iterable<a> -> b[]
 */
export function mapIterableWithIndex<A,B>(fn: (item: A, index: number) => B, itr: Iterable<A>): B[]
export function mapIterableWithIndex<A,B>(fn: (item: A, index: number) => B) : (itr: Iterable<A>) => B[]
export function mapIterableWithIndex(...args) {
  return _mapIterableWithIndex(...args)
}



/**
 * Takes any iterable and returns the reverse joined
 * :: Iter -> str
 */
export const toStringReverse = <A>(iter:Iterable<A>) => pipeline(iter,toArray,reverse,joinArray(''))
