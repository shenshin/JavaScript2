/**
 
 ** Exercise 1: Add Six **
 
Declare a function called `createBase`.The function takes a number as a parameter and
return a closure, that adds a number to the base number argument.

Call the function three times. The return values should be:
 15, 24, 33

 */
function createBase(numberX) {
  // Put here your logic...
  let property = numberX
  return function (numberY) {
    property += numberY
    return property
  }
}

const addSix = createBase(6);

// Put here your function calls...
console.log(addSix(9)) // 15
console.log(addSix(9)) // 24
console.log(addSix(9)) // 33

// Next approach does the same but looks absolutly sane to me!!!
function Base1(numberX) {
  this.property = numberX
}
Base1.prototype.add = function (numberY) {
  this.property += numberY
  return this.property
}
const base1 = new Base1(6)
console.log(base1.add(9)) // 15
console.log(base1.add(9)) // 24
console.log(base1.add(9)) // 33

// And next one - even more sane
class Base2 {
  constructor(numberX) {
    this.capturedVar = numberX
  }
  add(numberY) {
    this.capturedVar += numberY
    return this.capturedVar
  }
}
const base2 = new Base2(6)
console.log(base2.add(9)) // 15
console.log(base2.add(9)) // 24
console.log(base2.add(9)) // 33
