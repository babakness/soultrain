/** @module helper-types.ts */

// import {IsFinite} from 'typescript-tuple'

export enum adtn {
  ap = 'babakness/ap',
  map = 'babakness/map',
  chain = 'babakness/chain',
  flatMap = 'babakness/flatMap',
}

Array.prototype[ adtn.chain ] = function( fn ) {
  return this.reduce( ( acc, item ) => acc.concat( fn( item ) ) , [] )
}

Array.prototype[ adtn.ap ]  = function( arr ) { // Apply
  return arr[ adtn.chain ]( ( fn ) => this.map( fn ) )
}
Array.of = ( val ) =>  [ val ]

declare global {
  interface ArrayConstructor {
    _URI: 'Array'
  }
  interface Array<T> {
    [ adtn.ap ]: <U>( a: any ) => U[],
    of: T[],
  }
}

export type EntryKeyValue<A> = A extends [infer KEY, infer VALUE] ? [KEY, VALUE] : undefined
export type EntryKey<A> = A extends [infer KEY, infer VALUE] ? KEY : undefined
export type EntryValue<A> = A extends [infer KEY, infer VALUE] ? VALUE : undefined

// Types used in project
export type Flat = number|string|symbol
export type Pairs<A, B> = Array<[A, B]>
export interface Obj<T> { [k: string]: T }
export type Predicate<A> = ( x: A ) => boolean
export type Predicate2<A, B> = ( x: A, y: B ) => boolean
export type Complement<T extends boolean> = Exclude<boolean, T> extends never ? boolean : Exclude<boolean, T>
export type FlattenArray<T> = T extends any[][] ? T[number] : T

export type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never
export type Optional<T, K extends keyof T > = T extends any ? Omit<T, K> & {[P in K]?: T[K]} : never

// export type valueof<G,I extends keyof G> = G[I]

export type ValueAt<G, I extends keyof G> = G[ I ]
export type ValueOf<T> = T[ Exclude<keyof T, keyof any[]> ]
export type KeyOf<T> = Exclude<keyof T, keyof any[]>
export type KeyTypes = string | number | symbol
export type Unpacked<T> =
    T extends Array<infer U> ? U :
    // tslint:disable-next-line:no-shadowed-variable
    T extends ( ...args: any[] ) => infer U ? U :
    // tslint:disable-next-line:no-shadowed-variable
    T extends Promise<infer U> ? U :
    T

export type Function1<A, B> = ( a: A ) => B
export type Function2<A, B, C> = ( a: A, b: B ) => C
export type Function3<A, B, C, D> = ( a: A, b: B, c: C ) => D
export type Function4<A, B, C, D, E> = ( a: A, b: B, c: C, d: D ) => E
export type Function5<A, B, C, D, E, F> = ( a: A, b: B, c: C, d: D, e: E ) => F
export type Function6<A, B, C, D, E, F, G> = ( a: A, b: B, c: C, d: D, e: E, f: F ) => G
export type Function7<A, B, C, D, E, F, G, H> = ( a: A, b: B, c: C, d: D, e: E, f: F, g: G ) => H
export type Function8<A, B, C, D, E, F, G, H, I> = ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H ) => I
export type Function9<A, B, C, D, E, F, G, H, I, J> = ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I ) => J

export type FunctionV<A, B> = ( ...a: A[] ) => B

export type Function_21<A, B, C, D> = ( a: A, b: B ) => ( c: C ) => D
// export type Function_12<A, B, C, D> = (a: A) =>  (b: B, c: C) => D
export type Function_211<A, B, C, D, E> = ( a: A, b: B ) => ( c: C ) => ( d: D ) => E
export type Function_22<A, B, C, D, E> = ( a: A, b: B ) => ( c: C, d: D ) => E
export type Function_31<A, B, C, D, E> = ( a: A, b: B, c: C ) => ( d: D ) => E
// export type Function_22<A, B, C, D, E> = (a: A, b: B) => (c: C, d: D) => E
// export type Function_121<A, B, C, D, E> = (a: A) => ( b: B, c: C) => (d: D) => E
// export type Function_112<A, B, C, D, E> = (a: A) => ( b: B ) => (d: D) => E
// export type Function_13<A, B, C, D, E> = (a: A) => (b: B, c: C, d: D) => E
export type Function_2111<A, B, C, D, E, F> = ( a: A, b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => F
export type Function_311<A, B, C, D, E, F>  = ( a: A, b: B, c: C ) => ( d: D ) => ( e: E ) => F
export type Function_41<A, B, C, D, E, F>   = ( a: A, b: B, c: C, d: D ) => ( e: E ) => F
export type Function_51<A, B, C, D, E, F, G>   = ( a: A, b: B, c: C, d: D, e: E ) => ( f: F ) => G
export type Function_61<A, B, C, D, E, F, G, H>   = ( a: A, b: B, c: C, d: D, e: E, f: F ) => ( g: G ) => H

export type Curried1<A, B> = ( a: A ) => B
export type Curried2<A, B, C> = ( a: A ) => ( b: B ) => C
export type Curried3<A, B, C, D> = ( a: A ) => ( b: B ) => ( c: C ) => D
export type Curried4<A, B, C, D, E> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => E
export type Curried5<A, B, C, D, E, F> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => F
export type Curried6<A, B, C, D, E, F, G> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => ( f: F ) => G
export type Curried7<A, B, C, D, E, F, G, H> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => ( f: F ) => ( g: G ) => H
export type Curried8<A, B, C, D, E, F, G, H, I> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => ( f: F ) => ( g: G ) => ( h: H ) => I
export type Curried9<A, B, C, D, E, F, G, H, I, J> = ( a: A ) => ( b: B ) => ( c: C ) => ( d: D ) => ( e: E ) => ( f: F ) => ( g: G ) => ( h: H ) => ( i: I ) => J

export interface Functor<A> {
  map<B>( fn: Function1<A, B> ): Functor<B>
}

export interface Apply<A> extends Functor<A> {
  ap<B>( fn: Apply< ( a: A ) => B> ): Apply<B>
}

export interface ArrayApply<A> extends Functor<A> {
  [ adtn.ap ]<B>( fn: Apply< ( a: A ) => B> ): ArrayApply<B>
}

export interface Applicative<A> {
  of( val: A ): Apply<A>
}

export interface Applicative<A> {
  of( val: A ): Apply<A>
}

export interface ArrayApplicative<F, A> {
  _URI: F
  of( val: A ): ArrayApply<A>
}

export interface Filterable<A> {
  filter( fn: Predicate<A> ): Filterable<A>
}

export interface HKT0<F> {
  readonly _URI: F
}

export interface Pushable<A> {
  readonly concat: ( item: A ) => Pushable<A>
}

export interface Concattable<A> {
  readonly concat: ( item: A ) => Concattable<A>
}

export interface Curried<A, B, Z> {
  ( b: B , a: A ): Z
  ( b: B ): ( a: A ) => Z
}

// export type AnyFunction = ( ...a: any[] ) => any

export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends AnyFunction ? K : never }[keyof T]
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
export type ObjectPropertyNamesByType<O, T> = { [K in keyof O]: O[K] extends T ? K : never }[keyof O]
export type ObjectPropertiesByType<O, T> = Pick<O, ObjectPropertyNamesByType<O, T>>

export type ToTuple<T> = T extends any[] ? T : any[]

// export type Last<Tuple extends any[]> = utils.Last<Tuple>

// export type Head<Tuple extends any[]> = Tuple extends [ infer H, ...any[] ] ? H : never
// export type Head<Tuple extends any[]> = ValueAt<Tuple, 0>

// export type Prepend<Tuple extends any[], Addend> = utils.Prepend<Tuple, Addend>
// export type Unshift<Tuple extends any[], Addend> = utils.Prepend<Tuple, Addend>

// export type Append<Tuple extends any[], Addend> = utils.Reverse<utils.Prepend<utils.Reverse<Tuple>, Addend>>
// export type Push<Tuple extends any[], Addend> = utils.Reverse<utils.Prepend<utils.Reverse<Tuple>, Addend>>

// /**
//  * Concat two tuple into one
//  * @example `Concat<[0, 1, 2], ['a', 'b', 'c']>` → `[0, 1, 2, 'a', 'b', 'c']`
//  */

// export type Concat<Left extends any[], Right extends any[]> = utils.Concat<Left, Right>

// /**
//  * Concat multiple tuples
//  * @example `ConcatMultiple<[], [0], [1, 2], [3, 4, 5]>` → `[0, 1, 2, 3, 4, 5]`
//  */
// export type ConcatMultiple<TupleSet extends any[][]> = utils.ConcatMultiple<TupleSet>
// type AnyArray = {[k in number]: any}
type AnyArray = any[]

export type Prepend<Tuple extends AnyArray, Addend> =
  ( ( _: Addend, ..._1: Tuple ) => any ) extends ( ( ..._: infer Result ) => any ) ? Result : never

export type Last<Tuple extends AnyArray, Default = never> = {
  'empty': Default,
  'single': Tuple extends [infer SoleElement] ? SoleElement : never,
  'multi': ( ( ..._: Tuple ) => any ) extends ( ( _: any, ..._1: infer Next ) => any ) ? Last<Next> : Default,
  'infinite': Tuple extends Array<infer Element> ? Element : never,
}[
    Tuple extends [] ? 'empty' :
    Tuple extends [any] ? 'single' :
      Tuple extends Array<infer Element>
        ? Element[] extends Tuple ? 'infinite'
        : 'multi'
    : never
  ]

export type Reverse<Tuple extends AnyArray, Prefix extends any[] = []> = {
  'empty': Prefix,
  'nonEmpty': ( ( ..._: Tuple ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
  ? Reverse<Next, Prepend<Prefix, First>>
  : never,
  'infinite': {
    ERROR: 'xCannot reverse an infinite tuple',
    CODENAME: 'InfiniteTuple',
  },
}[
Tuple extends [any, ...any[]]
  ? IsFinite<Tuple, 'nonEmpty', 'infinite'>
  : 'empty'
]

export type IsFinite<Tuple extends AnyArray, Finite = true, Infinite = false> = {
  empty: Finite,
  nonEmpty: ( ( ..._: Tuple ) => any ) extends ( ( _: infer First, ..._1: infer Rest ) => any )
    ? IsFinite<Rest, Finite, Infinite>
    : never,
  infinite: Infinite,
}[
  Tuple extends [] ? 'empty' :
  Tuple extends Array<infer Element> ?
  Element[] extends Tuple ?
    'infinite'
  : 'nonEmpty'
  : never
]

type _Concat<Left extends any[], Right extends any[]> = {
  'emptyLeft': Right,
  'singleLeft': Left extends [infer SoleElement]
    ? Prepend<Right, SoleElement>
    : never,
  'multiLeft': ( ( ..._: Reverse<Left> ) => any ) extends ( ( _: infer LeftLast, ..._1: infer ReversedLeftRest ) => any )
    ? _Concat<
        Reverse<
          ReversedLeftRest
        >,
        Prepend<
          Right,
          LeftLast
        >
      >
    : never,
  'infiniteLeft': {
    ERROR: 'Left is not finite',
    CODENAME: 'InfiniteLeft' & 'Infinite',
  },
}[
  Left extends [] ? 'emptyLeft' :
  Left extends [any] ? 'singleLeft' :
  IsFinite<Left, 'multiLeft', 'infiniteLeft'>
]

export type Tail<Tuple extends AnyArray> = ( ( ...t: Tuple ) => void ) extends ( ( h: any, ...rest: infer R ) => void ) ? R : never

export type Init<Tuple extends AnyArray> = Reverse<Tail<Reverse<Tuple>>>

type IsNestedArray<A, T = 'T', F = 'F'> = A extends any[][] ? T : F

export type FlattenOnce<T extends any[]> = DeepFlatten<T, [], 'next'>

export type Append<A extends any[], B> = Reverse<Prepend<Reverse<A>, B>>
export type Concat< A extends any[], B > = B extends any[] ? _Concat<A, B> : Append < A, B >
export type Head<A extends any[]> = ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
  ? First
  : ValueAt<A, 0>

type RemoveItem<A extends any[], R, N extends any[]= []> = {
  'skip': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? Concat<Next, N>
      : never,
  'add': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? RemoveItem<Next, R, Prepend<N, First>>
      : never,
}[
    A extends []
        ? N
        : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
          ? First extends R
            ? 'skip'
            : 'add'
          : never
  ]

// type RemoveProp<T, K extends keyof T = keyof T> = { [P in keyof T]: string}
// type Z = RemoveProp<{a: 1, b: 2}>
// type vv = asf
// type sf = Prepend<[1, 2], 3>

// export type FlattenOnce<A extends any> = A extends Array<infer U>
//   ? U
//   : never

export type FlattenType<A extends any[]> = {
  'deeper': A extends Array<infer U>
    ? U extends any[]
      ? FlattenType<U>
      : never
    : never,
  'done': A extends Array< infer U>
    ? U
    : never,
}[
  A extends Array<Array<infer U> >
  ? 'deeper'
  : 'done'
]

export type Identity = <A>( a: A ) => A

export type WidenType<T> =
  T extends string ? string
  : T extends number ? number
  : T extends boolean ? boolean
  : T extends symbol ? symbol
  // tslint:disable-next-line:ban-types
  : T extends Function ? Function
  : T extends object ? object
  : T extends undefined ? undefined
  : T extends null ? null
  : T
type _Deeper = 'deeper' | 'next'
// next
type _Pass = 'flattenType' | 'markInfinite' | 'error' | 'pass'
type _Advance = 'advance' | 'advanceWide'

export type DeepFlatten<A extends any[], N extends any[] = [], Deeper extends _Deeper = 'deeper', Advance extends _Advance = 'advance', Pass extends _Pass = 'pass'> = {
  // @ts-ignore
  'advance': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
  // @ts-ignore
    ? DeepFlatten< Next, N extends any[] ? _Concat< N, First> : never, Deeper, Advance, Pass>
    : never
  'advanceWide': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
  // @ts-ignore
    ? DeepFlatten< Next, N extends any[] ? _Concat< N, WidenType<First>> : never, Deeper, Advance, Pass>
    : never
  'deeper': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
  // @ts-ignore
    ? DeepFlatten< Next, N extends any[] ? _Concat< N, DeepFlatten<First>> : never, Deeper, Advance, Pass>
    : never
  // @ts-ignore
  'pass': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? DeepFlatten< Next, N extends any[] ? Append< N, First> : never, Deeper, Advance, Pass>
    : never
  // @ts-ignore
  'flattenType': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    // @ts-ignore
    ? DeepFlatten< Next, N extends any[] ? Append< N, FlattenType<First>> : never, Deeper, Advance, Pass>
    : never
  'markInfinite': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    // @ts-ignore
    ? DeepFlatten< Next, N extends any[] ? _Concat< N, 'infinite'> : never, Deeper, Advance, Pass>
    : never
  'error': {
    ERROR: 'Infinite Item',
    TEXT: 'Encountered an infinite item, evaluation haulted',
  }
  'done': N,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? First     extends any[]
        ? IsFinite < First > extends true
          ? Deeper
          : Pass // or error/markInfinite?
        : 'advance'
      : never
]

export type BasicTypes = string|number|boolean|symbol|object|undefined|null|void|never

export type WidenArray < T extends any[ ] > = T extends Array<infer U>
  ? U[]
  : T

/**
 * Deeply flattens a tuple and widens literals to general types
 */
export type DeepFlattenAndGeneralizeTuple < T extends any[] > = WidenArray < DeepFlatten < T, [], 'deeper', 'advanceWide', 'flattenType' >>

export type ContainsInfinite<A extends any[], N extends any[] = []> = {
  'next': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? ContainsInfinite< Next, Prepend<N, First>>
    : never
  'done': false,
  'found': true,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      // @ts-ignore
      ? IsFinite<First> extends true
        ? 'next'
        : 'found'
      : 'done'
]

export type ContainsType<A extends any[], T, N extends any[] = []> = {
  'next': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? ContainsType< Next, Prepend<N, First>>
    : never
  'done': false,
  'found': true,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? T extends First
        ? 'found'
        : 'next'
      : 'done'
]

type _DeepFlattenNoInfinite<T extends any[]> = ContainsInfinite<T> extends true
  ? DeepFlattenAndGeneralizeTuple<T>
  : T
/**
 * Deeply flatten a type, keeps literals unless there is an infinite type found
 */
export type DeepFlattenNoInfinite<T extends any[]> = {
  'generalize': _DeepFlattenNoInfinite<T>,
}[
  T extends any[]
    ? 'generalize'
    : never
]

export type Equals<A, B, T = true, F = false> =
  A extends B
    ? B extends A
      ? T
      : F
    : F

export type Contains<A extends any[], V, T = true, F = false> = {
  'next': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? Contains<Next, V, T, F>
    : never
  'found': T
  'done': F,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? Equals<First, V, 'found', 'next'>
      : never
]

export type Unique<A extends any[], R extends any[] = [], O extends any[] = A> = {
  'exclude': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? Unique<Next, R, O>
    : never
  'include': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? R extends ( [] | [any, ...any[]] )
      // @ts-ignore
      ? Unique<Next, Append<R, First>, O>
      : Unique<Next, R, O>
    : never
  'never': 'never'
  'simplify': WidenArray<O>
  'done': R,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      // @ts-ignore
      ? IsFinite<First> extends true
        ? Contains<R, First, 'exclude', 'include'>
        : 'simplify'
      : never
]

// @ts-ignore
export type AppendUnique<A extends any[], Item> = {
  'next': Append<A, Item>
  'done': A,
}[
  Contains<A, Item, 'done', 'next'>
]

export type Indices<T> = Exclude<keyof T, keyof any[]>
// export type Literal<A extends BasicTypes, B extends [A, ...A[]]= [A, ...A[]], C extends [B, ...B[]]= [B, ...B[]], D extends [C, ...C[]]= [C, ...C[]], E extends [D, ...D[]]= [D, ...D[]], F extends [E, ...E[]]= [E, ...E[]], G extends [F, ...F[]]= [F, ...F[]], H extends [G, ...G[]]= [G, ...G[]], I extends [H, ...H[]]= [H, ...H[]], J extends [I, ...I[]]= [I, ...I[]], K extends [J, ...J[]]= [J, ...J[]], L extends [ K, ...K[] ] = [K, ...K[]], M extends [ L, ...L[]] = [L, ...L[]],    , N extends [ M, ...M[ ] ] = [ M, ...M[ ] ], O extends [ N, ...N[ ] ] = [ N, ...N[ ] ], P extends [ O, ...O[ ] ] = [ O, ...O[ ] ], Q extends [ P, ...P[ ] ] = [ P, ...P[ ] ], Narrow extends BasicTypes | [ ( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P> ] =  [ ( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P> ] > = Narrow
export type Literal<A extends BasicTypes, B extends [A, ...A[]]= [A, ...A[]], C extends [B, ...B[]]= [B, ...B[]], Narrow extends BasicTypes | [ ( A | B | C ), ...Array<A | B | C > ] =  [ ( A | B | C ), ...Array<A | B | C > ] > = Narrow

export type KeySubset<E, I> = Exclude< keyof E, Extract<keyof E, keyof I> > extends never ? true : false // extends keyof E ? keyof E : never
export type HashKey =  'uuS*4_G]Sv<4eu-P""1giCjl3K~nLl[m>ePO9m/1ys?7:LH&A)MCr:a8g{X};8b'
export type IsAny<O, T = true, F = false> = HashKey extends O
  ? any extends O
    ? T
    : F
  : F
export type ContainsAny<A extends any[], T = true, F = false , N extends any[] = []> = {
  'next': ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? ContainsAny<Next, T, F, Prepend<N, First > >
    : never
  'found': T
  'done': F,
}[
  A extends []
    ? 'done'
    : ( ( ..._: A ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
      ? IsAny<First, 'found', 'next'>
      : 'done'
]

export type AnyObject = {[K in string ]: any}
export type IsArray<A, T= true, F= false> = A extends Array<infer U> ? T : F

export type Merge<A extends AnyObject, B extends AnyObject, C extends A & B = A & B  > = {
  'merge': {
    [I in keyof C]: I extends keyof B
      ? B[I]
      : C[I]
  }
  'done': {[I in string]: unknown},
  'array': 'ERROR: this type function is not design to merge arrays',
}[
  IsArray<A, 'array',
    IsArray<B, 'array',
      Contains<[A, B], object, 'done', 'merge'>
    >
  >
]

// type Unshift<Tuple extends any[], Element> = ( ( h: Element, ...t: Tuple ) => void ) extends ( ...t: infer R ) => void ? R : never

// export type Append<T extends any[], H> =
//   ( ( h: H, ...t: T ) => any ) extends ( ( ...l: infer L ) => any ) ? L : never

// export type Reverse<L extends any[], R extends any[] = []> = {
//   0: R,
//   1: ( ( ...l: L ) => any ) extends ( ( h: infer H, ...t: infer T ) => any ) ?
//       Reverse<T, Append<R, H>> :
//       never,
// }[L extends [any, ...any[]] ? 1 : 0]

// export type Push<Tuple extends any[], Element, R = Reverse<Tuple>, T extends any[]= ToTuple<R>> = Reverse<Unshift<T, Element>>

// type Reverse<Tuple extends any[]> = Reverse_<Tuple, []>;
// type Reverse_<Tuple extends any[], Result extends any[]> = {
//     1: Result,
//     0: Reverse_<Tail<Tuple>, Unshift<Result, Head<Tuple>>>
// }[Tuple extends [] ? 1 : 0];

// type Concat<Tuple1 extends any[], Tuple2 extends any[], R = Reverse<Tuple1>, T extends any[]= ToTuple<R>> = Concat_<T, Tuple2>
// type Concat_<Tuple1 extends any[], Tuple2 extends any[]> = {
//   1: Reverse<Tuple1>,
//   0: Concat_<Unshift<Tuple1, Head<Tuple2>>, Tail<Tuple2>>,
// }[Tuple2 extends [] ? 1 : 0]

// type x = Concat<[1, 2, 3], [4, 5, 6]> // [1, 2, 3, 4, 5, 6]
export type AnyFunction = ( ...args: any[] ) => any
export type ExtractFunctionArguments < Fn > = Fn extends  ( ...args: infer P ) => any  ? P : never
export type ExtractFunctionReturnValue<Fn> = Fn extends  ( ...args: any[] ) => infer P  ? P : never

export type ItemInsideIterable<I> = {
  'iterable': I extends Iterable<infer U>
    ? U
    : never
  'nodelist': I extends NodeListOf<infer U>
    ? U
    : never,
}[
  I extends Iterable<any>
    ? 'iterable'
    : I extends NodeListOf<any>
      ? 'nodelist'
      : never
]
