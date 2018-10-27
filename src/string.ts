/** @module string.ts */

import { curry } from './function/curry'
/**
 * Takes a regex pattern p and source string s and returns boolean indicating if s matches p
 * :: str -> str[] -> str
 */
export const test = curry( ( regex: RegExp, source: string ) => regex.test( source ) )

/**
 * Functional / curried version of String.prototype.replace
 * :: str -> str[] -> str
 */
export const replace = curry( ( regexp: RegExp | string, replacement: ( ( match: string, index: number, original: string ) => string ) & string, source: string ) => source.replace( regexp, replacement ) )

/**
 * Escape a string for regex
 * :: str -> str[] -> str
 */
export const regexEscape = ( s: string ) => s.replace( /[\^$*+?.()|[\]{}]/g, '\$&' )

/**
 * Trims a string
 * :: str -> str
 */
export const trim = ( s: string ) => s.trim()
/**
 * Todo
 */
export const split = curry( ( regex: RegExp | string , s: string ) => s.split( regex ) )
/**
 * Todo
 */
export const toUpperCase = ( str: string ) => str.toUpperCase()
/**
 * Todo
 */
export const toLowerCase = ( str: string ) => str.toLowerCase()
