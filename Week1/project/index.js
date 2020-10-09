'use strict'

// create references to HTML elements
const quoteNode = document.querySelector('.quote span')
const authorNode = document.querySelector('.author span')
const newQuoteButton = document.querySelector('.button:last-child')
let data
// send request to remote API
fetch("https://type.fit/api/quotes")
  .then(response => response.json())
  .then(newData => {
    data = newData
    // get new quote right when after getting a response
    if (!quoteNode.innerHTML) getNewQuote()
    // add click listener to 'New quote' button
    newQuoteButton.addEventListener('click', getNewQuote)
    // on button click get a random quote and paste to HTML

  })
function getNewQuote(event) {
  const randomIndex = Math.floor(Math.random() * data.length)
  quoteNode.innerHTML = data[randomIndex].text
  authorNode.innerHTML = data[randomIndex].author ?? 'Unknown Author'
}