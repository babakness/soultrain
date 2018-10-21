import { HKT, Type, URIS } from 'fp-ts/lib/HKT'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'Array': A[],
  }
}

export * from './array/index'
export * from './function/index'
export * from './pairs/index'
export * from './type/index'

export * from './check'
export * from './combinators'
export * from './equals'
export * from './evolve-type'
export * from './flow'
export * from './functor-helpers'
export * from './helper-types'
export * from './index'
export * from './iterables'
export * from './lens-functions'
export * from './lens'
export * from './logging'
export * from './math'
export * from './matrix'
export * from './maybe-functions'
export * from './maybe'
export * from './object'
export * from './placeholder'
export * from './predicates'
export * from './string'
export * from './transduce'
export * from './transducers'
