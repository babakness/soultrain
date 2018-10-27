/** @module predicates.ts */

/**
 * Todo
 */
export const predEvery = ( offset: number, everyOther: number, index: number ): boolean =>
  index < offset
    ? false
    : ( index - offset ) % everyOther ? false : true
