/** @module maybe.ts */

import { HKT, Type, URI2HKT, URIS } from 'fp-ts/lib/HKT'
import { isNullable, isNullyOrNaN } from './check'
import { adtn, Applicative, Apply, ArrayApplicative, ArrayApply, HKT0  } from './helper-types'

/* tslint:disable variable-name object-literal-sort-keys max-classes-per-file */

declare global {
  interface Array<T> {
    _URI: 'Array'
    _A: T
  }
}

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    Array: A[]
  }
}

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'babakness/maybe': Maybe<A>,
  }
}
export type Maybe<A> = Nothing<A> | Just<A>

export const Maybe = {
  _URI: 'babakness/maybe',
  of: <A>( a: A ): Maybe<A> => {
    return Just.of( a )
    // return isNully(a) ?  nothing : Just.of(a)
  },
  /**
   * Place nullable values (undefined and null) into a nothing, otherwise into a Just
   */
  from: <A>( a: A | undefined | null ): Maybe<A> => {
    return isNullable( a ) ? nothing : Just.of( a )
  },
}

export class Nothing<A> {
  static readonly _URI: 'babakness/maybe'
  static value: Maybe<never> = new Nothing()
  static of( value ) {
    return nothing
  }
  readonly _A!: A
  readonly _URI!: 'babakness/maybe'

  private constructor( ) { }

  fold<B>( valueWhenNothing: B, doWhenJust: ( a: A ) => B ): B {
    return valueWhenNothing
  }

  reduce<B>( doWhenJust: ( a: A ) => B , valueWhenNothing: B ): B {
    return valueWhenNothing
  }
  joinOrValue( a: A ): A {
    return a
  }
  joinOrDo( fn: () => A ): A {
    return fn()
  }
  map<B>( fn: ( a: A ) => B ): Maybe<B> {
    return nothing
  }

  mapNullable<B>( fn: ( a: A ) => B | undefined | null ): Maybe<B> {
    return nothing
  }

  chain<B>( fn: ( a: A ) => Maybe<B> ): Maybe<B> {
    return nothing
  }

  isJust(): this is Just<A> {
    return false
  }
  isNothing(): this is Nothing<A> {
    return true
  }

  ap<B>( fab: Maybe<( a: A ) => B> ): Maybe<B> {
    return nothing
  }
  ap_<B, C>( this: Maybe<( b: B ) => C>, fb: Maybe<B> ): Maybe<C> {
    return nothing
  }
  sequence<F extends URIS, G extends URIS, B, C>( this: Maybe<HKT<F, B>> & ( Maybe<Apply<B>> | Maybe<ArrayApply<B>> ), F: HKT0<F> | {of: ( a: A ) => ( HKT<G, C> & Apply<any> ) | ( HKT<G, C> & ArrayApply<any> ) } ): Type<G, Maybe<B>> {
    return ( F as any ).of( nothing )
  }
  sequenceNullable<F extends URIS, G extends URIS, B, C>( this: Maybe<HKT<F, B>> & ( Maybe<Apply<B>> | Maybe<ArrayApply<B>> ), F: HKT0<F> | {of: ( a: A ) => ( HKT<G, C> & Apply<any> ) | ( HKT<G, C> & ArrayApply<any> ) } ): Type<G, Maybe<B>> {
    return ( F as any ).of( nothing )
  }
  traverse<F extends URIS, E extends URIS, B, C>( this: Maybe<A> , F: Applicative<C> | ArrayApplicative<E, C>, fn: ( a: A ) => ( HKT<F, B> & Apply<C> ) | ( HKT<F, B> & ArrayApply<C> ) ): Type<F, Maybe<B>> {
    return ( F as any ).of( nothing )
  }
  traverseNullable<F extends URIS, E extends URIS, B, C>( this: Maybe<A> , F: Applicative<C> | ArrayApplicative<E, C>, fn: ( a: A ) => ( HKT<F, B> & Apply<C> ) | ( HKT<F, B> & ArrayApply<C> ) ): Type<F, Maybe<B>> {
    return ( F as any ).of( nothing )
  }
}

export const nothing = Nothing.value

export class Just<A> {
  static readonly _URI: 'babakness/maybe'
  static of<T>( value: T ) {
    return new Just( value )
  }
  readonly _A!: A
  readonly _URI!: 'babakness/maybe'

  constructor( readonly value: A ) { }

  traverse<F extends URIS, E extends URIS, B, C>( this: Maybe<A> , F: Applicative<C> | ArrayApplicative<E, C>, fn: ( a: A ) => ( HKT<F, B> & Apply<any> ) | ( HKT<F, B> & ArrayApply<any> ) ): Type<F, Maybe<B>> {
    const functor = this.isJust() ? fn( this.value ) : nothing
    return ( Maybe as any ).of( functor ).sequence( F as any )
  }

  traverseNullable<F extends URIS, E extends URIS, B, C>( this: Maybe<A> , F: Applicative<C> | ArrayApplicative<E, C>, fn: ( a: A ) => ( HKT<F, B> & Apply<any> ) | ( HKT<F, B> & ArrayApply<any> ) ): Type<F, Maybe<B>> {
    const functor = this.isJust() ? fn( this.value ) : nothing
    return ( Maybe as any ).from( functor ).sequenceNullable( F as any )
  }

  // sequence<F extends URIS,B,C>( this: Maybe< HKT<F,B> & Functor<B> & Apply<B>>  , F: (Applicative<Maybe<A>> | ArrayApplicative<Maybe<A>>)  ): Type<F,Maybe<B>> {
  sequence<F extends URIS, G extends URIS, B, C>( this: Maybe<HKT<F, B>> & ( Maybe<Apply<B>> | Maybe<ArrayApply<B>> ), F: HKT0<F> | {of: ( a: A ) => ( HKT<G, C> & Apply<any> ) | ( HKT<G, C> & ArrayApply<any> ) } ): Type<G, Maybe<B>> {
    const functor = this.isJust() ? this.value : nothing
    const isArray = ( f ): f is HKT<F, B> & ArrayApply<B> => Array.isArray( f )

    return ( isArray( functor ) ? functor[ adtn.ap ] : ( functor as any ).ap )
      .call( functor, ( F as any ).of( Maybe.of ) )
    // const x = map( )
  }

  sequenceNullable<F extends URIS, G extends URIS, B, C>( this: Maybe<HKT<F, B>> & ( Maybe<Apply<B>> | Maybe<ArrayApply<B>> ), F: HKT0<F> | {of: ( a: A ) => ( HKT<G, C> & Apply<any> ) | ( HKT<G, C> & ArrayApply<any> ) } ): Type<G, Maybe<B>> {
    const functor = this.isJust() ? this.value : nothing
    const isArray = ( f ): f is HKT<F, B> & ArrayApply<B> => Array.isArray( f )

    return ( isArray( functor ) ? functor[ adtn.ap ] : ( functor as any ).ap )
      .call( functor, ( F as any ).of( Maybe.from ) )
    // const x = map( )
  }

  joinOrValue( a: A ): A {
    return this.value
  }
  joinOrDo( fn: () => A ): A {
    return this.value
  }
  map<B>( fn: ( a: A ) => B ): Maybe<B> {
    // const gold = Maybe.flatten( Maybe.of( fn( this.value ) ))
    return Just.of( fn( this.value ) )
  }
  mapNullable<B>( fn: ( a: A ) => B | undefined | null ): Maybe<B> {
    return Maybe.from( fn( this.value ) )
  }

  chain<B>( fn: ( a: A ) => Maybe<B> ): Maybe<B> {
    return fn( this.value )
  }

  ap<B>( fab: Maybe<( a: A ) => B> ): Maybe<B> {
    return fab.isJust() ? Just.of( fab.value( this.value ) ) : nothing
  }
  ap_<B, C>( this: Maybe<( b: B ) => C>, fb: Maybe<B> ): Maybe<C> {
    return fb.ap( this )
  }

  fold<B>( valueWhenNothing: B, doWhenJust: ( a: A ) => B ): B {
    return doWhenJust( this.value )
  }

  reduce<B>( doWhenJust: ( a: A ) => B, valueWhenNothing: B ): B {
    return doWhenJust( this.value )
  }

  isJust(): this is Just<A> {
    return true
  }

  isNothing(): this is Nothing<A> {
    return false
  }

}
