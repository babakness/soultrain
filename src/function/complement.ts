/** @module function/complement.ts */
/**
 * Take a function, then its arguements, then return the boolean opposite of said function
 * :: (...args) -> (fn) -> boolean
 */
export const complement = <A>( f: ( ...args: A[] ) => boolean ) => ( ...args: A[] ): boolean => !f( ...args )

export default complement
