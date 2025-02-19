# Overview

`~` as type? This might help for typing code blocks.

## Basic Syntax

### Comments

All comments in Mynx are multi-line comments and they are declared using `\ ... \` like so:

```mx
\ This is a comment \

\ Comments can span
  multiple lines \
```

### Variable Declaration

Variables in Mynx are declared using the `:` operator. For example:

```mx
\ This declares a variable `myVar` with a value of `5` \
myVar: 5
```

### Assignment

Variables can be reassigned using the `=` operator. For example:

```mx
myVar: 5

\ This reassigns the variable `myVar` to `10` \
myVar = 10
```

### Read / Write

Variables can be readonly or read-write. By default the compiler will infer read and write based on the context. For example:

```mx
\ Stand alone values are usually inferred to be read-write \
myVar: 5

\ Complex expressions are usually inferred to be readonly \
myOtherVar: 5 + 10
```

If you want to explicitly declare a variable as read-only you can using the `:>` and `:=` definition operators:

```mx
\ This declares a read-only variable `myVar` with a value of `5` \
myVar:> 5

\ This declares a read-write variable \
myVar:= 5 + 10
```

### Objects

Everything in Mynx is an object. Objects are declared using the `{ ... }` syntax. For example:

```mx
\ This declares an object `myObj` with a property `myProp` with a value of `5` \
myObj: { myProp: 5 }
```

Properties can be accessed using the `.` operator:

```mx
\ This accesses the property `myProp` on the object `myObj` \
myObj.myProp
```

#### Extracting props

Object properties can be extracted using `{}:`. For example:

```mx
\ This declares an object `myObj` with a property `myProp` with a value of `5` \
myObj: { myProp: 5, myOtherProp: 10 }

\ This extracts the property `myProp` from the object `myObj` \
{myProp}: myObj

\ `myProp` can now be accessed directly \
console.log.{myProp}
```

All object properties can be extracted using `*:`. For example:

```mx
\ This declares an object `myObj` with a property `myProp` with a value of `5` \
myObj: { myProp: 5, myOtherProp: 10 }

*: myObj

\ `myOtherProp` can now be accessed directly \
console.log.{myOtherProp}
```

### Separators like `,` and `;`

Most of the time separators like `,` and `;` are optional. For example:

```mx
\ This is valid Mynx code \
myObj: {
  myProp: 5
  myOtherProp: 10
}
```

They are allowed though, and both `,` and `;` can be used interchangeably. For example:

```mx
\ This is valid Mynx code \
myObj: {
  myProp: 5;
  myOtherProp: 10,
}
```

It is standard practice to use `,` when properties are on the same line and to use no separator when properties are on different lines. The auto-formatter should enforce this. For example:

```mx
\ This is standard practice \
myObj: {
  myProp: 5
  myOtherProp: 10
}

\ This is also standard practice \
myObj: { myProp: 5, myOtherProp: 10 }
```

## Core Concepts

### Core Type System

All types in Mynx start with a capital letter. Simply declaring a variable with a capital letter will tell the compiler that it is a type. All types are read only.

```mx
\ This is a type \
MyType: {}
```

By default all type checking is structural, meaning that two types are considered interchangeable if they have the same properties with the same types. For example"

```mx
TypeA: { someProp: Num }
TypeB: { someProp: Num }
varA: TypeA = { someProp: 1 }
varB: TypeB = { someProp: 2 }

\ This is allowed since TypeA and TypeB are structurally the same. \
varA = varB
```

#### Type Inference

If types are not specified Mynx will infer the type based on the context. For example:

```mx
\ This will infer the type of `myVar` to be `Num` \
myVar: 5
```

If an if check is done, Mynx will narrow the inferred type. For example:

```mx
\ This will infer the type of `myVar` to be `Num` \
myVar: 5

if (myVar is 5) do (
  \ We now know that the read type of `myVar` is currently `5`, although it can still be assigned to any num. \
  console.log.{myVar}
)
```

Values can be types in Mynx. The compiler will even infer this sometimes. For example:

```mx
myBool: true
\ We know that the read type of `myVar` is currently `5` or `10`, although it can still be assigned to any num. \
myVar: if (nyBool) then 5 else 10
```

#### Explicit Types

If you want to explicitly declare a variable as a type you can use the `: ... =` operators. For example:

```mx
\ This declares a variable `myVar` with a type of `Num` and a value of `5` \
myVar: Num = 5
```

Values can be types too. For example:

```mx
\ `myVar` can only ever equal `5` \
myVar: 5 = 5
```

#### Unions and Intersections

Types can be combined using the `|` and `&` operators. For example:

```mx
TypeA: { someProp: Num }
TypeB: { someOtherProp: Num }
TypeC: TypeA | TypeB
TypeD: TypeA & TypeB

\ `varC.someProp` has a type of `Num | error` \
varC: TypeC = { someOtherProp: 1 }

\ `varD.someProp` has a type of `Num` \
varD: TypeD = { someProp: 1, someOtherProp: 2 }
```

Type unions can be used with specific values. For example:

```mx
\ Can union values. \
myVar: 1 | 2 = 1
```

### Unique Types

If a type needs to be unique so that it can't be interchanged with structurally equivalent types, you can use the `unique` keyword:

```mx
TypeA: unique { someProp: Num }
TypeB: { someProp: Num }
varA: TypeA = { someProp: 1 }
varB: TypeB = { someProp: 2 }

\ This is not allowed since TypeA is unique. \
varA = varB
```

Inheritance also works with Unique types:

```mx
TypeA: unique { someProp: Num }
TypeB: unique TypeA
varA: TypeA = { someProp: 1 }
varB: TypeB = { someProp: 2 }

\ This is allowed since TypeB is a subtype of TypeA. \
varA = varB

\ This is not allowed since TypeB is unique subtype of TypeA. \
varB = varA
```

## Primitives

While you can define your own types, Mynx comes with a few built-in types that are useful for most applications.

### Symbols

This forms the basis of symbols in Mynx. Since everything in Mynx is basically just an object Symbols can be defined like so:

```mx
\ Symbols can be defined like so \
mySym: unique {}
```

Obviously symbols can also inherit from each other. For example, this is commonly used if you want to track specific types of errors:

```mx
\ The built-in `error` is just a symbol \
error: unique {}

\ You can then create more specific error types \
doesNotExist: unique error
```

### Enums

Enums are useful when you want to have a finite number of options. For example, the following enum represents the four cardinal directions:

```mx
\ Enums can be defined like so \
Direction: enum { north, east, south, west }

\ And used like so \
myDirection: Direction = Direction.north

\ When no explicit type is given, the compiler will infer the enum type. For
  example, `myOtherDirection` will have a type of `Direction`, not
  `Direction.east`. \
myOtherDirection: Direction.east
```

Under the hood enums are just a macro on top of the other basic types. The above enum is equivalent to:

```mx
Direction: (
  statics: {
    static north: unique {}
    static east: unique {}
    static south: unique {}
    static west: unique {}
  }
  options: (north | east | south | west)
  return options & statics
)
```

### Bools

Bools are a simple type that can only be `true` or `false`.

```mx
\ Bools can be defined like so \
myBool: Bool = true

\ The compiler will infer the type of `true` or `false` as `Bool` if no explicit type is given. \
myOtherBool: false
```

#### Bools are Enums

Under the hood, Bools are just a special enum:

```mx
Bool: enum { true, false }
```

### Nums

### Strs

## Basic Operators

Mynx has all the normal comparison operators, but uses some of them in a slightly different way.

### `is` and `isnt`

Mynx has two comparison equality operators `is` and `isnt`. They can be used like so:

```mx
\ The `is` operator checks if two values are the same. \
myNum: 5
result: myNum is 5

\ The `isnt` operator checks if two values are different. \
myOtherNum: 10
result: myNum isnt myOtherNum
```

`is` should generally require both sides to be plausibly equal. This would show an error message if devs try to do `0 is Num` since there's no way those two could be equal.

This does mean that `is` can be used on types ony if both the left and right are types.

### `is_a` and `isnt_a`

Type Checking can be done using `is_a` and `isnt_a`. They can be used like so:

```mx
\ This would check if `myNum` is a `Num` \
result: myNum is_a Num
```

This can have a value on the left and a type on the right.

### Logical Operators

In Mynx logical operators are `and`, `or`, and `not`. They can be used like so:

```mx
\ Logical operators can be used like so \
myBool: true
myOtherBool: false
result: myBool and not myOtherBool
```

#### Confusion with `is not` and `and not`

It's important to note that `not` affects the next value, so `not myBool and myOtherBool` is equivalent to `not (myBool and myOtherBool)`.

This can get confusing when used with `is` so the auto-formatter should insert parentheses in these situations to make the code more readable.

```mx
\ This could be confusing. Technically valid, but confusing. \
isConfusing: myBool is not myOtherBool

\ The auto-formatter will insert parentheses to make it more readable. \
isNotConfusing: myBool is (not myOtherBool)
```

Generally it is best to use `isnt` instead of `is not` to avoid confusion.

_Another option would be to always assume `is not` means `isnt` since in the boolean case they are interchangeable. I'm not certain of this though._

The same goes for when `not` is on the left hand of a comparison operator:

```mx
\ This could be confusing. Technically valid, but confusing. \
isConfusing: not myBool is myOtherBool

\ The auto-formatter will insert parentheses to make it more readable. \
isNotConfusing: (not myBool) is myOtherBool
```

### Mathematical Comparison

Mynx has the standard mathematical comparison operators: `>`, `<`, `>=`, `<=`. They can be used like so:

```mx
\ Mathematical comparison operators can be used like so \
myNum: 5
myOtherNum: 10
result: myNum < myOtherNum
```

### Arithmetic Operators

Mynx has the standard arithmetic operators: `+`, `-`, `*`, `/`, `mod`. They can be used like so:

```mx
\ Arithmetic operators can be used like so \
myNum: 5
myOtherNum: 10
result: myNum + myOtherNum
```

#### `+=`, `-=`, `*=`, `/=`, `mod=`

Mynx also has the standard compound assignment operators: `+=`, `-=`, `*=`, `/=`, `mod=`. They can be used like so:

```mx
\ Compound assignment operators can be used like so \
myNum: 5
myNum += 10
```

## Reactivity

## Reactivity

In Mynx, every variable is inherently reactive and watchable. This means that any change to a variable will automatically propagate to all expressions that depend on it. This reactivity is a core feature of Mynx and allows for efficient and intuitive data flow management.

### Reactive Variables

When you declare a variable in Mynx, it is automatically set up to be reactive. This means that any changes to the variable will trigger updates to any expressions or computations that depend on it. For example:

```mx
\ Declare a reactive variable `a` \
a: 5

\ Declare another reactive variable `b` that depends on `a` \
b: a + 10

\ Changing `a` will automatically update `b` \
a = 20
\ Now `b` will be 30 \
```

### Memos and Formulas

All expressions in Mynx are treated as memos / formulas. This means that they will only be recalculated if their inputs change. This ensures that computations are efficient and only performed when necessary. For example:

```mx
\ Declare a reactive variable `x` \
x: 10

\ Declare a memo `y` that depends on `x` \
y: x * 2

\ `y` will only be recalculated if `x` changes \
x = 15
\ Now `y` will be 30 \
```

### `do watch`

In Mynx, you can use the `do watch` statement to automatically re-run code whenever any of the inputs change. This is useful for side effects or for updating UI elements. For example:

```mx
\ Declare a reactive variable `count` \
count: 0

\ Use `do watch` to automatically update the UI whenever `count` changes \
do watch {
  \ Will log immediately and then log again whenever `count` changes \
  console.log.{count}
}
```

_Eventually we should probably add `on ... do ...`, `track`, `untrack`, and other reactivity utils._

## Code Blocks

Code blocks in Mynx are defined by enclosing the code within parentheses `(...)`. This allows for grouping multiple statements together, which can be particularly useful for defining complex expressions or control flow structures.

Code blocks can be used as function bodies, if-else branches, loops, standalone expressions, and more. They provide a way to encapsulate logic and ensure that it is executed in a specific order.

### Syntax

A code block starts with an opening parenthesis `(` and ends with a closing parenthesis `)`. Inside the code block, you can write multiple lines of code, and each line will be executed in sequence. For example:

```mx
(
  \ Declare a variable `x` \
  x: 5

  \ Declare a variable `y` and assign it the value of `x` plus 10 \
  y: x + 10

  \ Return the value of `y` \
  y
)
```

### Returning Values

In Mynx, code blocks can return values. This allows you to use a code block as an expression or to return a result from a function. By default, the value of the last line in the code block is automatically returned:

```mx
\ This code block will return the value of `y` \
(
  x: 5
  y: x + 10
  y
)
```

You can also explicitly return a value from a code block using the `return`, `ret`, or `stop` keywords:

```mx
\ This code block will return the value of `y` using the `return` keyword \
(
  x: 5
  y: x + 10
  return y
)
```

#### Encapsulated Return

_It is important to not that in Mynx return only returns from the current code block. Returning from a nested code block, if statement, or for loop will only return from that block._

```mx
myVar: (
  a: (
    b: 5
    return b
  )
  return a
)
```

#### Returning Early

If you want to return before the last line use an `if` statement with no `else`:

```mx
\ This code block will return early if `x` is less than 5 \
(
  x: 5
  stop if (x < 5) then 0
  return x + 10
)
```

By convention `stop` is used for early returns while `return` and `ret` are for explicit last line return. However they can technically be used interchangeably. The auto-formatter should enforce convention.

#### Result

As an alternate to last line return, Mynx has the `res` and `result` keywords. Assigning to `res` or `result` will return that value. For example:

```mx
\ `myVar` will equal 15 \
myVar: (
  a: 5
  b: 10
  res: a + b
  console.log.{a + b}
)
```

## Control Flow

### If-Else Blocks

If-else blocks in Mynx follow the syntax `if ... then ... else if ... then ... else` construct in Mynx allows you to perform conditional logic. This is similar to if-else statements in other programming languages, but with a syntax that emphasizes readability and simplicity.

#### Basic Syntax

The basic syntax for an `if ... then ... else` statement in Mynx is as follows:

```mx
if (condition) do (
  \ code to execute if condition is true \
) else (
  \ code to execute if condition is false \
)
```

You can also chain multiple conditions using else if:

```mx
if (condition1) do (
  \ code to execute if condition1 is true \
) else if (condition2) do (
  \ code to execute if condition2 is true \
) else (
  \ code to execute if none of the conditions are true \
)
```

#### If Blocks can Return Values

In Mynx, if blocks can return values. This means that you can use an if block as part of an expression. For example:

```mx
myVar: if (true) then 5 else 10
```

In this example, myVar will be assigned the value 5 because the condition true is met.

### For Loops

In Mynx for loops have the syntax `for ... in ... do ...` or `for ... in ... then ...`. By convention `do` is used if the following expression can cause mutations, and `then` is used only if the following expression will not cause mutations:

```mx
\ For loops can be used like so \
for (i in 0..5) do (
  \ code to execute for each value of `i` \
)
```

The `in` keyword is used to specify the range of values that the loop should iterate over. In this case, the loop will iterate over the values from 0 to 5.

#### Looping Over Lists

You can also loop over lists using the `in` keyword. For example:

```mx
\ Loop over a list of values \
for (value in myList) do (
  \ code to execute for each value in `myList` \
)
```

#### Looping Over Dictionaries

You can loop over dictionaries using the `in` keyword. For example:

```mx
\ Loop over a dictionary of key-value pairs \
for (value, key in myDict) do (
  \ code to execute for each key-value pair in `myDict` \
)
```

The `key` portion is optional. If you only want the values you can omit it.

```mx
\ Loop over a dictionary of values \
for (value in myDict) do (
  \ code to execute for each value in `myDict` \
)
```

#### Mapping with For Loops

For loops can be used to transform lists or dictionaries. For example:

```mx
\ Map over a list of values \
mappedList: for (value in myList) do (value * 2)
```

#### Stopping Early

If for some reason you need to stop a loop early, but it's not an error, you can use the `stop_loop` keyword. For example:

```mx
\ Stop the loop early if a condition is met \
for (value in myList) do (
  \ Stop the loop if the value is greater than 5 \
  stop_loop if (value > 5)
)
```

#### Filtering with For Loops

For loops can be used to filter lists or dictionaries. For example:

```mx
\ Filter a list of values \
filteredList: for (value in myList) do (
  \ Only include values that are greater than 5 \
  if (value is_a error) then continue
  value
)
```

### Until Loops

In Mynx, until loops have the syntax `until ... do ...`. For example:

```mx
\ Until loops can be used like so \
haveFoundIt: false
until haveFoundIt do (
  \ code to execute until the condition is true \
)
```

#### Do-until Loops

Mynx also supports do-until loops. They have the syntax `do ... until ...`. For example:

```mx
\ Do-until loops can be used like so \
areDone: false
do (
  \ code to execute until the condition is true \
) until areDone
```

## Dictionaries and Lists

Most iterables need a `list.range` property to make it easy to use them with indexed for loops.

## Functions

Invoked using `myFunc.{params}`

### Formulas vs Actions

### Formula Reactivity

## Handling Errors

By convention all errors inherit from `error`. Errors are never thrown, only passed around as values.

## Extending Types

```mx
extend Num {
  isEven: Bool = this mod 2 is 0
}
```

## Generic Types
