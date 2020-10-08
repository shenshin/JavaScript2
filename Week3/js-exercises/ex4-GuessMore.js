/**

** Exercise 4: Guess more **

Look at the bellow code snippet.
Can you guess the output? 
Write out your reasoning in 50 words or less.

*/

const x = 9;

function f1(val) {
  val = val + 1;
  return val;
}
f1(x);
// x is an integer and is passed to the function
// as a value. So, the changes made to parameter inside the function
// do not effect the variable which was passed as a parameter
console.log(x); // prints 9

const y = {
  x: 9
};

function f2(val) {
  val.x = val.x + 1;
  return val;
}
f2(y);
// However objects and arrays are passed as references. 
// Function receives a reference to object y,
// and changes made to parameter inside the function
// effect the object.
console.log(y); // {x: 10}