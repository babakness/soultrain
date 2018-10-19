/** @module filters.ts */

const predEvery = ( offset: number, everyOther: number, index: number ): boolean =>
  index < offset
    ? false
    : ( index - offset ) % everyOther ? false : true
