import { untypedCurry, curry } from './function'
/**
 * Extract new object from an obj given an array of keys
 * 
 * @example 
 * pluckObj( 'a', 'c' )( { a: 1, b: 2, c: 3}) // { a: 1, c: 3 }
 * 
 * :: ( k1, k2,...k3 ) -> o -> { k1: o[ k1 ], k2: o[ k2 ], ... k3: o[ k3 ] }
 */
export const pluckObj = ( ...itemsToPluck: string[] ) => ( obj : {} ) =>
  Object.keys( obj )
    .filter( i => itemsToPluck.indexOf( i ) > -1 )
    .reduce( ( acc, item ) => assoc( item )( obj[ item ] )( acc ), {} )


/**
 * prop
 */

const _prop = untypedCurry((prop,obj)=>obj[prop])

/**
 * Retrieves an object values given its property (key)
 * 
 * @example
 * prop( 'a', { a : 1 } ) // 1
 * 
 * :: k -> o -> o[ k ]
 */


export function prop<O, K extends keyof O, V>(prop: K,obj: O ): O[K]
export function prop<K extends string>(prop: K): <V>(obj: { [k in K]: V }  & {[k: string]: any} ) => V
export function prop(...args) {
  return _prop(...args)
}

/**
 * Retrieves an object values given its property name (key). Curried, not too strongly typed.
 * 
 * @example
 * shallowProp( 'a' , { a: 1 , b: 2} ) // 1
 * 
 * :: k -> o -> o[ k ]
 */
export const shallowProp = curry((prop: string, obj: object ): string | number | symbol | boolean => obj[ prop ])

/**
 * Flipped version of `prop`. Retrieves an objects values given its property name (key). Curried
 * 
 * @example
 * flippedProp( { a: 1}, 'a' ) // 1
 * 
 * :: o -> k -> o[ k ]
 */
export const flippedProp = <T, K extends keyof T>(obj: T) => (prop:K) => obj[ prop ]

/**
 * Extends object with key/value pair. Curried
 * 
 * @example
 * assoc( 'b', 2, { a: 1 } ) // { a: 1, b: 2 }
 * 
 * :: k -> v -> o -> {...o, {[k]: v}} }
 */
// export const assoc = curry((prop : Flat, value: any,  obj : {}) => Object.assign( {}, obj, {[ prop ]: value} ))
const _assoc = untypedCurry((prop,value,obj) => Object.assign( {}, obj, {[ prop ]: value} ))
export function assoc <P extends string,V,O>(prop:P, value: V, obj: O)  : {[prop in P]:V} & O
export function assoc <P extends string,V>(prop:P, value: V) : <O>(obj: O) =>    {[prop in P]:V} & O
export function assoc <P extends string>(prop:P) : <V>(value: V) => <O>(obj: O) =>  {[prop in P]:V} & O
export function assoc(...args) {
  return _assoc(...args)
}

/**
 * Extends a target object with a source
 * 
 * @example
 * assign( { a: 2, b: 2 }, { a: 1 } ) // { a: 1, b: 2 }
 * 
 * :: o1-> o2 -> {...o1, ...o2 }
 */

const _assign = untypedCurry(( target, source) => Object.assign({},target,source))
export function assign<T, S>(target: T, source: S): S & T;
export function assign<T>(target:T) : <S>(source: S) => S & T
export function assign(...args){
  return _assign(...args)
}
  
const _fromSinglePair = untypedCurry((key,value) => ({[key]: value}))
/**
 * Takes key and value return object single with key / value
 * @example
 * fromPair('a',1) // {a:1}
 */
export function fromSinglePair<K extends string,V>(k:K,v:V) : {[K in string]: V}
export function fromSinglePair<K extends string,V>(k:K,v:V) : {[K in number]: V}
export function fromSinglePair<K extends number,V>(k:K) :( v:V) => {[K in string]: V}
export function fromSinglePair<K extends number,V>(k:K) :( v:V) => {[K in number]: V}
export function fromSinglePair(...args) {
  return _fromSinglePair(...args)
}


interface KeyValuePair<K, V> extends Array<K | V> {
  0: K;
  1: V;
}

const _fromPairs = untypedCurry(<V>(kv:KeyValuePair<string, V>[]) =>
  kv.reduce( 
    (acc,[k,v]) => assign(acc,{[k]:v} ) , 
    {} 
  )
)

export function fromPairs <V>(kv: KeyValuePair<string, V>[]) :  { [index: string]: V };
export function fromPairs <V>(kv: KeyValuePair<number, V>[]) :  { [index: number]: V };
export function fromPairs(...args) {
  return _fromPairs(...args)
}

// export const fromEntries = fromPairs


/**
 * Takes an array of paths to lookup and a look up object, returns value at path or null. 
 * 
 * @example
 * path( 'a', 'b', 'c' )( {a: { b: {c : 1 } } } ) // 1
 * 
 * :: ( k1, k2, ... k3 ) -> o -> o[ k1 ][ k2 ][ k3 ] 
 */

export const _pathValue = untypedCurry(( path : string[], obj : {} ) => path.reduce( ( acc, item ) => acc.hasOwnProperty(item) ? acc[ item ] : undefined, obj ))

type valueof<T> = T[keyof T]

type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;
export function getPathValue<L, K1 extends keyof L>(path: [K1], obj: L): Unpacked<[K1] > extends K1 ? L[K1] : unknown
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1]>(path:  [K1,K2] , obj: L): L[K1][K2]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3] , obj: L): L[K1][K2][K3]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path:  [K1, K2, K3, K4] , obj: L): L[K1][K2][K3][K4]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path:  [K1, K2, K3, K4, K5] , obj: L): L[K1][K2][K3][K4][K5]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path:  [K1, K2, K3, K4, K5, K6], obj: L): L[K1][K2][K3][K4][K5][K6]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path:  [K1, K2, K3, K4, K5, K6, K7] , obj: L): L[K1][K2][K3][K4][K5][K6][K7]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8] , obj: L): L[K1][K2][K3][K4][K5][K6][K7][K8]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9], obj: L): L[K1][K2][K3][K4][K5][K6][K7][K8][K9]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] , obj: L): L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
export function getPathValue<A extends string, O = {[K in A]?: unknown }>(path: A[]): (obj: O) => valueof<O>
// export function pathValue<L, K1 extends keyof L>(path: [K1]): ( obj: L) => L[K1]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1]>(path:  [K1,K2] ): ( obj: L) => L[K1][K2]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3] ): ( obj: L) => L[K1][K2][K3]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path:  [K1, K2, K3, K4] ): ( obj: L) => L[K1][K2][K3][K4]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path:  [K1, K2, K3, K4, K5] ): ( obj: L) => L[K1][K2][K3][K4][K5]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path:  [K1, K2, K3, K4, K5, K6]): ( obj: L) => L[K1][K2][K3][K4][K5][K6]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path:  [K1, K2, K3, K4, K5, K6, K7] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8][K9]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
export function getPathValue(...args) {
  return _pathValue(...args)
}

const bro = {
  a: 1,
  b: {c: 2}
}

const br = getPathValue(['a'],bro)