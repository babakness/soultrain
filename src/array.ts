import { curry, untypedCurry, pipeline } from './function'
import { times } from './flow'
import { mapIterable } from './iterables'
import { Transduce } from './transduce'
import { Maybe, nothing } from './maybe';
import { values } from './entries';
import { trace } from './logging';
import { FlattenArray, Predicate, Predicate2 } from './helper-types'
import { safeProp } from './maybe-functions';
import { assign, assoc, fromSinglePair } from './object';

const identity = a => a // untyped

/**
 * Takes a string and array of strings; returns string. Curried
 * :: str -> str[] -> str
 */
export const joinStringArray = curry((str: string, list: string[]) => list.join( str ))

/**
 * Takes a string and array of any; returns string as Javascript would handle it by default. Curried
 * :: str -> a[] -> str
 */
export const joinArray = curry((str: string, list: {}[]) => list.join( str ))



const appendToProp = <A>(item,key,acc) => (safeProp( key, acc) as Maybe<A[]>)
  .map( (groupXs: A[]) => groupXs.concat(item) )
  .joinOrValue([item])

const _groupBy = untypedCurry(<A>(fn: (A) => string, list:A[]) => {
  return list.reduce( 
    (acc,item:A) => assign(
      acc,
      Maybe.of( fn(item) )
        .map( key => fromSinglePair( key,appendToProp(item,key,acc)) )
        .joinOrValue({})
    ),  
    {}
  )
})

export function groupBy<T>(fn: (a: T) => string, list: ReadonlyArray<T>): { [index: string]: T[] };
export function groupBy<T>(fn: (a: T) => string): (list: ReadonlyArray<T>) => { [index: string]: T[] };
export function groupBy(...args){
  return _groupBy(...args)
}


export const _splitAt = untypedCurry((num,arr) => [
  arr.slice(0,num),
  arr.slice(num,Infinity)
])
/**
 * Takes a number and an array, returns two arrays from array divided at split point
 * :: n -> a[] -> [ a[], a[] ]
 * @example
 * splitAt(2,[1,2,3,4,5,6]) // [ [1,2],[3,4,5,6] ]
 */
export function splitAt<A>(num: number,arr: A[]): [A[],A[]] 
export function splitAt<A>(num: number) : (arr: A[]) => [A[],A[]] 
export function splitAt(...args){
  return _splitAt(...args)
}



export const _arrayItemsMeetPredicate = untypedCurry(<A>(predicate: Predicate2<A,A>, list: A[]): boolean => {
  for(let i = 1; i <= list.length -1; i++ ){
    if( !predicate(list[i-1],list[i])){
      return false
    } 
  }
  return true
})



/**
 * Takes a predicate (taking the current and previous values) and an array, 
 * returns true if every item in array return true for predicate; else false.
 * :: ((a1,a2) -> bool) -> [a1,a2,a3...an] -> bool
 * @example
 * arrayItemsMeetPredicate( (current,previous) => current > previous , [1,2,3,4,2]) // false
 * arrayItemsMeetPredicate( (current,previous) => current > previous , [1,2,3,4,]) //true
 */
export function arrayItemsMeetPredicate<A>(predicate: Predicate2<A,A>, list: A[]): boolean
export function arrayItemsMeetPredicate<A>(predicate: Predicate2<A,A>):(list: A[]) => boolean
export function arrayItemsMeetPredicate(...args) {
  return _arrayItemsMeetPredicate(...args)
}



const _arrayItemsAllEqual = untypedCurry((value,list) => 
  list.reduce( 
    (acc,item) => 
      acc.chain( prev => prev === item ? Maybe.of(item) : nothing ),
      Maybe.of(value) 
  ).isJust() 
)

/**
 * Takes a value and an array, returns true if every item in array matches value; else false.
 * :: a -> a[] -> bool
 * @example
 * arrayItemsAllEqual(1,[1,2,2]) // false
 * arrayItemsAllEqual(1,[1,1,1]) // true
 */
export function arrayItemsAllEqual <A>(value: A, list:A[]) : boolean 
export function arrayItemsAllEqual <A>(value: A) : (list:A[]) => boolean 
export function arrayItemsAllEqual(...args) {
  return _arrayItemsAllEqual(...args)
}

/**
 * Takes an array of number and returns the sum value
 * :: number[] -> number
 */
export const sumArray = (arr: number[]): number => arr.reduce( (acc,item) => acc + item , 0)

export const flattenArray = <A>(arr: A[]): FlattenArray<A[]>  =>
  arr.reduce((acc, item) => acc.concat(item ), [] as A[] ) as FlattenArray<A[]>
  
/**
 * Takes an array an returns a copy reversed
 * :: a[] -> a[]
 */
export const reverse = <A>(arr: Array<A>) => [...arr].reverse()


/**
 * Takes a function, arguments, and returns function with arguments applied
 * :: ( fn -> (... args) -> a ) -> (...args) -> a 
 */
export const applyOver = <A>(fn: (...a) => A) => ( ...args ): A => fn( ...args )


/**
 * Takes a function and its arguments, then more, arguments, and returns function with arguments applied
 * :: ( fn, ...args1 ) -> ( ...args2 ) -> fn(...args1,...args2)
 */
export const applyOverPartial = <A>(fn: (...a) => A, ...args1) => ( ...args2 ): A => fn( ...args1, ...args2 )

/**
 * mapArray
 */
const _mapArray = untypedCurry( (fn, arr) => times( index => fn( arr[ index ] ), arr.length ))

/**
 * Takes a function f and an array a and returns an array with f mapped over a
 * :: ( f -> a -> b ) -> a[] -> b[]
 */
export function mapArray<A,B>(fn: (item: A) => B, arr: A[]): B[]
export function mapArray<A,B>(fn: (item: A) => B) : (arr: A[]) => B[]
export function mapArray(...args) {
  return _mapArray(...args)
}



const _pluck = untypedCurry((key, arr) => arr.map( item => item[key]))
/**
 * Takes an key (or index) and an array of arrays or objects and returns 
 * the selected key from each row
 * @example
 * pluck(1, [ [1,2,3], [4,5,6] ] ) // [2,5]
 */
export function pluck<A,B extends keyof {[i in number]: any} >(key: B, arr:A[][]): (A | undefined)[]
export function pluck<A,B extends keyof A>(key: B, arr:A[]): A[B][]
export function pluck<B extends number>(key: number) : <A>(arr:A[][]) => (A | undefined)[]
// export function pluck<B extends string,C,D extends Record<B,C>,E extends keyof C>(key: B) :(arr:C[]) => {[H in B ]?: C[E]}[B][]
export function pluck<A extends string, B = [{ [K in A]?: any }]> (keys: A): (arr: B) => B
export function pluck(...args) {
  return _pluck(...args)
}


const _chunk = untypedCurry(( n: number,  arr: any[] ) => !arr.length
  ? []
  : [ arr.slice( 0, n ) ].concat( _chunk( n , arr.slice( n ) ) ))

/**
 * Takes a number n and an array, returns new array with items grouped every n 
 * :: n -> a[] -> a[][]
 */
export function chunk<A>(n: number, arr: A[]): A[][] 
export function chunk<A>(n: number) : (arr:A[]) => A[][]
export function chunk(...args) {
  return _chunk(...args)
}


// export const arrayMapWithIndex = <A>(fn: (item,index: number) => A) => (arr: any[]): A[] => times( (index:number) => fn( arr[ index ], index ) )( arr.length )

/**
 * Takes an iterable and returns an array
 * :: Iterable<a> -> a[]
 */
export const toArray = <A>(iterable: Iterable<A> | NodeListOf<Node> ): A[] => mapIterable( identity, iterable )

/**
 * Takes any iterable and returns the reverse as an array
 * :: Iter -> a[]
 */

export const toArrayReverse = <A>(iter:Iterable<A>) => pipeline(iter, toArray,reverse)


/**
 * Return first item in array
 * 
 * @example
 * head( [ 1, 2, 3 ] ) // 1
 * 
 * :: a[] -> a
 */
export const head = <A>( arr : A[] ): A => arr[ 0 ]


/**
 * Return last item in array
 * 
 * @example
 * last( [ 1, 2, 3 ] ) // 3 
 * :: a[] -> a
 */

export const last = <A>( arr : A[] ): A => arr[ arr.length - 1 ]



/**
 * 
 * predicate takes an array and an item and returns if array contains item
 * @example
 * includes([1,2,3])(1) // true
 */
export function contains <A>(arr: A[], item: A) : boolean
export function contains <A>(arr: A[]) : (item: A) =>  boolean
export function contains(...args){
  return untypedCurry( (arr, item ): boolean => arr.includes(item)  )(...args)
}

/**
 * Alias for `contains`
 */
export const includes = contains


/**
 * Takes arguments for slice, an array, and returns sliced array
 * :: (...args) -> a[] -> a[]
 */
export const slice = ( ...args ) => <A>(list: A[]) => list.slice( ...args )



/**
 * Get the array after the head
 * Takes array and returns all but first element
 * 
 * @example
 * tail( [ 1 , 2,  3, 4 ] ) // [ 2, 3, 4 ]
 * 
 * :: a[] -> a[]
 */
export const tail = <T>( arr : T[] ): T[] => arr.slice( 1 )



/**
 * Get the array before the last item
 * Takes array and returns all but last element
 * 
 * @example
 * init( [ 1 , 2,  3, 4 ] ) // [ 1, 2, 3 ]
 * 
 * :: a[] -> a[]
 */
export const init = <T>( arr : T[] ): T[] => arr.slice( 0, -1 )



/**
 * Take the first `n` items in an array
 * Takes a number n, an array, and returns an array with first n elements. Curried.
 * 
 * @example
 * take(2, [1,2,3,4]) // [1,2]
 * 
 * :: n -> a[] -> a[]
 */
export const take = <T, N extends number>( n : N,  arr : T[] ): T[] => arr.slice( 0, n ) 


const _every = untypedCurry( (n, offset, arr) => Transduce.of(arr)
    .every(n,offset)
    .join()
)

/**
 * Takes a number `n`, an offset, and an array returns 
 * an array with every other `n` item skipped. 
 * @example
 * every(2,1,[1,2,3,4]) // [2,4]
 */
export function every( n: number ): (offset: number) => <A>( arr: A[] ) => A[]
export function every( n: number, offset: number) : <A>( arr: A[] ) => A[]
export function every<A>( n: number, offset: number, arr: A[] ): A[]
export function every( ...args ) {
  return _every(...args)
}


const _index = untypedCurry((index,arr) => arr[index])

/**
 * takes an index and an array and returns the value at array's index
 * @example
 * index(2,[1,2,3]) // 3
 */

export function index<A,B extends keyof A>(index: B | number, arr: A) : A[B] | undefined
export function index<A,B extends keyof A>(index: B | number) : (arr: A) => A[B] | undefined
export function index(...args){
  return _index(...args)
}