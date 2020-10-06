/**
 
 ** Exercise 2: The lottery machine **

Write a function called removeDuplicates. This function accept an array as an argument
does not return anything but removes any duplicate elements from the array.

 The  function should remove duplicate elements.So the result should be:

   
 */


// WRITE YOUR FUNCTION HERE

/**
 * Removes duplicates from an array, passed to the function as
 * a parameter
 * @param {any[]} array an array of elements of any type
 */
function removeDuplicates(array) {
  const differentElements = []
  for (let i = 0; i < array.length; i++) {
    if (differentElements.includes(array[i])) {
      array.splice(i, 1)
      i--
    } else {
      differentElements.push(array[i])
    }
  }
}

const letters = ['a', 'b', 'c', 'd', 'a', 'e', 'f', 'c', 'b'];

removeDuplicates(letters);
// I suppose that this condition will NEVER be true because in JS one array
// equals to another only if it is a reference to the same array.
if (letters === ['a', 'b', 'c', 'd', 'e', 'f'])
  console.log("Hooray!") // never executed
// Because next two conditions return 'false'
console.log(['a', 'b', 'c', 'd', 'e', 'f'] == ['a', 'b', 'c', 'd', 'e', 'f']) // false
console.log(['a', 'b', 'c', 'd', 'e', 'f'] === ['a', 'b', 'c', 'd', 'e', 'f']) // false
// and only this condition returns 'true':
const abcdefg = letters
console.log(letters === abcdefg) // true
// However, my function removeDuplicates(array) removes duplicates from any passed array
console.log(letters) // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
// I wrote a method to check if one array really equals to another
// Here it is:
if (!Array.prototype.equals) {
  Object.defineProperty(Array.prototype, 'equals', {
    value: function (anotherArray) {
      return this.length === anotherArray.length &&
        Array.isArray(anotherArray) &&
        this.every((val, index) => val === anotherArray[index])
    }
  })
}
// now it works and prints 'Hooray!'
if (letters.equals(['a', 'b', 'c', 'd', 'e', 'f']))
  console.log("Hooray!") // Hooray!

// if there is no task to modify the existing array but just to return
// sorted array, the solution will be much simpler:
function deleteDuplicates(array) {
  return Array(...new Set(array))
}
console.log(deleteDuplicates(letters)) // [ 'a', 'b', 'c', 'd', 'e', 'f' ] 