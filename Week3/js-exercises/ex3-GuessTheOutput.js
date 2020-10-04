/**

** Exercise 3: Guess the output **

Look at the bellow code snippet.
Can you guess the output? 
Write out your reasoning in 50 words or less.

*/

/* Variable 'a' is defined in the global scope, so it is accessible
in all functions defined in the program. Code inside function x 
definition changes variable 'a' and assigns new value 12 to it.
Then the closure returning by x captures 'a' from it's parent function scope
and passes it to alert function. So the alert is about to show string 
represtation of 'a' which is '12'. Next x is called at the time of
it's definition with pair of brackets () and shows the alert */
let a = 10;
const x = (function () {
  a = 12;
  return function () {
    alert(a);
  };
})();