Please note that this library is still experimental and there will be breaking changes. If you are kicking the tires on this within another experimental project, it is best to lock it down to a specific version.

# Install

`npm install soultrain`

# Soultrain

Soultrain is a compact functional library written in Typescript. It is inspired by Ramda and container-style programming based Algebraic Data Types. 

# Motivation

Ramda is a great tool, however, it relies on JS DOC comment specifications to provide type data. While this is good, Typescript provides superior static-typing. Thus this library aims to provide general purposes functional tools with much better static-typing.

# Overview

This section will be completed later. From a high-level, the library provides smart `curry`, `pipe`, and `pipeline` functions with good type support. It currently provides two Monads, a `Maybe` and a `Transduce`. The former works similar to other Maybe libraries, however, it provides type support and supports both `traverse` and `sequence`. The latter is transducer with a monadic API. More on this below.

# Transduce

### What is a "transducer"

Transducers utilize loop fusion by composing a chain of reducers to transform data. Instead of looping through the data for each transformation, the transformations are fused together and performed in a single loop.

There are also other benefits to this library

### Example

Suppose we have a list of numbers. For all greater than 10, we want to first filter for the even number, decrement each number by 1, then sum them together. Here is how this would be done

```ts
const arbitraryList = [ 4, 7, 23, 40, 46, 85, 92 ]
Transduce.of( arbitraryList )
  .filter( n => n > 10 )
  .map( n => n - 1 )
  .reduce( (acc,item) => acc + item, 0 )
```

Very much like how this would be done on an array; however, there are a few important advantages to this way. 

First, we do not iterate over the entire list once to filter, once more to decrement, then finally another time to sum the value. Instead, all operations are fused and performed at the moment `reduce` is called. 

Second, because the operations don't run until we call `reduce`, it is effectively a lazy list, and we can continue to compose operations until such time we execute the batch.

### Handy entry pair helpers

`Transduce` provides a few operations to simplify working with object or dictionaries in `[key,value][]` format. Such is the format returned from `Object.entries`. Here is an example manipulating an object.

```ts
const costOfProduceUS = { 
    apple: 4.95, 
    bananas: .85, 
    eggplant: 5.25 
}
const GDBUSD = 1.33
const translateToBritishEnglish = {
  eggplant: aubergine
}
const getBritishName = item => translateToBritishEnglish[ item ] || item

const costOfProduceUK = Transduce.of( Object.entries( costOfProduceUS ) )
  .mapEntryValue( price => price / GDBUSD )
  .mapEntryKey( getBritishName )
  .joinEntries( )
```

### Other handy helpers

Other handy operations include `take` and `every`. There is also a `chain` and an `ap` implementation in accords to `Fantasyland` specifications https://github.com/fantasyland/fantasy-land

# License

This software is made available under the MIT license.

https://opensource.org/licenses/MIT

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.