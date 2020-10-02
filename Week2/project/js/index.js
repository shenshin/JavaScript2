'use strict'
/**
  In this week 's project you'll be making a Pomodoro Clock!
  A user can specify how many minutes the timer should be set, and with a click 
  on the play button it starts counting down!If the user wants to pause the timer, 
  they can do so by clicking the pause button.

  If the timer is running, the user can 't change the session length anymore
  Use at least 3 functions
  Display minutes and seconds
  If the timer finishes the timer should be replaced by the message: Time 's up!
 * 
 */
const timeArea = document.querySelector('.time-area')
const arrowUp = document.querySelector('.arrow-up')
const arrowDown = document.querySelector('.arrow-down')
const sessionLengthIndicator = document.querySelector('.session-length')
const minutesIndicator = document.querySelector('.minutes')
const secondsDelimIndicator = document.querySelector('.seconds-delimiter')
const secondsIndicator = document.querySelector('.seconds')
const milisecondsIndicator = document.querySelector('.miliseconds')
const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const pauseButton = document.querySelector('.pause')
const alertScreen = document.querySelector('.alert')
const alertContent = document.querySelector('.alert-content')
const alertButton = document.querySelector('.alert-button')
// set time area's border radius to depend on it's hight
window.addEventListener('resize', setTimeAreaBorderRadius)
// add event listeners to buttons
arrowUp.addEventListener('click', increaseTime)
arrowDown.addEventListener('click', decreaseTime)
playButton.addEventListener('click', play)
stopButton.addEventListener('click', stop)
pauseButton.addEventListener('click', pause)
alertButton.addEventListener('click', dismissAlert)

let sessionLength = 1
let currentTime = new Date()
let timer
let blinkingColon
let sessionIsOn = false

resetTimer()

function resetTimer() {
  sessionIsOn = false
  currentTime.setMinutes(sessionLength)
  currentTime.setSeconds(0)
  currentTime.setMilliseconds(0)
  updateViews()
}
function increaseTime() {
  if (!sessionIsOn) {
    sessionLength++
    resetTimer()
  }
}
function decreaseTime() {
  if (!sessionIsOn && sessionLength > 0) {
    sessionLength--
    resetTimer()
  }
}
function play() {
  if (!timer && sessionLength > 0) {
    timer = setInterval(countDown, 10)
    sessionIsOn = true
    updateViews()
    if (!blinkingColon) blinkingColon = setInterval(launchBlinkingColon, 500)
  }
}
function stop() {
  if (timer || sessionIsOn) {
    clearInterval(timer)
    timer = false
    resetTimer()
    stopBlinkingColon()
  }
}
function pause() {
  if (timer) {
    clearInterval(timer)
    timer = false
    updateViews()
    stopBlinkingColon()
  }
}
// updates clock screen
function showTime() {
  minutesIndicator.innerHTML = showTwoDigits(currentTime.getMinutes())
  secondsIndicator.innerHTML = showTwoDigits(currentTime.getSeconds())
  milisecondsIndicator.innerHTML = showMilliseconds(currentTime.getMilliseconds())
  function showTwoDigits(number) {
    return ('0' + number).slice(-2)
  }
  function showMilliseconds(number) {
    const ms = number >= 100 ? `${number}` : `0${number}`
    return ms.slice(0, 2)
  }
}
// updates all view elements
function updateViews() {
  showTime()
  setTimeAreaBorderRadius()
  sessionLengthIndicator.innerHTML = sessionLength
  const allButtons = [arrowUp, arrowDown, playButton, stopButton, pauseButton]
  // Set all buttons enabled
  for (const node of allButtons) {
    node.classList.remove('disabled')
    node.classList.add('enabled')
  }
  // Disable some of the buttons depending on the program state
  setDisabled(sessionLength === 0, playButton, stopButton, pauseButton, arrowDown)
  setDisabled(!timer && !sessionIsOn, stopButton, pauseButton)
  setDisabled(!timer, pauseButton)
  setDisabled(sessionIsOn, arrowDown, arrowUp)
  function setDisabled(condition, ...nodes) {
    if (condition)
      for (const node of nodes) {
        node.classList.remove('enabled')
        node.classList.add('disabled')
      }
  }
}
function launchBlinkingColon() {
  const colonIsVisible = secondsDelimIndicator.style.visibility === 'visible'
  secondsDelimIndicator.style.visibility = colonIsVisible ? 'hidden' : 'visible'
}
function stopBlinkingColon() {
  if (blinkingColon) {
    clearInterval(blinkingColon)
    blinkingColon = false
    secondsDelimIndicator.style.visibility = 'visible'
  }
}
// launches countdown
function countDown() {
  if (currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
    stop()
    showAlert()
  }
  else {
    currentTime.setMilliseconds(currentTime.getMilliseconds() - 10)
    showTime()
  }
}
function showAlert() {
  alertScreen.style.display = 'block'
}
function dismissAlert() {
  alertScreen.style.display = 'none'
}
// keeps corners radius always depend on the hight
function setTimeAreaBorderRadius() {
  const timeAreaHeight = timeArea.getBoundingClientRect().height / 4
  timeArea.style.borderRadius = `${timeAreaHeight}px`
  alertContent.style.borderRadius = `${timeAreaHeight}px`
  alertButton.style.borderRadius = `${timeAreaHeight / 3.4}px`
}
