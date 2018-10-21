/** @module function/parallel.ts */

import { Function1 } from '../helper-types'

/**
 * Takes array of functions, array of arguments, and returns array of functions with arguments applied.
 * :: (...f) -> (...a) -> [ f1(...a),f2(...a),...]
 */
export function parallel<Input, A>( ...funcs: [Function1<Input, A>] ): ( arg: Input ) => [A]
export function parallel<Input, A, B>( ...funcs: [Function1<Input, A>, Function1<Input, B>] ): ( arg: Input ) => [A, B]
export function parallel<Input, A, B, C>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>] ): ( arg: Input ) => [A, B, C]
export function parallel<Input, A, B, C, D>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>] ): ( arg: Input ) => [A, B, C, D]
export function parallel<Input, A, B, C, D, E>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>] ): ( arg: Input ) => [A, B, C, D, E]
export function parallel<Input, A, B, C, D, E, F>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>] ): ( arg: Input ) => [A, B, C, D, E, F]
export function parallel<Input, A, B, C, D, E, F, G>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>] ): ( arg: Input ) => [A, B, C, D, E, F, G]
export function parallel<Input, A, B, C, D, E, F, G, H>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H]
export function parallel<Input, A, B, C, D, E, F, G, H, I>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>, Function1<Input, V>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>, Function1<Input, V>, Function1<Input, W>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>, Function1<Input, V>, Function1<Input, W>, Function1<Input, X>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>, Function1<Input, V>, Function1<Input, W>, Function1<Input, X>, Function1<Input, Y>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y]
export function parallel<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>( ...funcs: [Function1<Input, A>, Function1<Input, B>, Function1<Input, C>, Function1<Input, D>, Function1<Input, E>, Function1<Input, F>, Function1<Input, G>, Function1<Input, H>, Function1<Input, I>, Function1<Input, J>, Function1<Input, K>, Function1<Input, L>, Function1<Input, M>, Function1<Input, N>, Function1<Input, O>, Function1<Input, P>, Function1<Input, Q>, Function1<Input, R>, Function1<Input, S>, Function1<Input, T>, Function1<Input, U>, Function1<Input, V>, Function1<Input, W>, Function1<Input, X>, Function1<Input, Y>, Function1<Input, Z>] ): ( arg: Input ) => [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
export function parallel( ...funcs ) {
  return ( ...args ) => funcs.map( ( func ) => func.apply( func, args ) )
}

export default parallel
