'use strict';

/**
 
 ** Exercise 4: What 's the time? **
 
 Why wear a watch when you can check the time, live in your webpage ?

  1. Create a basic HTML file
  2. in the HTML file Include a script tag and link the JavaScript file
  3. Inside the JS file, write a function that adds the current time 
  to the webpage. Make sure it 's written in the HH:MM:ss notation 
  (hour, minute, second). Hint: use `setInterval()` to make sure 
  the time stays current
  4. Have the function execute when it 's loading in the browser

 */

// Set up refferences to the div's in HTML file
// I consider them to be outside the function for the reason
// not to set them up every function call
const hoursContainer = document.getElementById('hours');
const minutesDelimiterContainer = document.getElementById('minutes-delimiter');
const minutesContainer = document.getElementById('minutes');
const secondsContainer = document.getElementById('seconds');

// Make display always show two digits showing time components
function getTwoDigits(number) {
  return ('0' + number).slice(-2);
}

function displayCurrentTime() {
  // your code goes in here
  const now = new Date();
  hoursContainer.innerHTML = getTwoDigits(now.getHours());
  minutesContainer.innerHTML = getTwoDigits(now.getMinutes());
  secondsContainer.innerHTML = '.' + getTwoDigits(now.getSeconds());
}

// Set up blinking colon between hours and minutes
const colon = {
  isOn: true,
  blink: () => {
    minutesDelimiterContainer.innerHTML = this.isOn ? ':' : '&nbsp;';
    this.isOn = !this.isOn;
  },
};

setInterval(displayCurrentTime, 1000);
setInterval(colon.blink, 500);
