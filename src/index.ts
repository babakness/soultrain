/** @module index.ts */

import { HKT, Type, URIS } from 'fp-ts/lib/HKT'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'Array': A[],
  }
}

export * from './check'
export * from './combinators'
export * from './flow'
export * from './function/index'
export * from './functor-helpers'
export * from './helper-types'
export * from './iterables'
export * from './lens'
// export * from './lens2'
export * from './lens-functions'
export * from './logging'
export * from './math'
export * from './matrix'
export * from './maybe'
export * from './maybe-functions'
export * from './object'
export * from './placeholder'
export * from './string'
export * from './transduce'
export * from './transducers'

/**
 * Emulating Higher-Kinded Types-- our map above takes a functor as a second
 * the type checks out in that it must both implement the HKT pattern and
 * also be a Functor.
 * The HKT patterns works, in the simplist terms, by
 *  1. Each Class / Type implements at least two readonly properties, _URI & _A
 *  2. The _URI is the name of the Class. _A the value of the generic inside the Class (more letters _B, etc. as needed)
 *  3. HKT is an interface that says the above properties, _URI & _A must exist
 *  4. We use a generic to reference that propertiy
 *  5. We pass the generic referencing _URI value to a type resolver `Type` which returns the actual type given the property
 *  6. The resolver accepts the name which it checks is a valid `keyof` the interface that maps prop name to types URI2HKT
 *  7. The URI2HKT interface is expanded by each library to include its own mapping (per its _URI) to its type. https://github.com/gcanti/fp-ts/blob/033ac95290d19f70233622dec73e71da17038eba/src/Option.ts#L19
 *
 */
