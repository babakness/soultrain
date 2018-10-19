/** @module type/staticType.ts */
/**
 * A function for use with TypeScript to validate input types.
 * Function takes a given type for A and returns an identity function
 * expecting and returning data of type A
 * @example
 * ;[1,2,3]
 *   .map(toString)
 *   // check type incoming value to be of type `string`
 *   .map(type<string>())
 *   .join('-')
 * // => '1-2-3'
 */
export const staticType = <A>() => ( a: A ): A => a
export default staticType
