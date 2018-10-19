/** @module function/parallelLoose.ts */
/**
 * A looser typed version of parallel
 * :: f[] -> a[] -> [ f1(...a),f2(...a),...]
 */
export const parallelLoose = ( ...funcs: Array<( ...a: any[] ) => any> ) => ( ...args: any[] ): any[] => funcs.map( ( func ) => func.apply( func, args ) )

export default parallelLoose
