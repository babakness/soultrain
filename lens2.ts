// import { getPathValue } from './object';
// import { untypedCurry, pipeline } from './function';
// import { lens, DELETE } from './lens-functions';
// function _foldAndRead(this: Lens2<{}, {}>, defaultValue, data) {
//   return pipeline(lens(this.path, this.run([defaultValue, data]), defaultValue, data), processedData => [processedData, getPathValue(this.path, processedData), getPathValue(this.path, data)]);
// }
// function _fold(this: Lens2<{}, {}>, defaultValue, data) {
//   return lens(this.path, this.run([defaultValue, data]), defaultValue, data);
// }
// function _read(this: Lens2<{}, {}>, defaultValue, data) {
//   return getPathValue(this.path, lens(this.path, this.run([defaultValue, data]), defaultValue, data));
// }
// function _write(this: Lens2<{}, {}>, value, data) {
//   return lens(this.path, ([defaultValue, data]) => value, value, data);
// }
// export class Lens2<L, A> {
//   readonly _A!: A;
//   readonly _L!: L;
//   readonly _URI!: 'babakness/lens';
//   static readonly _URI: 'babakness/lens';
//   constructor(readonly path, readonly run = a => b => b) { }
//   static type<A>() {
//     return new Lens2<A, {}>(undefined);
//   }
//   //(method) Lens<L, A>.of<A>(path: A): Lens<{}, {}>
//   static of<A>(path: A | undefined | null): Lens2<{}, NonNullable<A>> {
//     return new Lens2(path);
//   }
//   of<K1 extends keyof L>(path: [K1]): Lens2<L, NonNullable<L[K1]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1]>(path: [K1, K2]): Lens2<L, NonNullable<L[K1][K2]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>(path: [K1, K2, K3]): Lens2<L, NonNullable<L[K1][K2][K3]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>(path: [K1, K2, K3, K4]): Lens2<L, NonNullable<L[K1][K2][K3][K4]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(path: [K1, K2, K3, K4, K5]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>(path: [K1, K2, K3, K4, K5, K6]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(path: [K1, K2, K3, K4, K5, K6, K7]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>(path: [K1, K2, K3, K4, K5, K6, K7, K8]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>(path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>;
//   of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>(path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>;
//   of(path): any {
//     return new Lens2(path);
//   }
//   from<K1 extends keyof L>(...path: [K1]): Lens2<L, NonNullable<L[K1]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1]>(...path: [K1, K2]): Lens2<L, NonNullable<L[K1][K2]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>(...path: [K1, K2, K3]): Lens2<L, NonNullable<L[K1][K2][K3]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>(...path: [K1, K2, K3, K4]): Lens2<L, NonNullable<L[K1][K2][K3][K4]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(...path: [K1, K2, K3, K4, K5]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>(...path: [K1, K2, K3, K4, K5, K6]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(...path: [K1, K2, K3, K4, K5, K6, K7]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>(...path: [K1, K2, K3, K4, K5, K6, K7, K8]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>(...path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>;
//   from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>(...path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]): Lens2<L, NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>;
//   from(...path): any {
//     return new Lens2(path);
//   }
//   map<B>(fn: (pathValue: A) => B): Lens2<L, B> {
//     return new Lens2<L, B>(this.path, ([defaultValue, data]: [A | B, L]) => (pathValue: A) => fn(this.run([defaultValue, data])(pathValue)));
//   }
//   // given time constraints, could not effectively workout making this Foldable Functor a Monad.
//   // chain<B>(fn: (pathValue: A) => Lens<L,B>): Lens<L,B> {
//   //   // return new Lens<L,B>(this.path, (pathValue:A) => fn(this.run(pathValue)).run(pathValue) )
//   //   return new Lens<L,B>(fn(undefined as any).path, ([defaultValue,data]) => (pathValue) => {
//   //     const calculatedData = lens(this.path,this.run([defaultValue,data]),defaultValue,data)
//   //     console.log(this.path,calculatedData)
//   //     return 9999 // returns the pathvalue of next iteration
//   //   } )
//   // }
//   // not sure, not implementing given time constraint
//   // ap<B>(fab: Lens<{}, (pathValue: A) => B>): Lens<L,B> {
//   //   return new Lens<L,B>(this.path, (pathValue:A) => fab.run(pathValue).run(pathValue))
//   // }
//   preRead<Data extends L, Default extends A>(data: Data): A {
//     return getPathValue(this.path, data) as any as A;
//   }
//   read<Data extends L, Default extends A>(defaultValue: Default): (data: Data) => A;
//   read<Data extends L, Default extends A>(defaultValue: Default, data: Data): A;
//   read(...args) {
//     return untypedCurry(_read.bind(this))(...args);
//   }
//   write<Data extends L, Default extends A | typeof DELETE>(writeValue: Default): (data: Data) => L;
//   write<Data extends L, Default extends A | typeof DELETE>(writeValue: Default, data: Data): L;
//   write(...args) {
//     return untypedCurry(_write.bind(this))(...args);
//   }
//   fold<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default): (data: Data) => L;
//   fold<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default, data: Data): L;
//   fold(...args) {
//     return untypedCurry(_fold.bind(this))(...args);
//   }
//   foldAndRead<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default): (data: Data) => [L, A, A];
//   foldAndRead<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default, data: Data): [L, A, A];
//   foldAndRead(...args) {
//     return untypedCurry(_foldAndRead.bind(this))(...args);
//   }
// }


// declare module 'fp-ts/lib/HKT' {
//   interface URI2HKT2<L,A> {
//     'babakness/lens2': Lens2<L,A>,
//   }
// }