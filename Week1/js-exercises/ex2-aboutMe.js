'use strict'
/**
 
 ** Exercise 2: About me **/
/*
 1. See HTML
 2. Change the body tag 's style so it has a font-family of "Arial, sans-serif".*/

document.body.style.fontFamily = 'Arial, Helvetica, sans-serif'

// place my pesonal info here
const personalInfo = {
  'nickname': 'Aleks Shenshin',
  'fav-food': 'Roquefort cheese',
  'hometown': 'Nuenen'
}

for (const key in personalInfo) {
  // get each span element
  const spanElement = document.getElementById(key)
  // create new text node with corresponding personal info field
  const textNode = document.createTextNode(personalInfo[key])
  // li elements are parent for span elements
  const liElement = spanElement.parentElement
  // 3. Replace each of the spans(nickname, fav-food, hometown) with your own information.:
  liElement.replaceChild(textNode, spanElement)
  // 4. Iterate through each li and change the class to "list-item".
  liElement.className = 'list-item'
}
/*
5. See HTML
6. Create a new img element and set its src attribute to a picture of you.Append that element to the page.
*/
const imageElement = document.createElement('img')
imageElement.setAttribute('src', './img/AleksInPlane.jpg')
imageElement.setAttribute('alt', personalInfo.nickname)
imageElement.style.width = '15rem' // perhaps it would be better to place this style in style.css
document.body.appendChild(imageElement)