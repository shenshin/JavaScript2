/**

 ** Exercise 1: The odd ones out **

 Rewrite the following function using map and filter. 
 Avoid using for loop or forEach.
 The function should still behave the same.

 */
function doubleEvenNumbers(numbers) {
  // const newNumbers = [];
  // for (let i = 0; i < numbers.length; i++) {
  //   if (numbers[i] % 2 === 0) {
  //     newNumbers.push(numbers[i] * 2);
  //   }
  // }

  // return newNumbers;
  if (Array.isArray(numbers) && numbers !== null) {
    const array = [...numbers] // clone array
    return array.filter(x => x % 2 === 0).map(x => x * 2)
  } else throw new TypeError('doubleEvenNumbers() parameter must be an array')
}

const myNumbers = [1, 2, 3, 4];
try {
  console.log(doubleEvenNumbers(myNumbers)); // Logs "[4, 8]" to the console
} catch (error) {
  console.log(error.message)
}