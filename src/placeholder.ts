/** @module placeholder.ts */

// import { HKT } from 'fp-ts/lib/HKT'
import { defineFunctionProperties } from './function'
import { untypedCurry } from './function/untypedCurry'
/**
 * Todo
 */
export class Placeholder {}
/**
 * Todo
 */
export const _ = new Placeholder()
/**
 * Todo
 */
export const isPlaceholder =
  // tslint:disable-next-line:no-shadowed-variable
  ( placeholder ): placeholder is Placeholder => placeholder instanceof Placeholder
/**
 * Todo
 */
export const pappSlots = ( ...placeholders ) => <A>( fn: ( ...a ) => A ) => ( ...fillers ): A => fn( ...placeholders.map(
  ( item ) => isPlaceholder( item ) ? fillers.shift() : item,
) )

// tslint:disable-next-line:variable-name
const _placeholders = ( fn, ...argsAndSlots ) => ( ...fillers ) => fn( ...argsAndSlots.map( ( item ) => isPlaceholder( item ) ? fillers.shift() : item ) )
// export function slots <A,B>(fn: (...a:B[]) => A, ...argsAndSlots: (B|Slot)[]  ) : ( ...fills:B[] ) => A
// export function slots <A,B>(fn: (...a:B[]) => A) : (...argsAndSlots: (B|Slot)[] ) => ( ...fills:B[] ) => A

export function placeholder <A, B, Z>( fn: ( a: A, b: B ) => Z, a: Placeholder, b: B ): ( p: A ) => Z
export function placeholder <A, B, Z>( fn: ( a: A, b: B ) => Z, a: A, b: Placeholder ): ( p: B ) => Z
export function placeholder <A, B, C, Z>( fn: ( a: A, b: B, c: C ) => Z, a: Placeholder, b: B, c: C ): ( p: A ) => Z
export function placeholder <A, B, C, Z>( fn: ( a: A, b: B, c: C ) => Z, a: A, b: Placeholder, c: C ): ( p: B ) => Z
export function placeholder <A, B, C , Z>( fn: ( a: A, b: B, c: C ) => Z, a: A, b: B, c: Placeholder ): ( p: C ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: Placeholder, b: B, c: C, d: D ): ( p: A ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: Placeholder, c: C, d: D ): ( p: B ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: B, c: Placeholder, d: D ): ( p: C ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: B, c: C, d: Placeholder ): ( p: D ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: Placeholder, b: B, c: C, d: D, e: E ): ( p: A ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: Placeholder, c: C, d: D, e: E ): ( p: B ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: Placeholder, d: D, e: E ): ( p: C ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: C, d: Placeholder, e: E ): ( p: D ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: C, d: D, e: Placeholder ): ( p: E ) => Z
/**
 * Works on conjunction with `_` (a `Placeholder` instance) from this library
 * to provide a placeholder parameter that will be invoked at a later time.
 * @param fn foobar
 * @example
 * import { _, placeholder } from 'soultrain'
 * const friendlyTemplate = (name: string, message: string) : string => `Hello ${name}! ${message}`
 * const welcome = placeholder( friendlyTemplate, _ ,'Welcome to Oregon!')
 * welcome('Roxanne') // Hello Roxanne! Welcome to Oregon!
 */
export function placeholder( fn, ...placeholders ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( _fn, ...argsAndSlots ) => ( ...fillers ) => _fn( ...argsAndSlots.map( ( item ) => isPlaceholder( item ) ? fillers.shift() : item ) ) )( fn, ...placeholders )
}

// export function papp <A, Z>( fn: ( a: A ) => Z ): ( a: A ) => Z
// export function papp <A, B, Z>( fn: ( a: A, b: B ) => Z ): ( a: A ) => Z
export function papp <A, B>( fn: ( ...a: B[] ) => A, ...partials: B[] ): ( ...args: B[] ) => A
export function papp <A, B>( fn: ( ...a: B[] ) => A ): ( ...partials: B[] ) => ( ...args: B[] ) => A
/**
 * Todo
 */
export function papp( ...args ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( fn, partials ) => ( ..._args ) => fn( ...partials, ..._args ) )( ...args )
}

export function pappRight <A, B>( fn: ( ...a: B[] ) => A, ...partials ): ( ...args: B[] ) => A
export function pappRight <A, B>( fn: ( ...a: B[] ) => A ): ( ...partials ) => ( ...args: B[] ) => A
/**
 * Todo
 */
export function pappRight( ...args ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( fn, partials ) => ( _args ) => fn( ..._args, ...partials ) )( ...args )
}

// export const pappCurry = ( ...partials ) => fn => partials.length >= fn.length
//   ? fn( ...partials )
//   : ( ...args ) => pappCurry( ...partials, ...args )( fn )

/**
 * Todo
 */
export const pappSlotsCurried = ( ...placeholders ) => ( fn ) => ( ...fills ) => {
  const processed = placeholders.map(
    ( item ) => ( isPlaceholder( item ) && fills.length ) ? fills.shift() : item,
  )
  return ( processed.find( isPlaceholder ) ? pappSlotsCurried : fn )( ...processed )
}
