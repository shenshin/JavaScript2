/**
 
 ** Exercise 5: The lottery machine **
 
Don't you just love the thrill of the lottery? What if I told you we can make our own lottery machine? Let'
 s get started!

   Write a
 function that takes 4 arguments.

   - A start value
   - An end value
   - A callback that executes if the number is divisible by 3
   - A callback that executes if the number is divisible by 5

 The  function should first generate an array containing values from start value to end value(inclusive).

 Then the  function should take the newly created array and iterate over it, and calling the first callback
 if the array value is divisible by 3.

 The function should call the second callback
 if the array value is divisible by 5.

 Both functions should be called
 if the array value is divisible by both 3 and 5.

*/

function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
  if (!(startIndex < stopIndex)) throw new RangeError('Stopindex must be more than startindex')
  const numbers = [];
  // make array
  for (let i = startIndex; i <= stopIndex; i++) numbers.push(i)
  // start at beginning of array and check if you should call threeCallback or fiveCallback or go on to next
  numbers.forEach(number => {
    if (number % 3 === 0) threeCallback(number)
    if (number % 5 === 0) fiveCallback(number)
  })
}
// create new functions and pass them to threeFive()
const threeCallback = parameter => console.log(parameter)  // 12, 15
const fiveCallback = parameter => console.log(parameter)  // 10, 15
threeFive(10, 15, threeCallback, fiveCallback)


// Should create an array [10,11,12,13,14,15]
// and call sayFive, sayThree, sayThree, sayFive
// why these?