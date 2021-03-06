/** @module transduce.ts */

import { HKT, Type, URI2HKT, URIS } from 'fp-ts/lib/HKT'
import {
  Applicative,
  EntryKey,
  EntryValue,
  Functor,
  Predicate,

} from './helper-types'
import { trace } from './logging'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'babakness/transduce': Transduce<A>,
    'Array': A[],
  }
}

const assign = ( prop, value: any,  obj: {} ) => Object.assign( {}, obj, {[ prop ]: value} )
const identity = ( a ) => a

export const mapPairValue = <VA, VB>( fn: ( a: VA ) => VB ) => <K>( [ k, v ]: [K, VA] ): [K, VB] => [ k, fn( v ) ] as [K, VB]
export const mapPairKey = <KA, KB>( fn: ( a: KA ) => KB ) => <V>( [ k, v ]: [KA, V] ): [KB, V] => [ fn( k ), v ] as [KB, V]
export const filterPairValue = <V>( fn: Predicate<V> ) => <K>( [ k, v ]: [K, V] ): boolean => fn( v )
export const filterPairKey = <K>( fn: Predicate<K> ) => <V>( [ k, v ]: [K, V] ): boolean => fn( k )

export const mapping = ( transform ) => ( reducing ) => ( acc, item ) => reducing( acc, transform( item ) )
export const filtering = ( predicate: ( item ) => boolean ) => ( reducing ) => ( acc, item ) => predicate( item ) ? reducing( acc, item ) : acc
export const filterReducer = ( predicate: ( acc, item ) => boolean ) => ( reducing ) => ( acc, item ) => predicate( acc, item ) ? reducing( acc, item ) : acc
export const reduceEntries = ( acc, [ k, v ] ) => assign( k, v, acc )

/**
 * Idea: implement Either within transduce stream, ie, map become "right" and mapLeft, reduceLeft, etc, operate on Left. Swap could swap left and right
 */

//
export class Transduce<A> {
  // static readonly _A: A
  static readonly _URI: 'babakness/transduce'
  static of<K, V, B extends [K, V]>( xs: B[] ): Transduce<B>
  static of<B>( xs: B[] ): Transduce<B>
  static of<B>( xs: B[] ) {
    return new Transduce( xs )
  }

  static toPairs<K, V, B extends [K, V]>( xs: Record<any, any> ): Transduce<B>
  static toPairs<B>( xs: Record<any, any> ): Transduce<B>
  static toPairs<B>( xs: Record<any, any> ) {
    return new Transduce( Object.entries( xs ) )
  }

  private static spreadArgsCompose = ( ...fns ) => ( ...args ) => fns.reduceRight(
    ( result, fn ) => fn.apply( fn, [].concat( result ) ),
    args,
  )
  readonly _A!: A
  readonly _URI!: 'babakness/transduce'
  // list : A[]
  constructor( readonly list: A[], readonly xform: ( reducing: any ) => ( acc: any, item: any ) => any = mapping( identity ) ) {
    // this.list = list
    // this.xform = xform
  }

  map<B>( fn: ( a: A ) => B ): Transduce<B>  {
    const forceB = ( a ): a is B[]  => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( mapping( fn ) ) )
  }

  mapPairKey<KA extends EntryKey<A>, KB, V extends EntryValue<A>>( fn: ( a: KA ) => KB ): Transduce<[KB, V]>  {
    const forceB = ( a ): a is Array<[KB, V]>  => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( mapping( mapPairKey ( fn ) ) ) )
  }
  mapPairValue<K extends EntryKey<A>, VA extends EntryValue<A>, VB>( fn: ( a: VA ) => VB ): Transduce<[K, VB]>  {
    const forceB = ( a ): a is Array<[K, VB]>  => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( mapping( mapPairValue ( fn ) ) ) )
  }

  filterType<B extends A>( predicate: ( a: A ) => a is B ): Transduce<B> {
    const forceB = ( a ): a is B[] => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( filtering( predicate ) ) )
  }

  filter( predicate: ( a: A ) => boolean ): Transduce<A> {
    return new Transduce( this.list, this.compose( filtering( predicate ) ) )
  }

  filterPairKey<K extends EntryKey<A>>( predicate: ( a: K ) => boolean ): Transduce<A> {
    // const filterEntryKey = <K>(fn: Predicate<K>) => <V>([k,v]: [K,V]): boolean => fn(k)
    return new Transduce( this.list, this.compose( filtering( filterPairKey( predicate ) ) ) )
  }

  filterPairKeyType<K extends EntryKey<A>, V extends EntryValue<A>, KT extends K>( predicate: ( a: K ) => a is KT ): Transduce<[KT, V]> {
    // const filterEntryKey = <K>(fn: Predicate<K>) => <V>([k,v]: [K,V]): boolean => fn(k)
    const forceB = ( a ): a is Array<[KT, V]> => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( filtering( filterPairKey( predicate ) ) ) )
  }

  filterPairValue<V extends EntryValue<A>>( predicate: ( a: V ) => boolean ): Transduce< A> {
    return new Transduce( this.list, this.compose( filtering( filterPairValue( predicate ) ) ) )
  }

  filterPairValueType<K extends EntryKey<A>, V extends EntryValue<A>, VT extends V>( predicate: ( a: V ) => a is VT ): Transduce<[K, VT]> {
    const forceB = ( a ): a is Array<[K, VT]> => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    return new Transduce( list, this.compose( filtering( filterPairValue( predicate ) ) ) )
  }

  chain<B>( fn: ( a: A ) => Transduce<B> ): Transduce < B[] >  {
    const forceB = ( a ): a is B[][]  => {
      return true
    }
    const list = forceB( this.list ) ? this.list : []
    // return new Transduce(this.join().map( i => fn(i).join() ), mapping(identity) )
    return new Transduce( list, this.compose( ( reducing ) => ( acc, item ) => reducing( acc, fn( item ).join() ) ) )

  }

  ap<B>( other: Transduce< ( a: A ) => B > ): Transduce < B > {
    const foo =  other.map( ( f ) => this.map( ( x ) => f( x ) ).join() as any ) as Transduce<B>
    return foo
  }

  take( n: number ): Transduce < A > {
    return new Transduce( this.list, this.compose( filterReducer( ( acc, item ) => acc.length + 1 <= n  ? true : false ) ) )
  }

  every( n: number , offset = 0 ): Transduce < A > {
    let count = -1
    const reducer = ( acc, item ) => count++ < offset - 1
      ? false // ( trace( count ), false )
      : ( count  + offset ) % n === 0
        ? true
        : false

    // const reducer = getReducer( 0 )
    return new Transduce( this.list, this.compose( filterReducer( reducer ) ) )
  }

  /**
   * order switched for compatibility with fp-ts library
   */
  fold<B>( init: B, concat: ( acc: B, item: A ) => B ): B {
    return  this.list.reduce( this.xform( concat ), init )
  }

  reduce<B>( concat: ( acc: B, item: A ) => B, init: B ): B {
    return  this.list.reduce( this.xform( concat ), init )
  }
  join( concat = ( acc, item ) => acc.concat( item ), init = [] ): A[ ] {
    return  this.list.reduce( this.xform( concat ), init )
  }

  /**
   * If the inner value is of form [K,V][] (see this `param` for details),
   * then this method will reduce or fold the inner value into an object.
   */
  joinFromPairs < K, B extends A extends [K, ( infer U )] ? A : undefined >( this: Transduce < B > , init = {} ): { [k: string]: A extends [K, ( infer U )] ? U : A } {
    const concat = ( acc, [ k, v ] ) => assign( k, v, acc )
    return this.list.reduce( this.xform( concat ), init )
  }
  traverseLegacy<F extends URIS, B, C>( this: Transduce < HKT < F, B >> , of: ( a: Transduce<any> ) => Type < F, Transduce < B >> , fn: ( a: B ) => C ): Type < F, Transduce < C >> {
    const ofArray = this.list.reduce( this.xform(
      ( outer, item ) => outer.ap( item.map( ( itemValue ) => ( outerValue ) => outerValue.concat( fn( itemValue ) ) ) ),
    ), of( [] as any ) )

    return ofArray.map( ( arr ) => Transduce.of( arr ) )
  }

  traverse<F extends URIS, B, C>( F: Applicative < B | never[ ] | B[ ] | C > , fn: ( a: A ) => HKT<F, B> & Functor<B> ): Type < F, Transduce < B >> {
    const ofArray = this.list.reduce( this.xform(
      ( outer, item ) => outer.ap( fn( item ).map( ( itemValue ) => ( outerValue ) => outerValue.concat( itemValue ) ) ),
    ), F.of( [] ) )

    return ofArray.map( ( arr ) => Transduce.of( arr ) )
  }

  sequenceLegacy<F extends URIS, B>( this: Transduce < HKT < F, B >> , of: ( a: Transduce<any> ) => Type<F, Transduce<B>> ): Type < F, Transduce < B >> {
    return this.traverseLegacy( of, identity )
  }

  sequence<F extends URIS, B, C>( this: Transduce < HKT < F, B >> , F: Applicative<Transduce<B> | never[] | B[] > ): Type < F, Transduce < B >> {
    return this.traverseLegacy( F.of as any, identity )
  }

  traverse_<F extends URIS, B, C>( this: Transduce < HKT < F, B >> , of: ( a: Transduce<any> ) => Type < F, Transduce < B >> , fn: ( a: Type<F, B> ) => HKT<F, C> ): Type < F, Transduce < C >> {
    const ofArray = this.list.reduce( this.xform(
      ( outer, item ) => outer.ap( ( fn( item ) as any ).map( ( itemValue ) => ( outerValue ) => outerValue.concat( itemValue ) ) ),
    ), of( [] as any ) )

    return ofArray.map( ( arr ) => Transduce.of( arr ) )
  }

  sequenceNonStandardFunctor<F extends URIS, B>( this: Transduce < HKT < F, B >> , of: ( a: Transduce<any> ) => Type<F, Transduce<B>> ): Type < F, Transduce < B >> {
    // hacky solution when only `map` is known to behave as expected (non-Fantasy `ap`)
    const _arr = this.list.reduce( this.xform( ( arr, functor ) => {
      functor.map( ( value ) => arr.push( value ) )
      return arr
    } ), [] )
    return of( Transduce.of( _arr ) )
  }

  private compose( fn ) {
    return Transduce.spreadArgsCompose( this.xform, fn )
  }
}
