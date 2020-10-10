'use strict';

/**
  
 ** Exercise 1: The book list **

  I 'd like to display my three favorite books inside a nice webpage!

  1. Iterate through the array of books.
  2. For each book, create a `<p>`
  element with the book title and author and append it to the page.
  3. Use a `<ul>`  and `<li>` to display the books.
  4. Add an `<img>` to each book that links to a URL of the book cover.
  5. Change the style of the book depending on whether you have read it(green) or not(red).

  The end result should look something like this:
  https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

  */

function createBookList(books) {
  // your code goes in here, return the ul element
  const ulElement = document.createElement('ul');
  ulElement.className = 'booklist';
  for (const book of books) {
    // list item
    const liElement = document.createElement('li');
    liElement.classList.add('booklist-item');
    // add green background if book is already read, and red otherwise
    liElement.classList.add(book.alreadyRead ? 'read' : 'not-read');
    // title, author
    const h2Element = document.createElement('h2');
    h2Element.innerHTML = book.title;
    const h3Element = document.createElement('h3');
    h3Element.innerHTML = book.author;
    liElement.appendChild(h2Element);
    liElement.appendChild(h3Element);
    // image
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', book.imageURL);
    imgElement.setAttribute('alt', book.title);
    liElement.appendChild(imgElement);

    ulElement.appendChild(liElement);
  }
  return ulElement;
}

const books = [
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    alreadyRead: false,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81zpLhP1gWL.jpg',
  },
  {
    title: 'The Most Human Human',
    author: 'Brian Christian',
    alreadyRead: true,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/I/71HMyqG6MRL.jpg',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    alreadyRead: true,
    imageURL: 'https://images-na.ssl-images-amazon.com/images/I/418M2053aNL.jpg',
  },
];

const ulElement = createBookList(books);

document.querySelector('#bookList').appendChild(ulElement);
