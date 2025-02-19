# Quickstart

```mx
\ Variables, constants, functions, parameters, properties, and types are
  all declared like this: \
ident: "init value"

\ To specify a type start the identifer with a capital letter \
NumOrStr: Num | Str

\ The type can be specified explicitly like so: \
numOrStr: NumOrStr = 42

\ Usually the compiler will infer writablity, but this can be manully set \
readOnly:> 0 \ Read only \
readWrite:= readOnly + 5 \ Writable with the init value being the right \

\ No need to export or import variables you declare. The compiler will
  handle that for you. \
aNum: 1 \ Is exported by default \
\ To explicitly prevent exporting, start variable names with one or
  more "_"s \
_aNum: 2 \ Is not exported \

\ Functions are declared like so \
addNums: {
  \ All params are passed by reference, and are inferred to be read-only \
  numA: Num
  numB: Num
} => (
  return numA + numB
)

\ Funciton params can be explicitly marked as writable via ":" \
InputBox: { value:= Str } => (...)
MyComponent: {} => (
  myVal: "Hello"
  \ Typing in the input box will change the value of "myVal" \
  return <InputBox value: myVal />
)

\ Everything is reactive \
numA: 5
numB: 10
sum: numA + numB \ sum is 15 \
numA += 1 \ sum will now be 16 \

\ This also means that function results are reactive \
numC: 1
result: addNums(numC, 1) \ result is 2 \
numC += 1 \ result is now 3 \

\ To make a non-reactive readonly use the copy keyword. \
constVal: copy numA + numB

\ Mynx supports an XML-like syntax for constructing UIs. \
ClientCard: { client: Client} =>
  <Card
    \ Params of Card can be set like so \
    height: 15
    \ Bool params can be set to true just by name \
    widthGrows
    \ Any expression can be used here \
    background: if (client.isImportant) "red" else none
  >
    \ Expressions can be used to flesh out the children of elements \
    <Text h2>client.name</Text>
    \ Unlike XML and HTML, all text must be contained in strings \
    <Text bold widthGrows alignLeft>"Description"</Text>
    <Text widthGrows alignLeft>client.description</Text>
  </Card>
```
